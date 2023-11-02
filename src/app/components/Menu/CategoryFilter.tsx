import Link from "next/link";

type Category = {
  label: string;
  link: string;
}

const CategoryFilter: React.FC = () => {
  const category: Category[] = [
    { label: 'Main Course', link: 'main' },
    { label: 'Appetizer', link: 'appetizer' },
    { label: 'Drinks', link: 'drinks' },
    { label: 'Dishes', link: 'dishes' },
  ]

  return (
    <>
      <ul className="flex flex-row gap-5">
        {category.map((option: Category, index: number) => (
          <li key={index}>
            <Link href={`?category=${option.link}`}>
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