import { Flex } from "@/app/components/Container/Flex";
import FormProdcut from "./components/FormProdcut";

const page: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-medium">
        {'Product List'}
      </h1>
      <FormProdcut />
      <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Category</th>
        <th>Sold</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
        <td>Blue</td>
        <td>Blue</td>
      </tr>
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
        <td>Blue</td>
        <td>Blue</td>
      </tr>
    </tbody>
  </table>
</div>
    </>
  );
};

export default page;