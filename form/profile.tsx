import { Input } from "@/components/form";

const profile = () => {
  return (
    <div className="mt-10 sm:w-full sm:max-w-sm">
      <form>
        <Input label="Name:" type="text" name="name" />
        <Input label="Email:" type="email" name="email" />
      </form>
    </div>
  );
};

export default profile;
