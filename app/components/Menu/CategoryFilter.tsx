import { CategoryLink, categoryLink } from "@/app/utils/objectData";
import Link from "next/link";

const CategoryFilter: React.FC = () => {
  return (
    <>
      <ul className="flex flex-row gap-5">
        {categoryLink.map((option: CategoryLink, index: number) => (
          <li key={index}>
            <Link href={option.label !== 'All Categories' ? `?category=${option.link}` : '/'}>
              <button
                className="bg-white font-medium text-neutral hover:bg-success shadow-sm  px-4 py-2 rounded-lg whitespace-nowrap"
              >
                {option.label}
              </button>
            </Link>
          </li>
        ))
        }
      </ul>
    </>
  );
};

export default CategoryFilter;