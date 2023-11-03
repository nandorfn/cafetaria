'use client'
import { Flex } from "@/app/components/Container/Flex";
import ErrorMsg from "@/app/components/ErrorMsg";
import { Select } from '@/app/components/Form/Select';
import { Textarea } from '@/app/components/Form/Textarea';
import useProductForm from "@/app/hooks/useProductForm";
import { categoryFood } from '@/app/utils/objectData';
import { Controller } from 'react-hook-form';

const FormProdcut: React.FC = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    control,
    loading,
    modal,
    setModal
  } = useProductForm();
  
  return (
    <>
      <Flex className="gap-3 mt-3">
        <input
          className="input input-bordered bg-white"
          type="search"
          name="search"
          placeholder="Search by product name.."
        />
        <button
          onClick={() => setModal(true)}
          className="btn bg-zinc-100 text-black"
          type="button">
          {'Add Product'}
        </button>
      </Flex>

      {modal &&
        <div className="inset-0 bg-opacity-50 bg-black bgModal">
          <div className="modalWrapper">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form__add-product bg-white">

              <label className="font-medium">
                {'Name'}
                <input
                  {...register("name")}
                  type="text"
                  placeholder='Product Name'
                  className="input input-bordered w-full font-normal mt-3 mb-2"
                />
                {errors.name && <ErrorMsg error={errors.name.message} />}
              </label>

              <label className="flex flex-col font-medium ">
                Category
                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      {...field}
                      data={categoryFood}
                      variant={'border'}
                      className="mt-3"
                    />
                  )}
                />
                {errors.category && <ErrorMsg error={errors.category.message} />}
              </label>

              <label className="font-medium">
                {'Product Image Link'}
                <input
                  {...register("imgLink")}
                  type="text"
                  placeholder='Image Link'
                  className="input input-bordered w-full font-normal mt-3 mb-2"
                />
                {errors.imgLink && <ErrorMsg error={errors.imgLink.message} />}
              </label>

              <label className="font-medium flex flex-col">
                {'Description'}
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      variant={'border'}
                      size={'standard'}
                      className="mt-3"
                    />
                  )}
                />
                {errors.description && <ErrorMsg error={errors.description.message} />}
              </label>

              <Flex className=' gap-5'>
                <label className="font-medium">
                  {'Stock'}
                  <input
                    {...register("stock")}
                    type="text"
                    className="input input-bordered w-full font-normal mt-3 mb-2"
                  />
                  {errors.stock && <ErrorMsg error={errors.stock.message} />}
                </label>
                <label className="font-medium">
                  {'Price'}
                  <input
                    {...register("price")}
                    type="text"
                    className="input input-bordered w-full font-normal mt-3 mb-2"
                  />
                  {errors.price && <ErrorMsg error={errors.price.message} />}
                </label>
              </Flex>

              <Flex className='gap-5'>
                <button
                  onClick={() => setModal(false)}
                  className='btn w-[48.5%]'
                  type='button'>
                  CANCEL
                </button>
                <button
                  className="btn w-[48.5%]  btn-warning disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? <span className="loading loading-spinner"></span>
                    : 'ORDER'

                  }
                </button>
              </Flex>
            </form>
          </div>
        </div>
      }
    </>
  );
};

export default FormProdcut;