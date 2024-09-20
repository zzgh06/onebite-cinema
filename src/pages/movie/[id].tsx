import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css"
import fetchOneMovie from "../../lib/fetch-one-movie";
import fetchMovies from "@/lib/fetch-movies";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = async () => {
  const movies = await fetchMovies();
  return {
    paths: movies.map(({ id }) => ({
      params: { id: id.toString() },
    })),
    fallback: true,
  }
}

export const getStaticProps = async (
  context: GetStaticPropsContext
) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));
  return {
    props: {
      movie,
    }
  }
}

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입씨네마</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입씨네마" />
          <meta
            property="og:description"
            content="한입 씨네마에 등록된 영화들을 만나 보세요"
          />
        </Head>
        <div>로딩 중 입니다.</div>
      </>
    )
  }
  if (!movie) return "문제가 발생했습니다. 다시 시도해주세요.";

  const {
    title,
    subTitle,
    company,
    runtime,
    description,
    posterImgUrl,
    releaseDate,
    genres,
  } = movie;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={posterImgUrl} />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={description}
        />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${posterImgUrl}')` }}
        >
          <img src={posterImgUrl} />
        </div>

        <div className={style.info_container}>
          <div>
            <h2 className={style.title}>{title}</h2>
            <div>
              {releaseDate} / {genres.join(", ")} / {runtime}분
            </div>
            <div>{company}</div>
          </div>

          <div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.description}>{description}</div>
          </div>
        </div>
      </div>
    </>
  )
}