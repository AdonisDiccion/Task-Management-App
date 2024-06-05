import bg from "../assets/background/bg.png";
import PropTypes from "prop-types";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Modal from "../components/Modal";
import { useState } from "react";

export default function PageLayout({ children }) {
  const [auth, setAuth] = useAuth();

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
          <div className="absolute top-5 right-5 text-white cursor-pointer">
            <p onClick={() => setOpenModal(!openModal)}>LOGOUT</p>  
          </div>
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
