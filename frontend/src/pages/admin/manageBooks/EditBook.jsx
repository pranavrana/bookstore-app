import React, { useEffect, useState } from "react";
import {
  useFetchBookByIdQuery,
  useUpdateBookMutation,
} from "../../../redux/features/books/booksApi";
import InputField from "../../../components/InputField";
import SelectField from "../../../components/SelectField";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";

const EditBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageName, setCoverImageName] = useState("");
  const [updateBook] = useUpdateBookMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (bookData) {
      setValue("title", bookData.title);
      setValue("description", bookData.description);
      setValue("category", bookData.category);
      setValue("newPrice", bookData.newPrice);
      setValue("oldPrice", bookData.oldPrice);
    }
  }, [bookData, setValue]);
  const onSubmit = async (data) => {
    const updatedBookData = {
      ...data,
      coverImage: coverImage ?? bookData.coverImage,
    };
    try {
      await updateBook({ id, ...updatedBookData }).unwrap();
      Swal.fire({
        title: "Book updated",
        text: "Your book is updated successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!",
      });
      await refetch();
      navigate('/dashboard/manage-books');
    } catch (error) {
      console.log(error);
      alert("Failed to update book");
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverImageName(file.name);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error Loading book data....</div>;

  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Reusable Input Field for Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: "", label: "Choose A Category" },
            { value: "business", label: "Business" },
            { value: "technology", label: "Technology" },
            { value: "fiction", label: "Fiction" },
            { value: "horror", label: "Horror" },
            { value: "adventure", label: "Adventure" },
            // Add more options as needed
          ]}
          register={register}
        />

        {/* Trending Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        {/* Old Price */}
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        {/* New Price */}
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image
          </label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
          {coverImageName && (
            <p className="text-sm text-gray-500">Selected: {coverImageName}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? (
            <span className="">Updating.. </span>
          ) : (
            <span>Update Book</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
