import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Добро пожаловать</h1>
      <nav>
        <Link to="/contacts" className="nav-link">Перейти к контактам</Link>
      </nav>
    </div>
  );
}

export default Home; 