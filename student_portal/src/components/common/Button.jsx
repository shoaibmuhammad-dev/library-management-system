import ButtonLoader from "./ButtonLoader";

const Button = ({ type, text, loading }) => {
  return (
    <button
      type={type}
      disabled={loading}
      className="p-3 text-center bg-[#E7C9A5] text-black font-semibold rounded-md w-full"
    >
      {loading ? <ButtonLoader /> : text}
    </button>
  );
};

export default Button;
