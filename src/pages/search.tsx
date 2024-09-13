import { useRouter } from "next/router"
import { ReactNode } from "react";
import SearchbarLayout from "./components/searchbar-layout";
import movies from "@/mock/movies.json"
import MovieItem from "./components/movie-item";
import style from "./search.module.css"

export default function Page() {
  const router = useRouter();

  return (
    <div className={style.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  )
}

Page.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>
}