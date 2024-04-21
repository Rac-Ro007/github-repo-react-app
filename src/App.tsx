import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router';
import Repoc from './Repoc';

function App() {
  return (
    <HashRouter>
         <Routes>
            {/* If you find path with 'hello' render element helloWorld */}
            <Route path="/*" element={<Repoc />} />
            {/* <Route path="/hello" element="Hello" />
            <Route path="/Account/*" element="Users" /> */}
         </Routes>
      </HashRouter>
  );
}

export default App;
