import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import style from "./[id].module.css"
import fetchOneMovie from "../lib/fetch-one-movie";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));
  return {
    props : {
      movie,
    }
  }
}

export default function Page({movie} : InferGetServerSidePropsType<typeof getServerSideProps>) {
  if(!movie) return "문제가 발생했습니다. 다시 시도해주세요.";
  const {
    id,
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
  )
}