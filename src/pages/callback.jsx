import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useApi } from "../hooks/useApi.jsx";
import { useQuery } from "@tanstack/react-query"
import { LoginButton } from "../components/loginButton.jsx";
import Loader from "../components/loader.jsx";

export const CallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // If there are no search params, navigate to login or home
  useEffect(() => {
    if (!searchParams.has("code") || !searchParams.has("state")) {
      navigate( user ? '/' : '/login', { replace: true });
    }
  }, []);

  const api = useApi();
  const { data: user, isLoading, error, isError } = useQuery({
    queryKey: ["login"],
    queryFn: () => api.login({
      code: searchParams.get('code'),
      state: searchParams.get('state'),
      redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URL
    }),
    enabled: searchParams.has("code") && searchParams.has('state'),
    retry: () => false,
    cacheTime: 0,
  });

  // If there is a user (e.g. after login), navigate to home
  useEffect(() => {
    if (!user) return;
    navigate('/', { replace: true });
  }, [user]);

  // If there is an errir, navigate to error page with error state
  useEffect(() => {
    if (!error) return;
    navigate('/error', { replace: true, state: { error } });
  }, [error]);
  
  if (isLoading) return <Loader />

  return (
    <>
      {isError &&
        <div>
          <pre>
            {"Error: " + JSON.stringify(error, null, 2)}
          </pre>
          <LoginButton value="Login again" />
        </div>
      }
    </>
  );

};