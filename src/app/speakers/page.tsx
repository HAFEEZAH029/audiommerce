import Assurance from "@/components/Assurance";
import Banner from "@/components/Banner";
import Category from "@/components/Category";
import ProductCard from "@/components/ProductCard";

const page = () => {

    const ZX7 = {
        images: {
            desktop: "/assets/shared/desktop/image-zx7-speaker.jpg",
            tablet: "/assets/shared/mobile/image-zx7-speaker.jpg",
            mobile: "/assets/shared/tablet/image-zx7-speaker.jpg",
        },
        name: "ZX7 SPEAKER",
        description: "Stream high quality sound wirelessly with minimal to no loss. The ZX7 speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
        slug: "zx7-speaker",
        category: "speakers"
    }

    const ZX9 = {
        images: {
            desktop: "/assets/shared/desktop/image-zx9-speaker.jpg",
            tablet: "/assets/shared/tablet/image-zx9-speaker.jpg",
            mobile: "/assets/shared/mobile/image-zx9-speaker.jpg",
        },
        name: "ZX9 SPEAKER",
        description: "Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
        slug: "zx9-speaker",
        category: "speakers"
    }

  return (
    <>
      <Banner title="SPEAKERS" />
      <ProductCard images={ZX9.images} name={ZX9.name} description={ZX9.description} slug={ZX9.slug} category={ZX9.category} isNew />
      <ProductCard images={ZX7.images} name={ZX7.name} description={ZX7.description} slug={ZX7.slug} category={ZX7.category} reversed />
      <Category />
      <Assurance />

    </>
  )
}

export default page
