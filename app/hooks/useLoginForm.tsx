import { useForm } from "react-hook-form";
import { TLoginSchema, loginSchema } from "../utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

const useLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  const router = useRouter()
  const onSubmit = async (data: TLoginSchema) => {
    setLoading(true);
    axios.post('/api/login', data)
      .then(response => {
        if (response.data.status === 200) {
          router.refresh()
        }
      })
      .catch(error => {
        if (error.response) {
          const errors = error.response.data.errors;
          if (errors.email) {
            setError("email", {
              type: "server",
              message: errors.email,
            });
          } else if (errors.password) {
            setError("password", {
              type: "server",
              message: errors.password,
            });
          } else {
            alert("Something went wrong");
          }
        }
      })
      .finally(() => {
        setLoading(false);
      })
    reset();
  };

  return {
    loading,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit
  }
}

export default useLoginForm;