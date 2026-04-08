import Assurance from "@/components/Assurance"
import Banner from "@/components/Banner"
import Category from "@/components/Category"
import ProductCard from "@/components/ProductCard"

const page = () => {

    const yx1 = {
        images: {
            desktop: "/assets/shared/desktop/image-category-page-preview.jpg",
            tablet: "/assets/shared/tablet/image-category-page-preview.jpg",
            mobile: "/assets/shared/mobile/image-category-page-preview.jpg",
        },
        name: "YX1 WIRELESS EARPHONES",
        description: "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
        slug: "yx1-earphones"
    }

  return (
    <div>
      <Banner title="EARPHONES" />
      <ProductCard images={yx1.images} name={yx1.name} description={yx1.description} slug={yx1.slug} isNew />
      <Category />
      <Assurance />
    </div>
  )
}

export default page
