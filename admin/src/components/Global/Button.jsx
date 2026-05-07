const Button = ({ text, type, loading }) => {
  return (
    <button type={type ? type : "button"} disabled={loading} className="button">
      {loading ? <Loader /> : text}
    </button>
  );
};

export default Button;

export const Loader = () => {
  return <div role="status" className="loader"></div>;
};
