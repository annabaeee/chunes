import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useAuth } from './useAuth';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  /** Return parsed object from JSON */
  const fetchJson = async (path, options) => {
    const newOptions = options || {};
    if (!(newOptions.headers instanceof Headers)) {
      newOptions.headers = new Headers(newOptions.headers);
    }

    if (!newOptions.headers.has("Accept")) {
      newOptions.headers.set('Accept', 'application/json');
    }

    if (!newOptions.headers.has("Authorization") && user?.auth_token) {
      newOptions.headers.set('Authorization', 'Bearer ' + user.auth_token);
    }

    // Auto convert request body JSON and set request content type
    if (newOptions.body !== undefined) {
      newOptions.body = JSON.stringify(newOptions.body);
      newOptions.headers.set('Content-Type', 'application/json');
    }

    const response = await fetch('/api/' + path, newOptions);
    // HTTP 204 : No content
    if (response.status === 204) return Promise.resolve(null);
    // HTTP 200 : OK
    if (response.status === 200) return response.body
      ? response.json()
      : Promise.resolve(null);

    if (response.status === 401) {
      logout();
      navigate("/login", { replace: true });
      return Promise.reject();
    }

    const errorInfo = {
      message: `Error fetching ${path}`,
      method: response.method,
      status: response.status,
      statusText: response.statusText
    }

    try {
      const error = await response.json();
      return Promise.reject({
        ...errorInfo,
        ...error,
      });
    } catch (err) {
      return Promise.reject(errorInfo);
    }
  };

  const loginRemote = async (request) => {
    logout();
    const loginResponse = await fetchJson('auth/login', {
      method: "post",
      body: request
    });
    login(loginResponse);
    return loginResponse;
  };

  const value = useMemo(
    () => ({
      user,
      login: loginRemote,
      logout,
      fetch: fetchJson
    }),
    [user]
  );
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  return useContext(ApiContext);
};