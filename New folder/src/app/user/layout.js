'use client'
import { Inter } from "next/font/google";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";



const inter = Inter({ subsets: ["latin"] });

export default function CustomerRootLayout({ children }) {
  return (
   
    <div className=" bg-white">

      <ToastContainer />

      <Header />

      {children}


      <Footer/>

    </div>
 
  );
}
