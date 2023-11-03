'use client'
import { ProductCart } from "@/app/utils/types";
import FormProdcut from "./FormProdcut";
import { useState } from "react";
import axios from "axios";

type Props = {
  products: ProductCart[]
}

const Table = ({ products }: Props) => {
  const [filteredProduct, setFilteredProduct] = useState(products);
  const [search, setSearch] = useState('');
  
  const onFilter = (query: string) => {
    let filter = products?.filter((item: ProductCart) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    })
    setFilteredProduct(filter);
  }
  const handleInput = (e: React.SyntheticEvent) => {
    const { value } = (e.target as HTMLInputElement);
    setSearch(value)
    onFilter(value);
  }
  const handleDelte = (id: string) => {
    axios.delete(`/api/products/${id}`, )
  }

  return (
    <>
      <FormProdcut
        setFilteredProduct={setFilteredProduct}
        search={search}
        handleInput={handleInput}
      />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProduct?.map((item: ProductCart, index: number) => (
              <tr key={item.id}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.totalSold}</td>
                <td>{`Rp${item.price.toLocaleString('ID-id')}`}</td>
                <td className="flex gap-3">
                  <button className="btn btn-sm btn-warning hover:opacity-70 " type="button">Edit</button>
                  <button 
                    onClick={() => handleDelte(item.productId)}
                    className="btn btn-sm btn-error hover:opacity-70" type="button">
                    Delete
                  </button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;