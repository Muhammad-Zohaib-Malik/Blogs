import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-hot-toast'

const AddBlog = () => {

  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: null
  })



  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate()


  const handlePostBlog = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/blogs", blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      })
      console.log(res)
      URL.createObjectURL(blogData.image)
      toast.success(res.data.message)
      navigate("/homepage")

    } catch (error) {
      toast.error(error.response.data.message)

    }

  }
  return token == null ? (
    <Navigate to="/signin" />
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 space-y-6 shadow-lg card bg-base-100">
        <h2 className="text-2xl font-bold text-center card-title">Add New Blog</h2>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Title"
            className="w-full input input-bordered"
            onChange={(e) => setBlogData((blogData) => ({ ...blogData, title: e.target.value }))}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            placeholder="Description"
            className="w-full textarea textarea-bordered"
            onChange={(e) => setBlogData((blogData) => ({ ...blogData, description: e.target.value }))}
          />
        </div>

        <div className="form-control">

          <label htmlFor="image" className='bg-slate-500 '>
            {
              blogData.image ? <img src={URL.createObjectURL(blogData.image)} alt="" className='object-cover aspect-video' /> : <div className='flex items-center justify-center aspect-video'>
                <h1>Select Image</h1>
              </div>
            }

          </label>

          <input
            id="image"
            type="file"
            accept='.png,.jpeg,.jpg'
            className="hidden w-full file-input file-input-bordered"
            onChange={(e) => setBlogData((blogData) => ({ ...blogData, image: e.target.files[0] }))}
          />
        </div>

        <div className="mt-4 form-control">
          <button className="w-full btn btn-primary" onClick={handlePostBlog}>Add Blog</button>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
