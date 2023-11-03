import { HTMLAttributes } from "react";
import OrderCard from "../Card/OrderCard";
import shopBag from '@/app/assets/shopping-bag.png'
import Image from "next/image";
import Avatar from "../Avatar/Avatar";
import Link from "next/link";
import { checkUserLogin } from "@/app/utils/auth";
import OrderContainer from "../Container/OrderContainer";

interface Sidebar extends HTMLAttributes<HTMLElement> { }
const Sidebar: React.FC<Sidebar> = async ({ className }) => {
  const user = await checkUserLogin();

  return (
    <>
      <aside className="hidden lg:flex w-[20%] lg:flex-col mx-auto px-6 gap-5 h-screen">
        <section className="flex flex-row justify-between mt-4 items-center">
          {user &&
            <>
              <Link href={'/order'}>
                <Image
                  src={shopBag}
                  alt="Order History"
                  width={24}
                  height={24}
                />
              </Link>
              <Avatar
                username={user?.username ?? ''}
              />
            </>
          }
        </section>
        <div>
          <h1 className="text-2xl font-medium">My Order</h1>
          <p className="text-neutral">Select category you&apos;d like to eat from.</p>
        </div>
        <OrderContainer />
        {!user
          ?
          <Link href={'/login'}>
            <button className="btn btn-warning w-full text-white hover:opacity-70">{'Login to Checkout'}</button>
          </Link>

          : <button className="btn btn-warning text-white hover:opacity-70">{'Checkout'}</button>

        }
      </aside>
    </>
  );
};

export default Sidebar;