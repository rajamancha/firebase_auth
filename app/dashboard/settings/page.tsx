"use client";
import { UserAuth } from "@/provider/AuthProvider";
import { Card } from "@/components/card";
import { Profile } from "@/form";
import Image from "next/image";

export default function SettingsPage() {
  const { user } = UserAuth();
  // This page is protected
  return (
    <div className="container">
      <h1 className="text-3xl my-10">Profile</h1>
      <Card>
        <div className="flex">
          <Image
            src={user?.photoURL ?? ""}
            alt={user?.displayName ?? "profile pic"}
            height={100}
            width={100}
            className="rounded-full"
          />
        </div>
      </Card>
      <Profile />
    </div>
  );
}
