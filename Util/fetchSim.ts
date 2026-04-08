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

type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  features: string;
  includes: bonus[];
  galery: {
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

const fetchSim = async (slug: string): Promise<Product | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await fetch ('./data.json');

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Product[] = await response.json();
    return data.find((product) => product.slug === slug);
}