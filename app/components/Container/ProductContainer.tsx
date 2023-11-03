import { getAllFoods } from "@/app/utils/queryDb";
import FoodCard from "../Card/FoodCard";

const ProductContainer = async () => {
  const products = await getAllFoods({})
  console.log(products);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-10 ">
        <ul>
          {products.map((item) => (
            <li key={item.id}>
              <FoodCard
                data={item}
              />
            </li>
          ))
          }
        </ul>
      </div>
    </>
  );
};

export default ProductContainer;