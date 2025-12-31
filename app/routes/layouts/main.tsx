import { Outlet } from "react-router";
import type { Route } from "../home/+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev" },
    { name: "description", content: "Custom website developp" },
  ];
}

const MainLayout = () => {
  return (
    <>
      <section className="max-w-6xl mx-auto my-8 px-6">
        <Outlet />
      </section>
    </>
  );
};

export default MainLayout;
