import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import "./styles.scss";
import { Link } from "react-router-dom";
export const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    (async () => {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const res = await axios.get(BASE_URL + "blog");
      setBlogs(res.data.blogs);
    })();
  }, []);

  return (
    <div className="home">
      <div className="home__blogs">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Link to={`/blog/${blog._id}`}>
              <Card key={blog._id} data={blog} />
            </Link>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>Loading...</p>
        )}
      </div>
    </div>
  );
};
