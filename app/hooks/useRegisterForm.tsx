import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TRegisterSchema, registerSchema } from "../utils/types";
import axios from "axios";
import { hashPass } from "../utils/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useRegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema)
  });
  
  const router = useRouter();

  const onSubmit = async (data: TRegisterSchema) => {
    setLoading(true);
    const { salt, hashedPassword } = hashPass(data.password);
    const newData = {
      name: data.name,
      email: data.email,
      salt,
      hashedPassword
    }
    axios.post('/api/register', newData)
      .then(response => {
        if (response.status === 200) {
          router.push('/login')
        } else {
          alert('Submitting form failed');
        }
      })
      .catch(error => {
        let errors = error.response.data.errors
        if (errors.name) {
          setError("name", {
            type: "server",
            message: errors.name,
          });
        }
        else if (errors.email) {
          setError("email", {
            type: "server",
            message: errors.email,
          });
        } else if (errors.hashedPassword) {
          setError("password", {
            type: "server",
            message: errors.password,
          });
        } else {
          alert("Something went wrong");
        }
      })
      .finally(() => setLoading(false));
    reset();
  }
  return {
    register,
    loading,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit
  };
}

export default useRegisterForm;
