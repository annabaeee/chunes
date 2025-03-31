import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
} from "@material-tailwind/react"
import { MusicNotesRating } from "./musicNotesRating.jsx";

const defaultClassName = "w-full";

export const RatingDisplay = ({ rating, className, notesClassName, footerClassName }) => {

  return (
    <Card className={className ?? defaultClassName} color="gray" >
      <CardHeader
        shadow={false}
        floated={false}
        className="mx-0 flex items-center gap-4 p-4 mt-0"
        color="gray"
      >
        <Avatar
          size="lg"
          variant="circular"
          src={rating.profileUrl ?? "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"}
          alt="card-image"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between flex-wrap">
            <Typography variant="h6" color="pink">
              {rating.userName}
            </Typography>
            <MusicNotesRating className={notesClassName ?? "h-10"} value={rating.score} />
          </div>
        </div>
      </CardHeader>
      <CardBody className={rating.review ? "p-3 flex" : "hidden"}>
        {rating.review ?
          <Typography color="white" className="font-normal bg-darkgray-900 rounded-lg p-4 w-full text-left truncate text-wrap grow-0">
            {rating.review}
          </Typography>
          : <></>
        }
      </CardBody>
      <CardFooter className={footerClassName ?? "p-3 flex justify-end"}>
        <Typography variant="paragraph" color="gray" className="">
          {rating.createdAt.slice(0, 10)} {rating.createdAt.slice(11, 16)}
        </Typography>
      </CardFooter>
    </Card>
  )
}