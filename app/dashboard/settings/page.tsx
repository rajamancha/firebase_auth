"use client";
import { ProfileForm } from "@/form";
import { useState } from "react";
import { ProfileCard } from "@/components/card";

export type ProfileType = {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
};
export default function SettingsPage() {
  const [editMode, setEditMode] = useState(false);

  const props: ProfileType = {
    editMode,
    setEditMode,
  };

  return (
    <div className="container">
      <h1 className="text-3xl my-10">Profile</h1>
      {editMode ? <ProfileForm {...props} /> : <ProfileCard {...props} />}
    </div>
  );
}
