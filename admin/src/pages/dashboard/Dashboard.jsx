import React from "react";
import Statistics from "../../components/Dashboard/Statistics";
import BorrowRequestList from "../../components/Dashboard/BorrowRequestList";
import AccountsRequestedList from "../../components/Dashboard/AccountsRequestedList";
import RecentlyAddedBookList from "../../components/Dashboard/RecentlyAddedBookList";

const Dashboard = () => {
  return (
    <React.Fragment>
      <Statistics />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        <div className="col-span-2 lg:col-span-1 flex flex-col items-start gap-5">
          <BorrowRequestList />
          <AccountsRequestedList />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <RecentlyAddedBookList />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
