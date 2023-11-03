import LogoutBtn from "@/app/components/Button/LogoutBtn";
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
         <LogoutBtn />
        </li>
      }
    </ul>
  );
};

export default ListMenu;