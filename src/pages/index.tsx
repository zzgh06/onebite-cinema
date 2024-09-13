import { ReactNode } from "react";
import SearchbarLayout from "./components/searchbar-layout";
import style from "./index.module.css"
import movies from "@/mock/movies.json"
import MovieItem from "./components/movie-item";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.recommend_container}>
          {movies.slice(0, 3).map((movie)=>(
            <MovieItem key={`movie-${movie.id}`} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.all_container}>
          {movies.map((movie)=>(
            <MovieItem key={`movie-${movie.id}`} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>
}