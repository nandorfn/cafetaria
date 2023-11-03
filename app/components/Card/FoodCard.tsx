import { Food, TProductSchema } from "@/app/utils/types";
import Image from "next/image";

type Props = {
  data: Food;
}

const FoodCard = ({data}: Props) => {
  const { price } = data;
  return (
    <>
      <div className="card card-compact w-fit bg-white shadow-xl">
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
            <button className="btn btn-warning btn-sm text-white hover:opacity-70">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodCard;