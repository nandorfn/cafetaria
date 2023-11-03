import { Flex } from "@/app/components/Container/Flex";
import FormProdcut from "./components/FormProdcut";
import { getAllProducts } from "@/app/utils/queryDb";
import { ProductCart } from "@/app/utils/types";
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