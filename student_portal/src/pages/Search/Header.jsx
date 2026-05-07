import SearchField from "./SearchField";

const Header = () => {
  return (
    <section className="w-full py-10 md:py-20 padding-x text-center flex flex-col items-center gap-5">
      <p className="uppercase text-lg font-semibold">
        Discover Your Next Great Read:
      </p>
      <h1 className="text-[36px] md:text-[56px] font-semibold leading-[44px] md:leading-[64px] lg:w-[80%] xl:w-[60%] mx-auto">
        Explore and Search for Any Book In Our Library
      </h1>

      <SearchField />
    </section>
  );
};

export default Header;
