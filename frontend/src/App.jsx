import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/components/pages/Home";
import About from "../src/components/pages/About";
import Blogs from "../src/components/pages/Blogs";
import SingleBlog from "../src/components/pages/SingleBlog";
import Navbar from "../src/components/layout/Navbar";
import Footer from "../src/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/pages/Dashboard";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import AllAuthors from "./components/pages/AllAuthors";
import { Context } from "./main";
import axios from "axios";
import UpdateBlog from "./components/pages/UpdateBlog";
import CreateBlog from "./components/miniComponents/CreateBlog";
import Chatbot from "./components/pages/Chatbot";
import TemplatesPage from './components/pages/TemplatesPage';
import EditorTemplatesPage from './components/pages/EditorTemplatesPage';
import GuidePage from './components/pages/GuidePage';
import ProductReviewEditor from './components/pages/ProductReviewEditor'
import PersonalStoryWriter from './components/pages/PersonalStoryWriter';
import IndustryAnalysis from './components/pages/IndustryAnalysisApp';
import ContentIdeasGenerator from './components/pages/ContentIdeasGenerator';
import HeadlineCreator from './components/pages/HeadlineCreator';
import ContentExpander from './components/pages/ContentExpander';

// import AnalyticsPage from './components/pages/AnalyticsPage';
const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout = location.pathname === '/product-review';
  
  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};
const App = () => {
  const { mode, setMode, setUser, isAuthenticated, setIsAuthenticated, user, setBlogs } =
    useContext(Context);
    
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/myprofile",
          {
            withCredentials: true,
          }
        );
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser({});
      }
    };
    
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/blog/all",
          { withCredentials: true }
        );
        setBlogs(data.allBlogs);
      } catch (error) {
        setBlogs([]);
      }
    };
    
    fetchUser();
    fetchBlogs();
  }, [isAuthenticated, user]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          {/* Authentication */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* Blog Routes */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/blog/update/:id" element={<UpdateBlog />} />
          
          {/* User Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Authors */}
          <Route path="/authors" element={<AllAuthors />} />
          
          {/* Template System */}
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/editor-features" element={<EditorTemplatesPage />} />
          <Route path="/product-review" element={<ProductReviewEditor />} />
          <Route path="/personal-story" element={<PersonalStoryWriter />} />
          <Route path="/industry-analysis" element={<IndustryAnalysis />} />
          {/* Additional Features */}
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/content-ideas" element={<ContentIdeasGenerator />} />
          <Route path="/headline-creator" element={<HeadlineCreator />} /> 
          <Route path="/content-expander" element={<ContentExpander />} />
          
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;