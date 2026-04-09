import Assurance from "@/components/Assurance"
import Category from "@/components/Category"
import Banner from "@/components/Banner"
import ProductCard from "@/components/ProductCard"

const page = () => {

    const mark1 = {
        images: {
            desktop: "/assets/shared/desktop/image-xx99-mark-one-headphones.jpg",
            tablet: "/assets/shared/mobile/image-xx99-mark-one-headphones.jpg",
            mobile: "/assets/shared/tablet/image-xx99-mark-one-headphones.jpg",
        },
        name: "XX99 Mark I HEADPHONES",
        description: "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
        slug: "xx99-mark-one-headphones",
        category: "headphones"
    }

    const mark2 = {
        images: {
            desktop: "/assets/shared/desktop/image-xx99-mark-two-headphones.jpg",
            tablet: "/assets/shared/tablet/image-xx99-mark-two-headphones.jpg",
            mobile: "/assets/shared/mobile/image-xx99-mark-two-headphones.jpg",
        },
        name: "XX99 Mark II HEADPHONES",
        description: "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
        slug: "xx99-mark-two-headphones",
        category: "headphones"
    }

    const XX59 = {
        images: {
            desktop: "/assets/shared/desktop/image-xx59-headphones.jpg",
            tablet: "/assets/shared/tablet/image-xx59-headphones.jpg",
            mobile: "/assets/shared/mobile/image-xx59-headphones.jpg",
        },
        name: "XX59 HEADPHONES",
        description: "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
        slug: "xx59-headphones",
        category: "headphones"
    }



  return (
    <>
      <Banner title="HEADPHONES" />
      <ProductCard images={mark2.images} name={mark2.name} description={mark2.description} slug={mark2.slug} category={mark2.category} isNew />
      <ProductCard images={mark1.images} name={mark1.name} description={mark1.description} slug={mark1.slug} category={mark1.category} reversed />
      <ProductCard images={XX59.images} name={XX59.name} description={XX59.description} slug={XX59.slug} category={XX59.category} />
      <Category />
      <Assurance />
    </>
  )
}

export default page
