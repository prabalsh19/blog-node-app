import { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "../components/Card";

export const MyBlogs = () => {
  const [blogs, setblogs] = useState([]);
  useEffect(() => {
    (async () => {
      const userId = localStorage.getItem("userId");
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const res = await axios.get(BASE_URL + "blog/user/" + userId);
      setblogs(res.data.blogs);
    })();
  }, []);
  const handleDelete = async (id) => {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const res = await axios.delete(BASE_URL + "blog/" + id, {
        headers: {
          authentication: localStorage.getItem("token"),
        },
      });
      console.log(res);
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="myblogs">
      <div className="myblogs__blogs">
        {blogs.length > 0 && (
          <Link to={"/blog/add"} className="myblogs__addBtn">
            Add New
          </Link>
        )}
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <>
              <div className="myblogs__actions">
                <p style={{ textAlign: "center" }}>Status: {blog.isApproved}</p>
                <button>
                  <Link to={`/blog/edit/${blog._id}`}>Edit</Link>
                </button>
                <button onClick={() => handleDelete(blog._id)}>Delete</button>
              </div>
              <Link to={`/blog/${blog._id}`}>
                <Card key={blog._id} data={blog} />
              </Link>
            </>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>
            Add new blog{" "}
            <Link className="myblogs__addBtn" to={"/blog/add"}>
              Add
            </Link>{" "}
          </p>
        )}
      </div>
    </div>
  );
};
