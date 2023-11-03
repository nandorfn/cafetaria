'use client'
import Image from "next/image";
import xIcon from '@/app/assets/svg/xIcon.svg';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { decrement, increment, deleteCart } from "@/app/redux/slice/cartSlice";
import {  ProductCartState } from "@/app/utils/types";

type Props = {
  item: ProductCartState;
}

const OrderCard = ({ item }: Props) => {
  const Dispatch = useDispatch();
  const counterNumber = (action: string) => {
    if (action === '+') {
      Dispatch(increment(item.productId))
    } else if (action === '-') {
      Dispatch(decrement(item.productId))
    }
  }
  
  const deleteCartById = (productId: string) => {
    Dispatch(deleteCart(productId))
  }

  return (
    <>
      <figure className="flex flex-row gap-2 items-center justify-between">
        <div className="inline-flex gap-3">
          <Image
            className="rounded-md object-cover"
            src={item.imgLink}
            alt="Product Image"
            width={80}
            height={80}
          />
          <div className="flex flex-col gap-1">
            <h2 className="font-medium">{item.name}</h2>
            <p>{`Rp${item.price.toLocaleString('ID-id')}`}</p>
            <div className="inline-flex gap-1">
              <button
                onClick={() => counterNumber('-')}
                className="btn btn-xs bg-slate-100 border-0"
                type="button">-
              </button>
              <p>{item.quantity}</p>
              <button
                onClick={() => counterNumber('+')}
                className="btn btn-xs bg-slate-100 border-0"
                type="button">+
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={() => deleteCartById(item.productId)}
          className=" rounded-lg border-0 bg-transparent px-2 btn btn-sm hover:bg-warning">
          <Image
            src={xIcon}
            alt="Delete"
            width={20}
            height={20}
          />
        </button>
      </figure>
    </>
  );
};

export default OrderCard;