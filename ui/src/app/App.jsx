import React from 'react';
// import styles from './App.module.css';

import { BrowserRouter, Route } from 'react-router-dom'

import { Lists } from 'lists'

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={<div />} />
      <Route path='/lists/:id' component={Lists} />
    </BrowserRouter>
  );
}

export { App };
