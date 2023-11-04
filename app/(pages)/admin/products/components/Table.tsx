'use client'
import { ProductCart } from "@/app/utils/types";
import FormProdcut from "./FormProduct";
import { useState } from "react";
import axios from "axios";

type Props = {
  products: ProductCart[]
}

const Table = ({ products }: Props) => {
  const [filteredProduct, setFilteredProduct] = useState(products);
  const [editedData, setEditedData] = useState<any>();
  const [editMode, setEditMode] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const onFilter = (query: string) => {
    let filter = products.filter((item: ProductCart) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredProduct(filter);
  };

  const handleInput = (e: React.SyntheticEvent) => {
    const { name,  value } = e.target as HTMLInputElement;
    if (name === 'search') {
      setSearch(value);
      onFilter(value);
    } else {
      setEditedData({
        ...editedData,
        [name]: value
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/products/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleUpdateState = (id: string, newData: ProductCart) => {
    const updatedProducts = [...filteredProduct];
    const index = updatedProducts.findIndex((product) => product.productId === id);
    if (index !== -1) {
      updatedProducts[index] = newData;
    } else {
      console.log("Object not found");
      return;
    }  
    setFilteredProduct(updatedProducts);
  }

  const handleSaveEdit = async (editedProductData: ProductCart) => {
    try {
      await axios.put(`/api/products/${editedProductData.productId}`, editedProductData)
      .then((res) => {
        if (res.status === 200) {
          handleUpdateState(editedData.productId, editedProductData)
          setEditMode(null);
        } else {
          throw new Error('Something went wrong')
        }
      })
    } catch (error) {
      console.log(error)
    }
  };

  const handleEditClick = (id: string) => {
    setEditMode(id);
    let filter = products.find((item) => {
      return item.productId === id;
    })
    setEditedData(filter);
  };
  


  return (
    <>
      <FormProdcut
        setFilteredProduct={setFilteredProduct}
        search={search}
        handleInput={handleInput}
      />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Image</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProduct?.map((item: ProductCart, index: number) => (
              <tr key={item.id}>
                <th>{index + 1}</th>
                <td>
                  {editMode === item.productId ? (
                    <input
                      type="text"
                      name="name"
                      className="input input-sm input-bordered w-32"
                      value={editedData.name}
                      onChange={(e) => handleInput(e)}
                    />
                  ) : (
                    item.name
                  )}
                </td>

                <td>
                  {editMode === item.productId ? (
                    <input
                      type="text"
                      name="imgLink"
                      className="input input-sm input-bordered w-24"
                      value={editedData.imgLink}
                      onChange={(e) => handleInput(e)}
                    />
                  ) : (
                    item.imgLink.substring(0, 14)
                  )}
                </td>
                
                <td>{item.category}</td>
                <td>{item.totalSold}</td>
                
                <td>
                  {editMode === item.productId ? (
                    <input
                      type="text"
                      name="description"
                      className="input input-sm input-bordered w-24"
                      value={editedData.description}
                      onChange={(e) => handleInput(e)}
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td>
                  {editMode === item.productId ? (
                    <input
                      type="text"
                      name="price"
                      className="input input-sm input-bordered w-24"
                      value={editedData.price}
                      onChange={(e) => handleInput(e)}
                    />
                  ) : (
                    `Rp${item.price.toLocaleString("ID-id")}`
                  )}
                </td>
                
                <td>
                  {editMode === item.productId ? (
                    <input
                      type="text"
                      name="stock"
                      className="input input-sm input-bordered w-20"
                      value={editedData.stock}
                      onChange={(e) => handleInput(e)}
                    />
                  ) : (
                    item.stock
                  )}
                </td>
                <td className="flex gap-3">
                  {editMode === item.productId ? (
                    <>
                      <button
                        onClick={() => handleSaveEdit(editedData)}
                        className="btn btn-sm btn-success hover:opacity-70"
                        type="button"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditMode(null)}
                        className="btn btn-sm btn-error hover:opacity-70"
                        type="button"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(item.productId)}
                        className="btn btn-sm btn-warning hover:opacity-70"
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.productId)}
                        className="btn btn-sm btn-error hover:opacity-70"
                        type="button"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};


export default Table;