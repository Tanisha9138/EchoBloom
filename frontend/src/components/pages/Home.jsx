import React, {useContext} from 'react';
import {Context} from "../../main";
import HeroSection from "../miniComponents/HeroSection";
import TrendingBlogs from "../miniComponents/TrendingBlogs";
import LatestBlog from "../miniComponents/LatestBlog";
import PopularAuthors from "../miniComponents/PopularAuthors";

const Home = () => {
  const {mode} = useContext(Context);
  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <HeroSection/>
      <TrendingBlogs/>
      <LatestBlog/>
      <PopularAuthors/>
    </article>
  );
};

export default Home;
