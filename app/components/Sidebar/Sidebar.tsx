import { HTMLAttributes } from "react";
import Avatar from "../Avatar/Avatar";
import Link from "next/link";
import { checkUserLogin } from "@/app/utils/auth";
import OrderContainer from "../Container/OrderContainer";
import OrderBtn from "../Button/OrderBtn";

interface Sidebar extends HTMLAttributes<HTMLElement> { }
const Sidebar: React.FC<Sidebar> = async ({ className }) => {
  const user = await checkUserLogin();

  return (
    <>
      <aside className="hidden lg:flex w-[20%] lg:flex-col mx-auto px-6 gap-5 h-screen">
        <section className="flex flex-row justify-end mt-4 items-center">
          {user &&
            <>
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

          :
          <OrderBtn />

        }
      </aside>
    </>
  );
};

export default Sidebar;