import React from 'react';
import logo from './logo.svg';



import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Footer from './project/footer';

import { connect } from 'react-redux';
import { render } from '@testing-library/react';

import Main from './main';
import Adminmain from './admin/adminmain';

interface TodoContainerProps {
  cart: [];
  addcart:(item: any) => object;
  isauthenticated:boolean
  
}
class Mainroute extends React.Component<TodoContainerProps,{isauthenticated:boolean}>
{
  constructor(props:TodoContainerProps)
  {
    super(props);
   
   
  }

  

 
  render(){

    console.log(this.props.cart);
    console.log(this.props.isauthenticated);
      return (
      <React.Fragment>
       
      <Router>
   
   
      <Switch>
            <Route exact path='/' component={Main} />
            <Route path="/admin" component={Adminmain}/>
            

            
    </Switch>
 
 
    </Router>
   
    </React.Fragment>
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

export default connect(receive,dispatch) (Mainroute);