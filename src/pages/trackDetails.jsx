import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi.jsx";
import { ReviewField } from "../components/reviewField.jsx";
import Loader from "../components/loader.jsx";
import { RatingDisplay } from "../components/ratingDisplay.jsx";
import { ItemCard } from "../components/itemCard.jsx";

export const TrackDetails = () => {

  const { id } = useParams();
  const api = useApi();

  const { data: track, isLoading } = useQuery({ queryKey: ['ratings', 'track', id], queryFn: () => api.fetch(`tracks/${id}`) });

  if (isLoading) return <Loader />

  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="flex flex-col">
        <ItemCard item={track} />
        <div className="mt-0 w-full h-20 relative">
          <iframe src={`https://open.spotify.com/embed/track/${track.id}`} className="w-full h-full absolute rounded-xl" allowFullScreen allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture;">
          </iframe>
        </div>
      </div>
      <div className="col-span-2">
        <ReviewField itemType="track" itemId={track.id} rating={track.myRating} />
        {track.ratings.map(rating => <RatingDisplay rating={rating} key={rating.id} className="mb-5" />)}
      </div>
    </div>
  )
}