import { getAllProducts } from "@/app/utils/queryDb";
import Table from "./components/Table";

const page = async () => {
  const products = await getAllProducts();
  return (
    <>
      <h1 className="text-2xl font-medium">
        {'Product List'}
      </h1>
      <Table
        products={products}
      />
    </>
  );
};

export default page;