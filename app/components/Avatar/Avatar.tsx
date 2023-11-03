'use client'
import Image from "next/image";
import avatar from '@/app/assets/user.png'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Transparent } from "../Container/Transparent";

type Avatar = {
  username: string;
}

const Avatar = ({ username }: Avatar) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    await axios.get('/api/logout')
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          router.refresh()
        }
      }
      )
  }
  return (
    <>
      {loading
        ?
        <Transparent>
          <span className="loading loading-spinner loading-lg"></span>
        </Transparent>
        :
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
                  <button 
                    onClick={handleLogout} 
                    className="btn btn-sm btn-error">Logout
                  </button>
                </li>
              </ul>
            </details>
          </li>
        </ul>

      }
    </>
  );
};

export default Avatar;