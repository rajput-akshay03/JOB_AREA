import './App.css';
import React, {useEffect,useContext} from "react";
import { Context } from './main';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Applications/Application";
import MyApplications from "./components/Applications/MyApplication";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";
function App() {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  console.log(`isAuthorized is ${isAuthorized}`);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_frontend_url}/api/v1/user/getuser`,
          {
            withCredentials: true,
          }
          );
          console.log(`resp is ${response}`);
        if(response.data.success)
           { 
             setUser(response.data.user);
             setIsAuthorized(true);
           }
      } catch (error) {
        console.log(error);
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);
  return (
    <>
         <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} /> 
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
         <Footer />
        <Toaster /> 
      </BrowserRouter>
    </>
  )
}

export default App;
