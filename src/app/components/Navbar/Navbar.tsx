import storeIcon from '@/app/assets/shopping-bag.png'
import Image from 'next/image';
import { HTMLAttributes } from 'react';
import Sidebar from '@/app/components/Sidebar/Sidebar';
import { cn } from '@/app/utils/utils';

interface Navbar extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const Navbar: React.FC<Navbar> = ({
  children,
  className,
  ...props
}) => {

  return (
    <>
      <div className={cn('flex flex-row w-full', className)} {...props}>
        <div className='flex flex-col w-full lg:w-[80%] bg-slate-100'>
          <header className='py-4 mx-8 border-b'>
            <nav className='flex flex-row justify-between mx-auto'>
              <h1 className='font-medium text-2xl text-success'>Cafetaria</h1>

              <button className='bg-warning hover:bg-yellow-300 md:hidden rounded-lg p-2'>
                <Image
                  width={24}
                  src={storeIcon}
                  alt="shoping bag" />
              </button>
            </nav>
          </header>
          {children}
        </div>
        <Sidebar
          className='w-[20%]'
        />
      </div>
    </>
  );
};

export default Navbar;