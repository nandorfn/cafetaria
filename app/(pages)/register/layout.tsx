import Image from "next/image";
import img from '@/app/assets/victoria-shes-UC0HZdUitWY-unsplash.jpg'


const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <main className="flex h-screen w-screen flex-row">
        <div className="flex m-auto h-fit rounded-xl p-8">
          {children}
        </div>
        <div className="card bg-base-100 shadow-xl image-full w-1/3 h-[90%] my-auto me-8 relative">
          <figure>
            <Image
              className="rounded-3xl"
              src={img}
              fill={true}
              alt="Thumbnail"
              priority
            />
          </figure>
          <div className="card-body flex justify-center my-auto items-center">
            <h2 className="card-title text-4xl text-white">Crafing Something?</h2>
            <p className="text-white text-xl">Let&apos; get you started!</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default layout;