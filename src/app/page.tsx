import Assurance from "@/components/Assurance"
import Category from "@/components/Category"
import Hero from "@/components/Home/Hero"
import YX1Earphones from "@/components/Home/YX1Earphones"
import ZX7Speaker from "@/components/Home/ZX7Speaker"
import ZX9Speaker from "@/components/Home/ZX9Speaker"


const page = () => {
  return (
    <>
      <Hero />
      <Category />
      <ZX9Speaker />
      <ZX7Speaker />
      <YX1Earphones />
      <Assurance />
    </>
  )
}

export default page
