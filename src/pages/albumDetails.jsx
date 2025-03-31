import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi.jsx";
import { ReviewField } from "../components/reviewField.jsx";
import Loader from "../components/loader.jsx";
import { RatingDisplay } from "../components/ratingDisplay.jsx";
import { ItemCard } from "../components/itemCard.jsx";

export const AlbumDetails = () => {

  const { id } = useParams();
  const api = useApi();

  const { data: album, isLoading } = useQuery({ queryKey: ['ratings', 'albums', id], queryFn: () => api.fetch(`albums/${id}`) });

  if (isLoading) return <Loader />

  return (
    <div className="mt-16 grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="flex flex-col">
        <ItemCard item={album} />
        <ul className="bg-gray-900 rounded-lg p-3 text-start">
          {album.tracks.map((track, i) =>
            <li key={track.id} className={(i % 2 === 0 ? "bg-zebra-100" : "bg-gray-900") + " p-2 rounded-md transition-colors duration-300 hover:bg-pink-800"}>
              <Link to={`/tracks/${track.id}`}>{i+1}. {track.name}</Link>
            </li>)}
        </ul>

        {/* <img src={album.image} alt="album-image" className="rounded-lg h-64" />
        <div className="font-bold text-2xl">{album.name}</div>
        <div className="text-xl">{album.artists[0].name}</div> */}
      </div>
      <div className="lg:col-span-2">
        <ReviewField itemType="album" itemId={album.id} rating={album.myRating} />
        {album.ratings.map(rating => <RatingDisplay rating={rating} key={rating.id} className="mb-5" />)}
      </div>
    </div>
  )
}