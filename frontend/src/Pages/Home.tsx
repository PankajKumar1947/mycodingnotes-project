import { Card } from "../Components/Card/Card"

export const Home = () => {
  return (
    <>
    <div className="w-[90vw] mx-auto  grid md:grid-cols-2 justify-between gap-5 my-5 ">
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

