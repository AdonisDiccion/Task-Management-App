/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  // Add hook
  const navigate = useNavigate();

  // Add state
  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate("/login");

    return () => clearInterval(interval);
  }, [count]);

  return (
    <span className="text-white font-bold text-5xl flex items-end gap-16">
      Launching in {count} <span className="loader"></span>
    </span>
  );
}
