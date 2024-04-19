import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router';

function App() {
  return (
    <HashRouter>
         <Routes>
            {/* If you find path with 'hello' render element helloWorld */}
            <Route path="/" element={<Navigate to="/Labs/a3" />} />
            <Route path="/hello" element="Hello" />
            <Route path="/Account/*" element="Users" />
         </Routes>
      </HashRouter>
  );
}

export default App;
