import Image from "next/image";

const FoodCard: React.FC = () => {
  const imgurl = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1998&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  return (
    <>
      <div className="card card-compact w-fit bg-white shadow-xl">
        <figure>
          <Image
            className='w-full'
            src={imgurl}
            alt="Jacket"
            width={400}
            height={400}
            priority
          />
        </figure>
        <div className="card-body">
          <div className="flex w-full flex-row justify-between items-center">
            <h2 className="w-fit card-title">Shoes!</h2>
            <p className="w-fit text-end text-error font-bold text-base">$300</p>
          </div>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-warning btn-sm text-white hover:opacity-70">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodCard;