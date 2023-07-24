"use client";
import { ProfileType } from "@/app/dashboard/settings/page";
import { Button, Input } from "@/components/form";
import { UserAuth } from "@/provider/AuthProvider";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

const profile = ({ editMode, setEditMode }: ProfileType) => {
  const { user, handleProfile } = UserAuth();
  const [form, setForm] = useState({
    displayName: user?.displayName ?? "",
    photoURL: user?.photoURL ?? "/no-user.png",
  });
  const updateUserProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleProfile(form);
    setEditMode(false);
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("photoURL", result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  return (
    <div className="mt-10 sm:w-full sm:max-w-sm sm:mx-auto">
      <form onSubmit={updateUserProfile}>
        <Image
          src={form.photoURL}
          alt="project poster"
          height={150}
          width={150}
          className="mx-auto"
        />
        <Input
          label="Image:"
          type="file"
          accept="image/*"
          name="displayName"
          placeholder="Select profile picture"
          // value={form.photoURL}
          onChange={handleChangeImage}
        />

        <Input
          label="Name:"
          type="text"
          name="displayName"
          required
          placeholder="Enter your name"
          value={form.displayName}
          onChange={(e) => {
            handleStateChange("displayName", e.target.value);
          }}
        />
        <Button type="submit" title="Save" />
        <Button
          onClick={() => setEditMode(!editMode)}
          variant="outline"
          title="Close"
          className="mt-4"
        />
      </form>
    </div>
  );
};

export default profile;
