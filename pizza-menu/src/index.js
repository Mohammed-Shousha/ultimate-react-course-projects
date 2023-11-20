import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return <h1>Hello React!</h1>;
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
// ReactDOM.render(<App />);
