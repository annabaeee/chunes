import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Avatar,
  CardFooter,
} from "@material-tailwind/react";
import { MusicNotesRating } from "./musicNotesRating.jsx";

export const MyRatingDisplay = (item) => {

  return (
    <Card className="w-full max-w-[48rem] flex-col" color="gray">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
        color="gray"
      >
        <MusicNotesRating className="h-10" value={item.myRating.score}></MusicNotesRating>
      </CardHeader>
      <CardBody className={item.myRating.review ? "p-4 pl-0" : "hidden"}>
        {item.myRating.review ?
          <Typography color="white" className="font-normal bg-darkgray-900 rounded-lg p-4 w-full text-left truncate text-wrap grow-0">
            {item.myRating.review}
          </Typography>
          : <></>
        }
      </CardBody>
      <CardFooter className={(item.myRating.review ? "justify-end" : "justify-start") + " flex p-3 pl-0"}>
        <Typography variant="paragraph" color="gray" className="flex items-center gap-2">
          {item.myRating.createdAt.slice(0, 10)} {item.myRating.createdAt.slice(11, 16)}
        </Typography>
      </CardFooter>
    </Card>
  )
}