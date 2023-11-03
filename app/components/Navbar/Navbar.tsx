import storeIcon from '@/app/assets/shopping-bag.png'
import Image from 'next/image';
import { HTMLAttributes } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { cn } from '../../utils/utils';
import Link from 'next/link';
import { checkUserLogin } from '@/app/utils/auth';

interface Navbar extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const Navbar: React.FC<Navbar> = async ({
  children,
  className,
  ...props
}) => {

  const user = await checkUserLogin();

  return (
    <>
      <div className={cn('flex flex-row w-full', className)} {...props}>
        <div className='flex flex-col w-full lg:w-[80%] bg-zinc-100'>
          <header className='pb-4 pt-6 mx-8 border-b'>
            <nav className='flex flex-row justify-between mx-auto'>
              <Link href={'/'}>
                <h1 className='font-medium text-2xl text-warning'>Cafetaria</h1>
              </Link>
              { user && user.role === 'admin' &&
              <Link className='items-center font-medium text-lg bg-warning px-4 py-1 rounded-full text-white hover:opacity-70' href={'/admin'}>
                Admin Dashboard
              </Link>
              
              }

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
        />
      </div>
    </>
  );
};

export default Navbar;