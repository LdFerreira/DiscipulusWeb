import React from 'react';
import logoImg from '../../assets/images/logo.png';
import ladingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
// import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import { Link } from 'react-router-dom';
import './styles.css';
function Landing() {
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Discipulus"/>
          <h2>Sua plataforma de estudos online</h2>
        </div>

        <img 
          src={ladingImg} 
          alt="Plataforma de estudos" 
          className="hero-image"
        />
        <div className="buttons-container">
          <Link to="/registration" className="study">
            <img src={studyIcon} alt="Estudar"/>
            Matriculas
          </Link>
          <Link to="/subject" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas"/>
            Materias
          </Link>

          <Link to="/student" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas"/>
            Alunos
          </Link>
          
          
        </div>
      
      </div>
    </div>
  );
}

export default Landing;