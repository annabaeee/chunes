import { useApi } from "../hooks/useApi.jsx";
import { Button } from '@headlessui/react'

export const LoginButton = ({value}) => {
  const api = useApi();
  const handleLogin = async (e) => {
    e.preventDefault();
    const spotifyAuthInfo = await api.fetch('auth/spotify-auth-url', {
      method: "post",
      body: { redirectUri: import.meta.env.VITE_AUTH_REDIRECT_URL }
    });
    api.logout();
    window.location.replace(spotifyAuthInfo.authUrl);
  };
  return (
    <div>
      <Button
        onClick={handleLogin}
        className="inline-flex items-center gap-2 rounded-lg bg-purple-700 py-5 px-10 text-2xl font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-purple-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png" alt="" className="h-9" />
        {value ?? "Login with Spotify"}
      </Button>
    </div>
  );
};