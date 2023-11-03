import { getAllFoods } from "@/app/utils/queryDb";
import FoodCard from "../Card/FoodCard";

type Props = {
  params: {[key: string]: string | string[] | undefined}
}

const ProductContainer = async ({params}: Props) => {
  const products = await getAllFoods({params})
  return (
    <>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-10 ">
          {products.map((item) => (
            <li key={item.id}>
              <FoodCard
                data={item}
              />
            </li>
          ))
          }
        </ul>
    </>
  );
};

export default ProductContainer;