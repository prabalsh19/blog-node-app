import { Blog } from "../types";

export const Card = ({ data }: { data: Blog }) => {
  const userProfile =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEJQojzcGqO6y17GCiXa5T-Zv0V3FXkzUQNdfzWAn1-lTSzBCQV_1mWgxgsRi0k2lQICs&usqp=CAU";

  const date = new Date(data?.createdAt).toDateString();
  return (
    <div className="card">
      <div className="card__user">
        <img src={userProfile} alt="" />
        <div className="card__user__info">
          <span>
            {data.user.firstName} {data.user.lastName}
          </span>
          <span>{date}</span>
        </div>
      </div>
      <h4>{data.title}</h4>
      <p>{data.content}</p>
    </div>
  );
};
