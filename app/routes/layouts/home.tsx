import { Outlet } from "react-router";
import Hero from "~/component/Hero";

const HomeLayout = () => {
  return (
    <>
      <Hero name="MACK LAFOND" />
      <section className="max-w-6xl mx-auto my-8 px-6">
        <Outlet />
      </section>
    </>
  );
};

export default HomeLayout;
