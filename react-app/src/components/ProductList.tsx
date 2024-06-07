import React, { useEffect, useState } from "react";

const ProductList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    console.log("fetching products in ", category);
    setProducts(["Clothing", "Household"]);
  }, [category]);

  return (
    <div>
      <p>ProductList</p>
    </div>
  );
};

export default ProductList;
