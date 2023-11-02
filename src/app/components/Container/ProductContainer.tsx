import FoodCard from "../Card/FoodCard";

const ProductContainer: React.FC = () => {
    return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-10 ">
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
          </div>
        </>
    );
};

export default ProductContainer;