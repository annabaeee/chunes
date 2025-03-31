import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useApi } from "../hooks/useApi.jsx";
import Loader from "../components/loader.jsx";
import { ItemCard } from "../components/itemCard.jsx";

export const SearchResult = () => {
  const api = useApi();

  const [searchParams] = useSearchParams();
  const query = new URLSearchParams({ query: searchParams.get("query") }).toString();

  const { data: results, isLoading } = useQuery({ queryKey: ["search", query], queryFn: () => api.fetch('search?' + query) });

  if (isLoading) return <Loader />

  return (
    <div className="mt-16 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-gray-900 rounded-xl p-5 auto-rows-min">
        {results.tracks.map(track => <ItemCard item={track} key={track.id} />)}
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-gray-900 rounded-xl p-5 auto-rows-min">
        {results.albums.map(album => <ItemCard item={album} key={album.id} />)}
      </div>
    </div>
  );
}