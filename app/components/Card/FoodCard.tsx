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
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([data]);
  const { price } = data;
  const dispatch = useDispatch();


  const selectedCart = (id: string) => {
    const selectedItem = product.find(item => item.productId === id);
    return selectedItem
  }

  const addProductToCart = (id: string) => {
    const newCart = selectedCart(id);
    postCartData(newCart)
  }

  const postCartData = async (data: any) => {
    setLoading(true);
    axios.post('/api/carts', {
      productId: data.productId
    })
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        dispatch(addCart(data))
      } else {
        throw new Error(res.data.errors)
      }
    })
    .catch((err) => {
      const error = err.response.data.errors;
      alert(error);
    })
    .finally(() => setLoading(false));
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
              onClick={() => addProductToCart(data.productId)}
              id={data.productId}
              disabled={loading}
              className="btn btn-warning btn-sm text-white hover:opacity-70 disabled:opacity-70">Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodCard;