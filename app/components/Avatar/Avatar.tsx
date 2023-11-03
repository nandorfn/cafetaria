import Image from "next/image";
import avatar from '@/app/assets/user.png'

type Avatar = {
  username: string;
}

const Avatar = ({username}: Avatar) => {
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
                <p>{username}</p>
              </figure>
            </summary>
            <ul className="bg-white flex justify-center py-2 rounded-md">
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