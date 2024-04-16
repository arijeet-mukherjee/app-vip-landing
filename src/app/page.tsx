import Image from "next/image";
import Header from "@component/Header";
import '../global.css';
import { capitalizeString } from "@util/index";

export default function Home() {

  return (
    <>
      <Header />
      <div> {"Running in : " + process.env.NODE_ENV} </div>


    </>
  );
}
