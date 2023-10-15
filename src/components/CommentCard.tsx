export const CommentCard = ({ text, author, createdAt }) => {
  const userProfile =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEJQojzcGqO6y17GCiXa5T-Zv0V3FXkzUQNdfzWAn1-lTSzBCQV_1mWgxgsRi0k2lQICs&usqp=CAU";
  const date = new Date(createdAt).toDateString();

  return (
    <div className="commentCard">
      <div className="commentCard__user">
        <img className="commentCard__img" src={userProfile} alt="" />
        <div className="commentCard__user__info">
          <small>{author}</small>

          <small>{date}</small>
        </div>
      </div>
      <p>{text}</p>
    </div>
  );
};
