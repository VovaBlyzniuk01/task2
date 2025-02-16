import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Contacts.css';

function Contacts() {
  return (
    <div className="contacts-container">
      <nav className="navigation">
        <Link to="/" className="nav-link">Главная</Link>
      </nav>
      
      <div className="contacts-content">
        <h1>Контакты</h1>
        <div className="contacts-grid">
          <div className="contact-item">
            <h2>Телефон</h2>
            <p>+7 (XXX) XXX-XX-XX</p>
          </div>
          <div className="contact-item">
            <h2>Email</h2>
            <p>example@email.com</p>
          </div>
          <div className="contact-item">
            <h2>Адрес</h2>
            <p>ул. Примерная, д. 1</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts; 