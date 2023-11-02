import ProductContainer from '@/app/components/Container/ProductContainer'
import CategoryFilter from '@/app/components/Menu/CategoryFilter'
export default function Home() {
  return (
    <>
      <div className='mx-8 mt-3 gap-5 flex flex-col '>
        <section className='flex flex-col gap-3'>
          <h1 className='font-medium text-2xl'>{'Categories'}</h1>
          <span className='text-neutral'>{'Select categories you like to eat from.'}</span>
          <CategoryFilter />
        </section>
        <ProductContainer />
      </div>
    </>
  )
}
