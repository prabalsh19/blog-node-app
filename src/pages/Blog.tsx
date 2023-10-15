import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.scss";
import { CommentCard } from "../components/CommentCard";
import { Blog as BlogType, User } from "../types";
export const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const res = await axios.get(BASE_URL + "blog/" + id);
        setBlog(res.data.blog);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleAddComment = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const localUserJSON = localStorage.getItem("user");
      let localUser: User | null = null;
      if (localUserJSON) {
        localUser = JSON.parse(localUserJSON) as User;
      }
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

  return (
    <div className="blog">
      {blog && (
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
