import { useRouter } from "next/router"
import { ReactNode } from "react";
import SearchbarLayout from "./components/searchbar-layout";

export default function Page() {
  const router = useRouter();
  const { q } = router.query;
  return <h1>검색결과 : { q }</h1>
}

Page.getLayout = (page : ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>
}