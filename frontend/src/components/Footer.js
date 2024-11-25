import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Gabriel Vaes e Daniel Segalotto. Todos
        os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;
