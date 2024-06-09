import bg from "../assets/background/bg.png";
import PropTypes from "prop-types";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Modal from "../components/Modal";
import { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

export default function PageLayout({ children }) {
  const [auth, setAuth] = useAuth();

  const [showLogout, setShowLogout] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  //logout
  function logOut() {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Successfully logged out", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    setOpenModal(false);
    navigate("/login");
  }

  return (
    <>
      <div
        className="flex relative items-center justify-center h-screen font-JetBrains"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        {auth?.user ? (
          <>
            <div onClick={() => setShowLogout(!showLogout)} className="absolute top-5 right-5 text-white cursor-pointer">
              <div className="bg-white py-1 px-2 text-black flex items-center rounded-sm relative" >
                <h1>{auth?.user?.username}</h1>
                <IoMdArrowDropright className={`${showLogout && 'rotate-90' } transition-all ease-in-out duration-150`}/> 
              </div>
              
              {showLogout && 
              (
                <div className="mt-2 divide-y-2 absolute right-0 w-[200px]">
                  <div onClick={() => alert('Coming soon...')} className="bg-white text-black py-1"> 
                    <span className="flex items-center gap-2 hover:bg-gray-300 px-3 py-2"><FaUserEdit /> Edit Profile</span>
                  </div>
                  <div onClick={() => setOpenModal(!openModal)} className="bg-white text-black py-1"> 
                    <span className="flex items-center gap-2 hover:bg-gray-300 px-3 py-2"><IoLogOut /> Logout</span>
                  </div>
                </div>
              )
            }  
            </div>
          </>
          
          
        ) : null}
        {children}
      </div>
       {openModal ? <Modal proceed={'YES'} abort={'NO'} notice={'Are you sure you want to logout?'} abortFunction={() => setOpenModal(false)} proceedFunction={logOut}/> : null}
    </>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
