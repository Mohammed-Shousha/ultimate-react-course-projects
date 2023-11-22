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
  const pizzas = pizzaData;
  // const pizzas = [];
  const numPizzas = pizzas.length;
  return (
    <main className='menu'>
      <h2>Our Menu</h2>

      {/* {numPizzas && ( // if equal to 0, it will render 0 */}
      {/* {numPizzas > 0 && ( // if equal to 0, it will not render 0 (false "React does not render false") */}
      {numPizzas > 0 ? (
        <ul className='pizzas'>
          {pizzaData.map((pizza) => (
            <Pizza pizza={pizza} key={pizza.name} />
          ))}
        </ul>
      ) : (
        <p> We're still working on our menu. Please come back later :)</p>
      )}
    </main>
  );
}

function Pizza(props) {
  console.log(props);
  const {
    pizza: { name, ingredients, photoName, price },
  } = props;
  return (
    <li className='pizza'>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{price}</span>
      </div>
    </li>
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
      {/* {new Date().toLocaleTimeString()}. We're currently open */}
      {/* {isOpen && ( // if true, it will render the second part of the && operator */}
      {isOpen ? (
        <div className='order'>
          <p>We're open until {closeHour}:00. Come visit us or order online.</p>
          <button className='btn'>Order</button>
        </div>
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
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
