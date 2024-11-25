import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <h1>Sobre os Desenvolvedores</h1>
      <div className="developers">
        <div className="developer-card">
          <h2> Gabriel de Lima Vaes </h2>
          <p>
            <strong>Email:</strong> 199650@upf.br
          </p>
          <p>
            <strong>Descrição:</strong> Estudante de Análise e Desenvolvimento
            de Sistemas.
          </p>
        </div>
        <div className="developer-card">
          <h2> Daniel Gado Segalotto </h2>
          <p>
            <strong>Email:</strong> 199663@upf.br
          </p>
          <p>
            <strong>Descrição:</strong> Estudante de Análise e Desenvolvimento
            de Sistemas.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
