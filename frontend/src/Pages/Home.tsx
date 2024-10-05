import Explore from "@/Components/Hero/Explore"
import Features from "@/Components/Hero/Features"
import Hero from "@/Components/Hero/Hero"
import NewsLetter from "@/Components/Hero/NewsLetter"
import Review from "@/Components/Hero/Review"
import Workflow from "@/Components/Workflow/Workflow"
import { Helmet } from "react-helmet-async"


export const Home = () => {
  
  return (
    <>
      <Helmet>
        <title>MyCodingNotes</title>
        <link rel="canonical" href="https://mycodingnotes.tech/" />
      </Helmet>
      <Hero/>
      <Features/>
      <Workflow/>
      <Explore/>
      <Review/>
      <NewsLetter/>
    </>
  )
}

