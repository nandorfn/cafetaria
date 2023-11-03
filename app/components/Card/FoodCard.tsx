'use client'
import { Food } from "@/app/utils/types";
import Image from "next/image";
import { useState } from "react";

type Props = {
  data: Food;
}

const FoodCard = ({data}: Props) => {
  const { price } = data;
  const [product, setProduct] = useState([data]);
  const [cart, setCart] = useState<Food[]>([]);
  
  const selectedCart = (id: string) => {
    const newCart = [...product.filter((item) => item.id === Number(id))]
    
    }
  
  const addProductToCart = (e: React.SyntheticEvent) => {
    const { id } = e.target as HTMLButtonElement;
    selectedCart(id);
  }
  
  console
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
              id={data.id.toString()} 
              className="btn btn-warning btn-sm text-white hover:opacity-70">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodCard;