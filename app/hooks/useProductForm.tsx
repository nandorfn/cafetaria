import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { TProductSchema, productSchema } from "../utils/types";

const useProductForm = () => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    setError,
    watch,
    control,
  } = useForm<TProductSchema>({
    resolver: zodResolver(productSchema)
  });

  const onSubmit = async (data: TProductSchema) => {
    setLoading(true);
    axios.post(`/api/products`, data)
      .then((res) => {
          if (res.status === 201) {
            
          } else {
            throw new Error(res.data.error)
          }
      }
      )
      .catch(err => {
        const error = err.response.data.errors;
        if (error.name) {
          setError("name", {
            type: "server",
            message: error.name
          });
        } else if (error.phone) {
          setError("category", {
            type: "server",
            message: error.category,
          });
        } else if (error.email) {
          setError("imgLink", {
            type: "server",
            message: error.imgLink,
          });
        } else if (error.stock) {
          setError("stock", {
            type: "server",
            message: error.stock,
          });
        } else if (error.description) {
          setError("description", {
            type: "server",
            message: error.description,
          });
        } else if (error.price) {
          setError("price", {
            type: "server",
            message: error.price,
          });
        } else (
          alert(errors)
        )
      })
      .finally(() => {
        setLoading(false);
        setModal(false);
      })
    reset();
  };
  
  return {
    register,
    handleSubmit,
    errors,
    isSubmitted,
    onSubmit,
    watch,
    control,
    loading,
    modal,
    setModal
  }
}

export default useProductForm;