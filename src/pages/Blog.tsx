import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.scss";
import { AuthContext } from "../context/authContext";
import { CommentCard } from "../components/CommentCard";
export const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [comment, setComment] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const res = await axios.get(BASE_URL + "blog/" + id);
        setBlog(res.data.blog);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleAddComment = async (e) => {
    try {
      e.preventDefault();
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const localUser = JSON.parse(localStorage.getItem("user"));
      const author = localUser?.firstName || "Anonymous";
      const res = await axios.post(BASE_URL + "blog/comment/add/" + id, {
        text: comment,
        author,
      });

      setBlog(res.data.blog);
      setComment("");
    } catch (e) {
      console.error(e);
    }
  };
  console.log(blog);
  return (
    <div className="blog">
      {blog.title && (
        <div className="blog__content">
          {blog.image && (
            <img src={blog.image} alt="" className="blog__content__img" />
          )}
          <h2 className="blog__content__title">{blog.title}</h2>
          <p className="blog__content__text">{blog.content}</p>
          <br />
          <span>
            Author: <br />
            {blog.user.firstName} {blog.user.lastName}
          </span>
          <div className="blog__comments">
            <h4>Comment:</h4>
            <div className="blog__comments__form">
              <form onSubmit={handleAddComment}>
                <div className="blog__comments__form__input">
                  <input
                    type="text"
                    name="comment"
                    placeholder="Enter your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="blog__comments__form__submit">
                  <button>Submit</button>
                </div>
              </form>
            </div>
            {blog.comments.length > 0 ? (
              blog.comments.map((comment) => (
                <CommentCard key={comment._id} {...comment} />
              ))
            ) : (
              <p>No comments on this post yet!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
