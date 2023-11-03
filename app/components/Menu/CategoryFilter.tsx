'use client'
import { CategoryLink, categoryLink } from "@/app/utils/objectData";
import { cn } from "@/app/utils/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CategoryFilter: React.FC = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return (
    <>
      <ul className="flex flex-row gap-5">
        {categoryLink.map((option: CategoryLink, index: number) => {
          const style = category === option.link && 'bg-warning'
        
          return (
            <li key={index}>
              <Link href={option.label !== 'All Categories' ? `?category=${option.link}` : '/'}>
                <button
                  className={cn('bg-white font-medium hover:bg-warning shadow-sm  px-4 py-2 rounded-lg whitespace-nowrap', style)}
                >
                  {option.label}
                </button>
              </Link>
            </li>
          )
        })
        }
      </ul>
    </>
  );
};

export default CategoryFilter;