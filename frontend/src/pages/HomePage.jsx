import { useEffect, useState } from "react";
import axios from 'axios'

const HomePage = () => {

  const [blog,setBlog]=useState([])

  const fetchBlogs=async()=>{
    let res=await axios.get("http://localhost:3000/api/v1/blogs")
    console.log(res.data.blogs)
    setBlog(res.data.blogs)
  }

  useEffect(()=>{
    fetchBlogs()
  },[])

  return (
    <div className="grid grid-cols-3 gap-5 px-10 py-3 mt-10">
      {/* Card 1 */}

      {
        blog.map((blog)=>(
          <div className="shadow-xl card bg-base-100 w-96" key={blog._id}>
        {/* Image Section */}
        <figure>
          <img
           src={blog.image}
            alt="Shoes"
            className="w-full h-auto"
          />
        </figure>

        {/* Card Body */}
        <div className="card-body">
          {/* Title with Badge */}
          <h2 className="card-title">
            {blog.title}
            <div className="badge badge-secondary">NEW</div>
          </h2>

          {/* Description */}
          <p>{blog.description}</p>

          {/* Date, Comments, and Likes */}
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <p>{blog.createdAt}</p>
            <p>500 Comments</p>
            <p>200 Likes</p>
          </div>

          {/* Action Badges */}
          <div className="justify-end mt-2 card-actions">
            <div className="badge badge-outline">{blog.creater.username}</div>
            <div className="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
        ))
      }
      
      </div>

  );
}

export default HomePage;
