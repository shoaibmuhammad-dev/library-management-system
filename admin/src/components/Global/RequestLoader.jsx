import Loader from "./Loader";

const RequestLoader = () => {
  return (
    <main className="w-full h-screen flex items-center justify-center fixed inset-0 z-50 bg-[rgba(0,0,0,0.4)]">
      <Loader />
    </main>
  );
};

export default RequestLoader;
