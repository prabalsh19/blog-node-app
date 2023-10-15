export const Card = ({ data }) => {
  const userProfile =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEJQojzcGqO6y17GCiXa5T-Zv0V3FXkzUQNdfzWAn1-lTSzBCQV_1mWgxgsRi0k2lQICs&usqp=CAU";
  //   const data = {
  //     _id: "65294995cc852b02ca971db1",
  //     title: "JavaScript",
  //     content:
  //       "JavaScript (/ˈdʒɑːvəskrɪpt/), often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2023, 98.7% of websites use JavaScript on the client side for webpage behavior,[10] often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the code on users' devices.\n\nJavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard.[11] It has dynamic typing, prototype-based object-orientation, and first-class functions. It is multi-paradigm, supporting event-driven, functional, and imperative programming styles. It has application programming interfaces (APIs) for working with text, dates, regular expressions, standard data structures, and the Document Object Model (DOM).\n\nThe ECMAScript standard does not include any input/output (I/O), such as networking, storage, or graphics facilities. In practice, the web browser or other runtime system provides JavaScript APIs for I/O.\n\nJavaScript engines were originally used only in web browsers, but are now core components of some servers and a variety of applications. The most popular runtime system for this usage is Node.js.\n\nAlthough Java and JavaScript are similar in name, syntax, and respective standard libraries, the two languages are distinct and differ greatly in design.",
  //     image: "sads",
  //     user: {
  //       _id: "6529365c1c88a9b2bb178922",
  //       firstName: "Prabal",
  //       lastName: "Sharma",
  //       email: "prabal6@gmail.com",
  //       role: "User",
  //       createdAt: "2023-10-13T12:21:48.309Z",
  //       updatedAt: "2023-10-13T12:21:48.309Z",
  //       __v: 0,
  //     },
  //     createdAt: "2023-10-13T12:21:48.309Z",
  //     updatedAt: "2023-10-13T12:21:48.309Z",
  //     isApproved: "true",
  //     __v: 0,
  //   };

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
