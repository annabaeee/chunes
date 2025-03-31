import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useAuth } from "../hooks/useAuth.jsx";

export const ProfileCard = () => {

  const { user } = useAuth();

  return (
    <div className="mt-8 flex items-center gap-4 pt-0 pb-6 w-full max-w-[26rem]">
      <Avatar
        size="xxl"
        variant="circular"
        src={user?.profileUrl ?? "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"}
        withBorder={true}
        color="gray"
        alt="profile-avatar"
        className="p-1 border-4"
      />
      <div className="flex w-full flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <Typography variant="h5" color="white">
            {user.displayName}'s reviews
          </Typography>
        </div>
      </div>
    </div>
  );
}