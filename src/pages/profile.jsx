import { ProfileCard } from "../components/profileCard.jsx"
import { useQuery } from "@tanstack/react-query";
import { useApi } from "../hooks/useApi.jsx";
import Loader from "../components/loader.jsx";
import { MyRatingDisplay } from "../components/myRatingDisplay.jsx";
import { ItemCard } from "../components/itemCard.jsx";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";

export const ProfilePage = () => {

  const api = useApi();

  const { data: items, isLoading } = useQuery({ queryKey: ['ratings', 'my-ratings'], queryFn: () => api.fetch(`ratings/me`) });

  if (isLoading) return <Loader />

  return (
    <div>
      <ProfileCard />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {items.map(item =>
          <Card color="gray" className="flex flex-row gap-0.5">
            <CardHeader shadow={false} floated={false} className="m-0 w-4/12 rounded-r-none" color="gray">
              <ItemCard item={item} key={item.myRating.id} showAverageRating={false}/>
            </CardHeader>
            <CardBody className="w-8/12 pb-1">
              <MyRatingDisplay myRating={item.myRating}/>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  )
}