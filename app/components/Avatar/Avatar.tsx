import Image from "next/image";
import avatar from '@/app/assets/user.png'

const Avatar: React.FC = () => {
  return (
    <>
      <ul className="menu lg:menu-horizontal text-black  rounded-box p-0">
        <li>
          <details >
            <summary>
              <figure className="inline-flex items-center gap-2">
                <Image
                  src={avatar}
                  width={30}
                  height={30}
                  alt="User Avatar"
                />
                <p>John Doe</p>
              </figure>
            </summary>
            <ul className="bg-white">
              <li>
                <button className="btn btn-sm btn-error">Logout</button>
              </li>
            </ul>
          </details>
        </li>
      </ul>


    </>
  );
};

export default Avatar;