import { useQuery } from "@tanstack/react-query";
import { ItemCard } from "../components/itemCard.jsx";
import { useApi } from "../hooks/useApi.jsx";
import Loader from "../components/loader.jsx";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Avatar,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export const TopTracks = () => {
  const api = useApi();
  const { data: track, isLoading } = useQuery({ queryKey: ['track', 'top'], queryFn: () => api.fetch('tracks/top') });

  if (isLoading) return <Loader />

  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 bg-gray-900 rounded-xl p-5 auto-rows-min">{
      track.map(track => <ItemCard item={track} key={track.id} />)}
    </div>
  );
}