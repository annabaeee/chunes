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

export const NewReleases = () => {
  const api = useApi();
  const { data: albums, isLoading } = useQuery({ queryKey: ['albums', 'recommended'], queryFn: () => api.fetch('albums/new-releases') });

  if (isLoading) return <Loader />

  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 bg-gray-900 rounded-xl p-5 auto-rows-min">{
      albums.map(album => <ItemCard item={album} key={album.id} />)}
    </div>
  );
}