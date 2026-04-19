
type bonus = {
    quantity: number;
    item: string;
 }

 type extras = {
    slug: string;
    name: string;
    image: {
        mobile: string;
        tablet: string;
        desktop: string;
    };
 }

export type Product = {
  id: number;
  slug: string;
  name: string;
  new: boolean;
  description: string;
  category: string;
  price: number;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  categoryImage: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  features: string;
  includes: bonus[];
  gallery: {
    first: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    second: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    third: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  };
  others: extras[];
};