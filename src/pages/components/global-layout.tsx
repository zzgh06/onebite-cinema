import Link from "next/link";
import style from "./global-layout.module.css"
import { ReactNode } from "react";

export default function GlobalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={style.container}>
      <header>
        <Link href={"/"}>ONEBITE CINEMA</Link>
      </header>
      {children}
      <footer></footer>
    </div>
  );
}