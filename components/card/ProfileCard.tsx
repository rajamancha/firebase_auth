import React from "react";
import Card from "./Card";
import { PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { UserAuth } from "@/provider/AuthProvider";
import { ProfileType } from "@/app/dashboard/settings/page";
import { Loader } from "../Loader";

const ProfileCard = ({ editMode, setEditMode }: ProfileType) => {
  const { user, loader } = UserAuth();
  if (loader) return <Loader />;
  return (
    <div className="sm:mx-auto sm:w-fit">
      <Card>
        <div className="flex justify-end">
          <PencilIcon
            className="h-6 w-6 text-gray-500 cursor-pointer"
            onClick={() => setEditMode(!editMode)}
          />
        </div>
        <div className="flex justify-between flex-wrap">
          <div className="flex align-middle gap-4 flex-wrap">
            <Image
              src={user?.photoURL ?? "/no-user.png"}
              alt={user?.displayName ?? "profile pic"}
              height={100}
              width={100}
              className="rounded-full"
            />
            <div className="self-center flex flex-col gap-3">
              <h1>Name: {user?.displayName ?? "-"}</h1>
              <p>Email: {user?.email ?? "-"}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileCard;
