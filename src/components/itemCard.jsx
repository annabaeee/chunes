// import { Card, CardContent, CardHeader, Image, Rating } from 'semantic-ui-react';
// import { UserRating } from './userRating.jsx';

// export const AlbumCard = (props) => {

//   const album = props.data;

//   return (
//     <Card key={album.id}>
//       <Image src={album.image} wrapped ui={false} />
//       <CardContent>
//         <CardHeader>{album.name}</CardHeader>
//         {/* <CardMeta>
// <span className='date'>Joined in 2015</span>
// </CardMeta> */}
//         {/* <CardDescription>
// Matthew is a musician living in Nashville.
// </CardDescription> */}
//       </CardContent>
//       <CardContent extra>
//         <UserRating data={album} type="album" />
//       </CardContent>
//     </Card>
//   );
// };

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import '@smastrom/react-rating/style.css'
import { useState } from "react";
import { MusicNotesRating } from "./musicNotesRating.jsx";

export const ItemCard = ({ item, children, className, headerClassName, showAverageRating = true }) => {

  return (
    <Link to={`/${item.type}s/${item.id}`} className={className} >
      <Card className="bg-#1b1b1c shadow-none">
        <CardHeader floated={false} className={headerClassName ?? ""}>
          <img src={item.image} alt="item-image" className="card-image" />
        </CardHeader>
        <CardBody className="text-center text-gray-300 grow-0">
          <Typography className="font-bold">
            {item.name}
          </Typography>
          <div className="">
            <Typography color="gray" className="font-medium" textGradient>
              {item.artists[0].name}
            </Typography>
          </div>
        </CardBody>
        {showAverageRating &&
          <CardFooter className="flex flex-col items-center space-y-4">
            <Typography color="gray" className="font-medium" textGradient>
              Avg. User Score
            </Typography>
            <MusicNotesRating value={item.averageScore} />
            {children}
          </CardFooter>
        }
      </Card>
    </Link>
  );
}