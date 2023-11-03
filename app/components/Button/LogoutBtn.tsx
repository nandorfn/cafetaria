'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Transparent } from "../Container/Transparent";

const LogoutBtn: React.FC = () => {
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
    <>  {
      loading &&
      <Transparent>
        <span className="loading loading-spinner loading-lg"></span>
      </Transparent>
    }

      <button
        onClick={handleLogout}
        className="btn-wide  justify-center bg-white border-0 text-black hover:bg-white hover:border ">
        Logout
      </button>
    </>
  );
};

export default LogoutBtn;