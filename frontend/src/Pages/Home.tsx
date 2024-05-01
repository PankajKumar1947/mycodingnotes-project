import { Card } from "../Components/Card/Card"
import { Navbar } from "../Components/Header/Navbar"

export const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="w-[90vw] mx-auto  grid md:grid-cols-2 justify-between gap-5 mt-5 ">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
       
    </div>
    </>
  )
}

