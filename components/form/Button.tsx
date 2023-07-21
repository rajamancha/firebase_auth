type ButtonProp = {
  title: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "outline";
  onClick?: () => void;
};

const Button = ({
  type,
  title = "button",
  variant = "primary",
  onClick,
}: ButtonProp) => {
  return (
    <div className="my-6">
      <button
        type={type}
        onClick={onClick}
        className={`flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
          variant === "primary"
            ? "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600"
            : "bg-white text-black hover:bg-gray-200 focus-visible:outline-indigo-600 border-2 border-gray-500"
        }`}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
