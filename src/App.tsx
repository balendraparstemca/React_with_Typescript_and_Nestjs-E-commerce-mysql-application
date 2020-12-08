import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './project/header';
import Footer from './project/footer';
import Mainslider from './project/mainslider';
import Menubar from './project/menubar';
import Body from './project/body';
import Product from './project/product';


function App() {
  return ( <div className="App">
    
      <Menubar> </Menubar>
      <Mainslider></Mainslider>
      <Body></Body>
     <Product></Product>
    </div>
  );
}

export default App;
