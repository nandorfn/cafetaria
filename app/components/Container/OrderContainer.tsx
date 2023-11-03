'use client'
import { useEffect } from "react";
import OrderCard from "../Card/OrderCard";
import { Flex } from "./Flex";
import { useAppSelector } from "@/app/utils/hooks";
import { fetchUserCart } from "@/app/redux/slice/cartSlice";
import { store } from "@/app/redux/store/store";
import { ProductCartState } from "@/app/utils/types";

const OrderContainer: React.FC = () => {
  const carts = useAppSelector((state) => state.cart.carts);
  let subTotal = 0
  carts.forEach((item: ProductCartState) => {
    const total = item.quantity * item.price;
    subTotal += total;
  })
  
  useEffect(() => {
    const fetchData = async () => {
      await store.dispatch(fetchUserCart())
    }
    fetchData();
  }, [])
      
  return (
    <>
      <ul className="flex flex-col gap-3 h-screen pb-4 overflow-y-scroll" style={{height: 'calc(100vh - 30rem)'}}>
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

      <div className="divider my-0 py-0"></div>
      <Flex align={'between'}>
        <h1 className="text-lg font-medium">{`Total Amount:`}</h1>
        <h1 className="text-lg font-medium">{`Rp${subTotal.toLocaleString('ID-id')}`}</h1>
      </Flex>
    </>
  );
};

export default OrderContainer;