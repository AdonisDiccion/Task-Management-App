/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

export default function PrivateRoute() {
  // Add Context
  const [auth, setAuth] = useAuth();

  // Add State
  const [ok, setOk] = useState(false);

  // Add UseEffect
  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(`/auth-check`);

      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loading />;
}
