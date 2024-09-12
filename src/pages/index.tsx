import { ReactNode } from "react";
import SearchbarLayout from "./components/searchbar-layout";

export default function Home() {
  return (
    <h1>ONEBITE CINEMA</h1>
  );
}

Home.getLayout = (page : ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>
}