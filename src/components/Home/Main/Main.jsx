import './Main.css'
import Hero from "../Hero/Hero";
import AboutProject from "../AboutProject/AboutProject";
import Stacks from "../Stacks/Stacks";
import Student from "../Student/Student";
import Portfolio from "../../Portfolio/Portfolio";
import { useRef } from "react";


export default function Main() {

  const pointSmoothScrollRef = useRef(null);


  return (
    <main className={'main'}>
      <Hero pointSmoothScrollRef={pointSmoothScrollRef} />

      <div ref={pointSmoothScrollRef}></div>
      <AboutProject />

      <Stacks />
      <Student />
      <Portfolio />
    </main>
  )
}
