import { getOrderProducts } from "@/app/utils/queryDb";

const page = async () => {
  const orders = await getOrderProducts();
  console.log(orders)

  return (
    <>
      <h1 className="text-2xl font-medium">
        {'Dashboard'}
      </h1>
      <h1 className="text-xl font-medium mt-5">
        {'History Order'}
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>No</th>
              <th>Order Item</th>
              <th>Total Income</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item: any, index: number) => {
              let subTotal = 0; 
              item.orderItems.forEach((item: any) => {
                subTotal += item.quantity * item.price
              })
              return (
              <tr key={item.id}>
                <th>{index + 1}</th>
                <td>
                  {item.orderItems?.map((product: any, index: number) => (
                    <p key={index}>
                      {product.name}
                    </p>
                  ))
                  }
                </td>
                <td>{`Rp${subTotal.toLocaleString('ID-id')}`}</td>
              </tr>
              )})
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default page;