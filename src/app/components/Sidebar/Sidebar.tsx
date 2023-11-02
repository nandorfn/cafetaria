import { HTMLAttributes } from "react";
import OrderCard from "../Card/OrderCard";
import shopBag from '@/app/assets/shopping-bag.png'
import Image from "next/image";
import Avatar from "../Avatar/Avatar";
import Link from "next/link";

interface Sidebar extends HTMLAttributes<HTMLElement> { }
const Sidebar: React.FC<Sidebar> = ({ className }) => {
  return (
    <>
      <aside className="hidden lg:flex lg:flex-col mx-auto px-4 gap-5 h-screen">
        <section className="flex flex-row justify-between mt-4 items-center">
          <Link href={'/order'}>
            <Image
              src={shopBag}
              alt="Order History"
              width={24}
              height={24}
            />
          </Link>
          <Avatar />
        </section>
        <div>
          <h1 className="text-2xl font-medium">My Order</h1>
          <p className="text-neutral">Select category you&apos;d like to eat from.</p>
        </div>
        <ul className="flex flex-col gap-3">
          <li>
            <OrderCard />
          </li>
          <li>
            <OrderCard />
          </li>
          <li>
            <OrderCard />
          </li>
          <li>
            <OrderCard />
          </li>
        </ul>
        <div className="divider"></div>
        <h1 className="text-lg font-medium">Total Amount: </h1>
        <button className="btn btn-success hover:opacity-70">{'Checkout'}</button>
      </aside>
    </>
  );
};

export default Sidebar;