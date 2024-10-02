import Explore from "@/Components/Hero/Explore"
import Features from "@/Components/Hero/Features"
import Hero from "@/Components/Hero/Hero"
import NewsLetter from "@/Components/Hero/NewsLetter"
import Review from "@/Components/Hero/Review"
import Workflow from "@/Components/Workflow/Workflow"


export const Home = () => {
  
  return (
    <>
      <Hero/>
      <Features/>
      <Workflow/>
      <Explore/>
      <Review/>
      <NewsLetter/>
    </>
  )
}

