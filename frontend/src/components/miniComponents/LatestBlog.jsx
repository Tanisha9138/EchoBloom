import React from 'react';
import {Link} from 'react-router-dom';

const LatestBlog = () => {
  return (
    <section
      className={
        newClass && newClass.length > 0 ? "dashboard-blogs blogs" : "blogs"
      }
    ></section>
  );
};

export default LatestBlog
