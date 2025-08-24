import React, { useContext } from 'react'
import { Context } from '../../main';
import { Link, useLocation } from 'react-router-dom';
import { AiFillInstagram, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { FaGitSquare } from "react-icons/fa";

const Footer = () => {
  const isDashboard = useLocation("http://localhost:5173/dashboard");
  const { mode, setMode } = useContext(Context);
  return (
    <>
      
      <footer className={
          isDashboard.pathname === "/dashboard"
            ? "hideFooter"
            : mode === "light"
            ? "header light-footer"
            : "header dark-footer"
        }
      >

        <div className="container">
          <div className="about">
            <h3>About</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti delectus dolorum praesentium a? Maiores ex facere pariatur dolor ab modi saepe laudantium. Ullam debitis adipisci doloribus facere dolorem voluptatibus? Animi!</p>
            <p>
              <span>Email:</span> echobloom@gmail.com
            </p>
            <p>
              <span>Phone:</span> 9123456780
            </p>
          </div> 
          <div className="quick_links">
            <h3>Quick Links</h3>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/blogs"}>Blogs</Link>
              <Link to={"/about"}>About</Link>
              <Link to={"/dashboard"}>Dashboard</Link>
            </ul>
          </div>
          <div className='categories'>
            <h3>Categories</h3>
            <ul>
              <li>LifeStyle</li>
              <li>Technology</li>
              <li>Sports</li>
              <li>Travel</li>
              <li>Business</li>
              <li>Economy</li>
            </ul>
          </div>
          <div className='news_letter'>
            <div>
              <h3>Weekly NewsLetter</h3>
              <p>Get blog articles and offer via email</p>
            </div>
            <div>
              <input type="text" placeholder='Your email'/>
              <button>Subscribe</button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="logo">Echo <span>Bloom</span></div>
          <div className="links">
            <Link to={'/'} target="_blank"><AiFillInstagram/></Link>
            <Link to={'/'} target="_blank"><FaGitSquare/></Link>
            <Link to={'/'} target="_blank"><AiFillYoutube/></Link>
            <Link to={'/'} target="_blank"><AiFillLinkedin/></Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer
