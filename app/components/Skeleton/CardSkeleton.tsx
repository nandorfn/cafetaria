import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const CardSkeleton: React.FC = () => {
  return (
    <>
      <div className="card w-[98%] h-full bg-white">
        <figure className="h-[60%] -mt-4">
          <Skeleton height={180} borderRadius={12} width={278} />
        </figure>
        <div className="card-body h-[40%]">
          <Skeleton count={3} height={20} width={180} />
        </div>
      </div>
    </>
  );
};

export default CardSkeleton;