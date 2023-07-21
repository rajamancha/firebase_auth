import { Profile } from "@/form";

export default function SettingsPage() {
  // This page is protected
  return (
    <div className="container">
      <h1 className="text-6xl my-10">Super Secret Settings</h1>
      <Profile />
    </div>
  );
}
