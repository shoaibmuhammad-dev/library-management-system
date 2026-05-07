import { GoArrowLeft } from "react-icons/go";

const BackButton = ({ onclick }) => {
  return (
    <button
      type="button"
      onClick={onclick}
      className="px-4 py-2 rounded-lg bg-white text-sm font-medium flex items-center justify-center gap-1.5"
    >
      <GoArrowLeft className="text-lg" /> Go Back
    </button>
  );
};

export default BackButton;
