import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | welcome" },
    { name: "description", content: "Custom website developp" },
  ];
}

export default function Home() {
  console.log("home");
  return <>Home Page</>;
}
