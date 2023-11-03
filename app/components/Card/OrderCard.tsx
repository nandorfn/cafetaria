'use client'
import Image from "next/image";
import xIcon from '@/app/assets/svg/xIcon.svg';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { decrement, increment, deleteCart } from "@/app/redux/slice/cartSlice";
import {  ProductCartState } from "@/app/utils/types";
import axios from "axios";

type Props = {
  item: ProductCartState;
}

const OrderCard = ({ item }: Props) => {
  const Dispatch = useDispatch();
  
  const updateQuantity = async (productId: string, quantity: number, operation: string) => {
    try {
      if (operation === '+') {
        await axios.patch(`/api/carts/${productId}`, { quantity });
        Dispatch(increment(productId));
      } else {
        await axios.patch(`/api/carts/${productId}`, { quantity });
        Dispatch(decrement(productId));
      }
    } catch (error) {
      console.error('Gagal memperbarui quantity:', error);
    }
  };
  
  const counterNumber = (action: string) => {
    if (action === '+') {
      updateQuantity(item.productId, item.quantity + 1, '+' );
    } else if (action === '-') {
      if (item.quantity > 1) {
        updateQuantity(item.productId, item.quantity - 1, '-');
      }
    }
  }
  
  const deleteCartById = async (productId: string, id: number) => {
    await axios.delete(`/api/carts/${id}`)
    .then((res) => {
      if (res.status === 200) {
        Dispatch(deleteCart(productId))
      }
    })
    .catch(error => {
      console.log(error)
    })
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
          onClick={() => deleteCartById(item.productId, item.id)}
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