import { useGetStatsQuery } from "../../services/dashboard/dashboard.service";
import ErrorPage from "../Global/ErrorPage";
import PageLoader from "../Global/PageLoader";

const Statistics = () => {
  const { data, isError, error, isLoading } = useGetStatsQuery(undefined, {
    refetchOnFocus: true,
  });

  if (isLoading) return <PageLoader />;

  if (error || isError) return <ErrorPage />;

  return (
    <div className="w-full grid grid-cols-3 gap-5">
      <div className="h-[114px] flex flex-col items-start justify-between py-4 px-8 rounded-xl bg-white">
        <div className="flex items-center gap-3">
          <p className="text-[#64748B] font-medium">Borrowed Books</p>
        </div>
        <p className="font-semibold text-[28px]">
          {data && data?.data?.requests}
        </p>
      </div>

      <div className="h-[114px] flex flex-col items-start justify-between py-4 px-8 rounded-xl bg-white">
        <div className="flex items-center gap-3">
          <p className="text-[#64748B] font-medium">Total Users</p>
        </div>
        <p className="font-semibold text-[28px]">{data && data?.data?.users}</p>
      </div>

      <div className="h-[114px] flex flex-col items-start justify-between py-4 px-8 rounded-xl bg-white">
        <div className="flex items-center gap-3">
          <p className="text-[#64748B] font-medium">Total Books</p>
        </div>
        <p className="font-semibold text-[28px]">{data && data?.data?.books}</p>
      </div>
    </div>
  );
};

export default Statistics;
