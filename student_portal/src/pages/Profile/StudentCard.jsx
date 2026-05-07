const StudentCard = ({ student }) => {
  return (
    <div
      className="w-full max-w-[477px] min-h-[245px] relative overflow-hidden p-6 rounded-md"
      style={{
        backgroundImage: "url('/id-card-background-image.png')",
        backgroundPosition: "center",
        backgroundSize: "center",
      }}
    >
      <img
        src="/card-noise.png"
        alt="card-noise"
        className="w-full h-full object-cover z-0 absolute inset-0"
      />

      <div className="w-full flex items-center gap-5">
        <img
          src="/id-card-university-logo.svg"
          alt="id-card-university-logo"
          className="w-[69px] h-[70px]"
        />

        <div className="">
          <h3 className="text-lg font-bold text-white">
            JS Mastery University
          </h3>
          <p className="text-xs">Empowering Dreams, Inspiring Futures</p>
        </div>
      </div>

      <div className="w-full flex items-center gap-4 mt-5">
        <div className="min-w-[100px] h-[106px] bg-[#F3F3F3] rounded overflow-hidden relative">
          {student?.profilePicture ? (
            <img
              src={student?.profilePicture}
              alt=""
              className="w-full h-full object-cover z-10"
            />
          ) : (
            <></>
          )}
        </div>

        <div className="w-full space-y-1.5">
          <p className="text-xs">
            <span>Student ID</span>: <span>{student?.idNumber}</span>
          </p>
          <p className="text-xs">
            <span>Full Name</span>:{" "}
            <span>
              {student?.firstName} {student?.lastName}
            </span>
          </p>
          <p className="text-xs">
            <span>Department</span>: <span>{student?.department}</span>
          </p>
          <p className="text-xs">
            <span>Date of Birth</span>: <span>{student?.dateOfBirth}</span>
          </p>
          <p className="text-xs">
            <span>Contact no</span>: <span>{student?.phoneNumber}</span>
          </p>
        </div>
      </div>

      <img
        src="/qr-code-placeholder.png"
        alt="qr-code-placeholder"
        className="w-[72px] h-[72px] absolute bottom-5 right-5"
      />
    </div>
  );
};

export default StudentCard;
