import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";
import { Blog } from "../types";

export const Admin = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    (async () => {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const res = await axios.get(BASE_URL + "blog/unapproved");
      setBlogs(res.data.blogs);
    })();
  }, []);
  const unApprovedBlogs = blogs.filter(
    (blog: Blog) => blog.isApproved !== "Approved"
  );

  const handleApprove = async (id: string) => {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const res = await axios.post(
        BASE_URL + "blog/approve/" + id,
        {},
        {
          headers: {
            authentication: localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const res = await axios.post(
        BASE_URL + "blog/reject/" + id,
        {},
        {
          headers: {
            authentication: localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin">
      {unApprovedBlogs.length > 0 ? (
        unApprovedBlogs.map((blog: Blog) => (
          <>
            <div className="admin__actions">
              <p>Status: {blog.isApproved}</p>
              <button onClick={() => handleApprove(blog._id)}>Approve</button>
              <button onClick={() => handleReject(blog._id)}>Reject</button>
            </div>
            <Link to={`/blog/${blog._id}`}>
              <Card key={blog._id} data={blog} />
            </Link>
          </>
        ))
      ) : (
        <p>No Unapproved blogs</p>
      )}
    </div>
  );
};
