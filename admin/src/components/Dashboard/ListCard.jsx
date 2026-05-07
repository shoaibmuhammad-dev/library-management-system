import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

const ListCard = () => {
  return (
    <div className="w-full flex items-start justify-between bg-[#F8F8FF] p-4 rounded-xl">
      <div className="flex items-center gap-3">
        <img
          src="/inside-evil-book.png"
          alt="inside-evil-book"
          className="w-[55px] h-[76px]"
        />
        <div className="flex flex-col items-start gap-1.5">
          <h3 className="font-semibold">
            Inside Evil: Inside Evil Series, Book 1
          </h3>
          <div className="flex items-center gap-5">
            <p className="text-sm secondary-text">By Rachel Heng</p>
            <p className="text-sm secondary-text">Strategic, Fantasy</p>
          </div>

          <div className="w-full flex items-center gap-5">
            <div className="flex items-center gap-1">
              <img
                src="/profile-02.png"
                alt="profile image"
                className="w-[18px] h-[18px]"
              />
              <p className="text-sm secondary-text">Darrell Stewards</p>
            </div>
            <div className="flex items-center gap-1">
              <IoCalendarOutline className="secondary-text text-[16px]" />
              <p className="text-sm secondary-text">Darrell Stewards</p>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="w-[32px] h-[32px] rounded-lg p-2 bg-white shadow"
      >
        <IoEyeOutline className="w-full h-full" />
      </button>
    </div>
  );
};

export default ListCard;
