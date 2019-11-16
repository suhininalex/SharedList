import React from 'react';
// import styles from './App.module.css';

import { BrowserRouter, Route } from 'react-router-dom'

import { ProductList, AddList } from 'lists'

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={AddList} />
      <Route path='/lists/:id' component={ProductList} />
    </BrowserRouter>
  );
}

export { App };
