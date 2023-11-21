import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css'; // external stylesheet (global)

const pizzaData = [
  {
    name: 'Focaccia',
    ingredients: 'Bread with italian olive oil and rosemary',
    price: 6,
    photoName: 'pizzas/focaccia.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Margherita',
    ingredients: 'Tomato and mozarella',
    price: 10,
    photoName: 'pizzas/margherita.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Spinaci',
    ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
    price: 12,
    photoName: 'pizzas/spinaci.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Funghi',
    ingredients: 'Tomato, mozarella, mushrooms, and onion',
    price: 12,
    photoName: 'pizzas/funghi.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Salamino',
    ingredients: 'Tomato, mozarella, and pepperoni',
    price: 15,
    photoName: 'pizzas/salamino.jpg',
    soldOut: true,
  },
  {
    name: 'Pizza Prosciutto',
    ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
    price: 18,
    photoName: 'pizzas/prosciutto.jpg',
    soldOut: false,
  },
];

function App() {
  return (
    <div className='container'>
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // inline style
  // const style = {
  //   color: 'tomato',
  //   fontSize: '48px',
  //   textTransform: 'uppercase',
  // };

  return (
    <header className='header'>
      <h1 /*style={style}*/>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  return (
    <main className='menu'>
      <h2>Our Menu</h2>
      <Pizza
        name='Pizza Margherita'
        ingredients='Tomato and mozarella'
        photo='pizzas/margherita.jpg'
        price={10}
      />
      <Pizza
        name='Pizza Funghi'
        ingredients='Tomato, mozarella, mushrooms, and onion'
        photo='pizzas/funghi.jpg'
        price={12}
      />
    </main>
  );
}

function Pizza(props) {
  console.log(props);
  const { name, ingredients, photo, price } = props;
  return (
    <div className='pizza'>
      <img src={photo} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{price}</span>
      </div>
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log({ isOpen });

  //   if (isOpen) alert('We are open!');
  //   else alert('We are closed!');

  return (
    <footer className='footer'>
      {new Date().toLocaleTimeString()}. We're currently open
    </footer>
  );
}

// React v18
const root = ReactDOM.createRoot(document.getElementById('root'));
// StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// React before v18
// import ReactDOM from 'react-dom'; "without client"
// ReactDOM.render(<App />, document.getElementById('root'));
