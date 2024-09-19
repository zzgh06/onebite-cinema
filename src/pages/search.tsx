import { ReactNode, useEffect, useState } from "react";
import SearchbarLayout from "../components/searchbar-layout";
import MovieItem from "../components/movie-item";
import style from "./search.module.css"
import { useRouter } from "next/router";
import { MovieData } from "@/types";
import fetchMovies from "@/lib/fetch-movies";

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([])
  
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchMovies(q as string);
    setMovies(data)
  }

  useEffect(()=>{
    if(q){
      fetchSearchResult();
    }
  }, [q])

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