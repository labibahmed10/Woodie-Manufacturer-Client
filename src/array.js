// You have an array of products. Each product has a name, price, description, etc. How will you
// implement a search to find products by name?

const products = [
  { name: "Shoe", price: 120, description: "We wear this" },
  { name: "Shoe", price: 120, description: "We wear this" },
  { name: "T-shirt", price: 100, description: "We wear this" },
  { name: "T-shirt", price: 100, description: "We wear this" },
  { name: "Pant", price: 220, description: "We wear this" },
  { name: "Watch", price: 190, description: "We wear this" },
  { name: "Perfume", price: 500, description: "We use this" },
];

const searchByName = (name) => {
  const result = products.filter((items) => items.name.toLowerCase().includes(name));
  console.log(result);
};

searchByName("shoe");
