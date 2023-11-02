import ProductContainer from '@/app/components/Container/ProductContainer'
import Navbar from '@/app/components/Navbar/Navbar'
import Sidebar from '@/app/components/Sidebar/Sidebar'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div className='mx-8 '>
        <ProductContainer />
      </div>
    </>
  )
}
