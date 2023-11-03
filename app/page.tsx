import ProductContainer from "./components/Container/ProductContainer";
import CategoryFilter from "./components/Menu/CategoryFilter";
import Navbar from "./components/Navbar/Navbar";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <>
      <Navbar>
        <div className='mx-8 mt-3 gap-5 flex flex-col '>
          <section className='flex flex-col gap-3'>
            <h1 className='font-medium text-2xl'>{'Categories'}</h1>
            <span className='text-neutral'>{'Select categories you like to eat from.'}</span>
            <div className='stats bg-transparent'>
              <CategoryFilter />
            </div>
          </section>
          <div className=" h-screen pb-52 overflow-y-scroll" >
            <ProductContainer
              params={searchParams}
            />
          </div>
        </div>
      </Navbar>
    </>
  )
}
