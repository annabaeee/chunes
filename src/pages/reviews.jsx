import { useQuery } from "@tanstack/react-query";
import { ItemCard } from "../components/itemCard.jsx";
import { useApi } from "../hooks/useApi.jsx";
import { RatingDisplay } from "../components/ratingDisplay.jsx";
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

export const Reviews = () => {
  const api = useApi();
  //const { data: albums, isLoading } = useQuery({ queryKey: ['albums', 'recommended'], queryFn: () => api.fetch('albums/new-releases') });
  const { data: itemRatingsResponse, isLoading: isLoadingItemRatings } = useQuery({ queryKey: ['ratings', 'latest'], queryFn: () => api.fetch('ratings') });

  if (isLoadingItemRatings) return <Loader />

  const itemRatings = itemRatingsResponse.flatMap(item => item.ratings.map(rating => ({ item, rating })));
  itemRatings.sort((a, b) => Date.parse(b.rating.createdAt) - Date.parse(a.rating.createdAt));

  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {itemRatings.map(itemRating =>
        <Card color="gray" className="flex flex-row gap-0.5" key={itemRating.rating.id} >
          <CardHeader shadow={false} floated={false} className="m-0 w-4/12 rounded-r-none" color="gray">
            <ItemCard item={itemRating.item} showAverageRating={false}/>
          </CardHeader>
          <CardBody className="w-8/12 pl-2">
            <RatingDisplay rating={itemRating.rating} notesClassName="h-9 lg:pt-2 lg:pr-20" footerClassName="p-3 flex justify-start"/>
          </CardBody>
        </Card>
      )}
    </div>
  );
}