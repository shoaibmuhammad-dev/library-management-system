import { GoArrowLeft } from "react-icons/go";

const BackButton = ({ onclick }) => {
  return (
    <button
      type="button"
      onClick={onclick}
      className="px-4 py-3 border border-neutral-200 rounded-lg bg-white text-sm font-medium flex items-center justify-center gap-1.5"
    >
      <GoArrowLeft className="text-lg" /> Go Back
    </button>
  );
};

export default BackButton;
