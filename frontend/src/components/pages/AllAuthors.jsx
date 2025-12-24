import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const AllAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const { mode } = useContext(Context);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await axios.get(
          "https://echobloom-backend.onrender.com/api/v1/user/authors",
          { withCredentials: true }
        );
        setAuthors(data.authors);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAuthors();
  }, []);

  return (
    <article
      className={mode === "dark" ? "dark-bg all-authors" : "light-bg all-authors"}
    >
      <h2>ALL AUTHORS</h2>
      <div className="container">
        {authors && authors.length > 0 ? (
          authors.map((element) => {
            const avatarUrl =
              element.avatar && element.avatar.url ? element.avatar.url : "/user.jpg";
            return (
              <div className="card" key={element._id}>
                <img src={avatarUrl} alt="author_avatar" />
                <h3>{element.name}</h3>
                <p>{element.role}</p>
              </div>
            );
          })
        ) : (
          <BeatLoader color="gray" size={50} style={{ padding: "200px 0" }} />
        )}
      </div>
    </article>
  );
};

export default AllAuthors;
