import { ReactNode } from "react";
import SearchbarLayout from "./components/searchbar-layout";
import MovieItem from "./components/movie-item";
import style from "./search.module.css"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchMovies from "./lib/fetch-movies";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const q = context.query.q;
  const movies = await fetchMovies(q as string);
  return {
    props: {
      movies,
    }
  }
}

export default function Page({movies}:InferGetServerSidePropsType<typeof getServerSideProps>) {

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