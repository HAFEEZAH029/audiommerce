import "dotenv/config";
import { prisma } from '../src/lib/prisma';

const data = require('../src/data/data.json');

async function main() {
  for (const product of data) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        new: product.new,
        category: product.category,
        categoryImage: product.categoryImage,
        features: product.features,
        includes: product.includes,
        gallery: product.gallery,
        others: product.others,
      },
    });
  }
  console.log('Seeded products');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });