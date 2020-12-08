import React from 'react';
import logo from './logo.svg';
import './App.css';
import App from './App';
import Cart from './project/cart';
import Checkout from './project/checkout';
import Filter from './project/filter';
import Register from './register';
import Login from './login';
import Header from './project/header';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Footer from './project/footer';
import Profile  from './project/profile';
import { connect } from 'react-redux';
import { render } from '@testing-library/react';


interface TodoContainerProps {
  cart: [];
  addcart:(item: any) => object;
  isauthenticated:boolean
  
}
class Main extends React.Component<TodoContainerProps,{isauthenticated:boolean}>
{
  constructor(props:TodoContainerProps)
  {
    super(props);
   
   
  }

  

 
  render(){
    
    console.log(this.props.cart);
    console.log(this.props.isauthenticated);
      return (<Router>
   
    <Header cart={this.props.cart}> </Header>
      <Switch>

            <Route exact path='/' component={Filter} />
            <Route path="/cart" component={Cart} />
            <Route path="/filter" component={Filter} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/checkout" component={Checkout}/>
            

            
    </Switch>
    <Footer></Footer>
 
    </Router>
     );
    }
}
const receive = (state:any)=>{
  //console.log(state);
  return {
      cart:state.cart,
      isauthenticated:state.isauthenticated

          }
}


const dispatch = (dispatch:any) => ({
  addcart: (item: any) => dispatch({ type:'Add', payload: item })
  
});

export default connect(receive,dispatch) (Main);