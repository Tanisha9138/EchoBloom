import React, { useContext, useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import SideBar from "../layout/SideBar";
import MyBlogs from "../miniComponents/MyBlogs";
import MyProfile from "../miniComponents/MyProfile";
import CreateBlog from "../miniComponents/CreateBlog";
import Chart from "../miniComponents/Chart";
import { Context } from "../../main";

const Dashboard = () => {
  const [component, setComponent] = useState("MyBlogs");
  const { mode, isAuthenticated } = useContext(Context);
  const location = useLocation();

  // Handle template navigation from TemplatesPage
  useEffect(() => {
    // Check if navigated from templates page with createBlog intent
    if (location.state?.createBlog || location.state?.template) {
      setComponent("Create Blog");
    }
  }, [location.state]);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <section
      className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}
    >
      <SideBar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog 
          selectedTemplate={location.state?.templateData} 
          templateId={location.state?.template}
        />
      ) : component === "Analytics" ? (
        <Chart />
      ) : (
        <MyBlogs />
      )}
    </section>
  );
};

export default Dashboard;