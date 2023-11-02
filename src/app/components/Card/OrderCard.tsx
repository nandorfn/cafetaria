import Image from "next/image";
import xIcon from '@/app/assets/svg/xIcon.svg'

const OrderCard: React.FC = () => {
  const imgurl = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1998&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  return (
    <>
      <figure className="flex flex-row gap-2 items-center justify-between">
        <div className="inline-flex gap-3">
          <Image
            className="rounded-md object-cover"
            src={imgurl}
            alt="Product Image"
            width={80}
            height={80}
          />
          <div className="flex flex-col gap-1">
            <h2 className="font-medium">{'Mexican Burger'}</h2>
            <p>{'$300 x2'}</p>
            <div className="inline-flex gap-1">
              <button className="btn btn-xs bg-slate-100 border-0" type="button">-</button>
              <p>5</p>
              <button className="btn btn-xs bg-slate-100 border-0" type="button">+</button>
            </div>
          </div>
        </div>

        <button className=" rounded-lg border-0 bg-transparent px-2 btn btn-sm hover:bg-warning">
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