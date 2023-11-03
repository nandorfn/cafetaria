'use client'
import { addCart } from "@/app/redux/slice/cartSlice";
import { Food } from "@/app/utils/types";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  data: Food;
}

const FoodCard = ({ data }: Props) => {
  const { price } = data;
  const [product, setProduct] = useState([data]);
  const dispatch = useDispatch();


  const selectedCart = (id: string) => {
    const selectedItem = product.find(item => item.productId === id);
    return selectedItem
  }

  const addProductToCart = (e: React.SyntheticEvent) => {
    const { id } = e.target as HTMLButtonElement;
    const newCart = selectedCart(id);
    postCartData(newCart)
  }

  const postCartData = async (data: any) => {
    axios.post('/api/carts', data.id)
    .then((res) => {
      dispatch(addCart(data))
    })
  }
  return (
    <>
      <div className="card card-compact w-fit h-full bg-white shadow-xl">
        <figure>
          <Image
            className='w-full'
            src={data.imgLink}
            alt="Jacket"
            width={400}
            height={400}
            priority
          />
        </figure>
        <div className="card-body">
          <div className="flex w-full flex-row justify-between items-center">
            <h2 className="w-fit card-title">{data.name}</h2>
            <p className="w-fit text-end text-error font-bold text-base">{`Rp${price.toLocaleString('ID-id')}`}</p>
          </div>
          <p>{data.description}</p>
          <div className="card-actions justify-end">
            <button
              onClick={addProductToCart}
              id={data.productId}
              className="btn btn-warning btn-sm text-white hover:opacity-70">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodCard;