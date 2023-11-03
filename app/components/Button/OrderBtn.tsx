'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Transparent } from "../Container/Transparent";
import { Flex } from "../Container/Flex";
import { useAppSelector } from "@/app/utils/hooks";

const OrderBtn: React.FC = () => {
  const carts = useAppSelector((state) => state.cart.carts);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const router = useRouter()
  const handleOrder = () => {
    setLoading(true);
    axios.post('/api/orders').
      then((res) => {
        if (res.status === 201) {
          setModal(true);
        }
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          window.location.reload();
        }, 2000)
      })
  }


  return (
    <>
      {loading &&
        <Transparent>
          {modal
            ?
            <Flex variant={'col'} className="bg-white max-w-md rounded-lg gap-4 h-56 items-center justify-center">
              <h1 className=" text-2xl font-medium">Order Confirmed!</h1>
              <p className="text-xl font-medium">Thank you! we have received your order</p>
            </Flex>
            :
            <Flex variant={'col'} className="bg-white max-w-md rounded-lg gap-4 h-56 items-center justify-center">
              <span className="loading loading-infinity loading-lg"></span>
              <p className="text-xl font-medium">Your order is being processed</p>
            </Flex>
          }

        </Transparent>
      }
      {carts.length !== 0 &&
        <button
          disabled={loading}
          onClick={handleOrder}
          className="btn btn-warning text-white hover:opacity-70 disabled:opacity-70">{'Checkout'}
        </button>
      }
    </>
  );
};

export default OrderBtn;