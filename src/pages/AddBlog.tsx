import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = formData;
  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("token");
    const body = image === "" ? { title, content } : { title, content, image };
    const res = await axios.post(
      BASE_URL + "blog",
      { ...body },
      {
        headers: {
          authentication: token,
        },
      }
    );
    if (res.status === 200) {
      navigate("/myblogs");
    }
  };

  return (
    <div className="addBlog">
      <h1>Add New Blog</h1>

      <form onSubmit={handleSubmit}>
        <div className="addBlog__input">
          <label>Title</label>
          <input
            required
            type="text"
            name="title"
            value={title}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </div>
        <div className="addBlog__input">
          <label>Content</label>
          <textarea
            required
            name="content"
            value={content}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          ></textarea>
        </div>
        <div className="addBlog__input">
          <label>Image Url (Optional) </label>
          <input
            type="url"
            name="image"
            value={image}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
