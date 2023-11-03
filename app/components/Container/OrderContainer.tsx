'use client'
import OrderCard from "../Card/OrderCard";
import { Flex } from "./Flex";
import { useAppSelector } from "@/app/utils/hooks";

const OrderContainer: React.FC = () => {
  const carts = useAppSelector((state) => state.cart.carts);
  let subTotal = 0
  carts.forEach((item: any) => {
    const total = item.quantity * item.price;
    subTotal += total;
  })
  return (
    <>
      <ul className="flex flex-col gap-3">
        {!carts
          ? <p>Empty</p>
          : carts?.map((item: any) => (
            <li key={item.id}>
              <OrderCard
                item={item}
              />
            </li>

          ))
        }
      </ul>

      <div className="divider"></div>
      <Flex align={'between'}>
        <h1 className="text-lg font-medium">{`Total Amount:`}</h1>
        <h1 className="text-lg font-medium">{`Rp${subTotal.toLocaleString('ID-id')}`}</h1>
      </Flex>
    </>
  );
};

export default OrderContainer;