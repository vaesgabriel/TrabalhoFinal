import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => navigate("/about")}>Sobre</button> {}
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default Home;
