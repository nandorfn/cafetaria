import Avatar from "@/app/components/Avatar/Avatar";
import { checkUserLogin } from "@/app/utils/auth";
import Link from "next/link";


const ListMenu = async () => {
  const user = await checkUserLogin();

  const menus = [
    { label: 'Dashboard', Link: '/admin/' },
    { label: 'Products', Link: '/admin/products' },
  ]

  return (
    <ul className={`text-neutral text-xl`}>
      {menus?.map((menu, index) =>
        <li key={index}
          className={`hover:bg-white rounded-lg`}>
          <Link
            className={`hover:text-neutral text-white font-medium `}
            href={menu.Link}>
            {menu.label}
          </Link>
        </li>
      )}

      {user &&
        <li className="absolute bottom-8 flex w-full">
          <button className="btn-wide  justify-center bg-white border-0 text-black hover:bg-white hover:border ">
            Logout
          </button>
        </li>
      }
    </ul>
  );
};

export default ListMenu;