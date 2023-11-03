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
      <div className="card card-compact w-fit min-h-full bg-white shadow-xl">
        <figure className="h-[60%]">
          <Image
            className='w-full'
            src={data.imgLink}
            alt="Jacket"
            width={278}
            height={180}
            priority
          />
        </figure>
        <div className="card-body h-[40%]">
          <div className="flex flex-col  w-full">
            <h2 className="w-fit card-title line-clamp-1">{data.name}</h2>
            <p className="w-fit md:text-end text-error font-bold text-sm md:text-base">{`Rp${price.toLocaleString('ID-id')}`}</p>
          </div>
          <p className="text-neutral text-xs md:text-sm line-clamp-1">{data.description}</p>
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