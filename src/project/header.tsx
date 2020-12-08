import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { RouteComponentProps, withRouter, NavLink } from 'react-router-dom';
import Cart from './cart';


interface TodoContainerProps {
    cart:any;
    isauthenticated:boolean
    logout:(item: any) => object;
  
    
  }
class Header extends React.Component<RouteComponentProps<{}> & TodoContainerProps,{navbar:any,cartcount:any}>
{
    sidenav: any;
    constructor(props:RouteComponentProps<{}> & TodoContainerProps)
    {
        super(props);
        this.state={
            navbar:'sidenav closenav',
            cartcount:0

                }
    }
    componentDidMount()
    {
        this.cart();
      
        
    }

    cart()
    { let cart:any;
       /* cart=localStorage.getItem("cart");
        cart=JSON.parse(cart);
        if(localStorage.cart)
        {
        this.setState({
            cartcount:cart.length
        })
    }*/


    }
     

     logout()
     {
        let logindetails=JSON.parse(localStorage.newLogin);

         const obj={
             id:logindetails.userdetails.id
         }
       

        axios.post('http://localhost:3000/users/logout',obj).then((pos)=>
        {
            localStorage.clear();
            this.props.logout({});
            this.props.history.push("/login");
            
        })
        
     }
     opennav()
     {
           console.log('opennav');
        this.setState({navbar:'sidenav opennav'})

     }
     closenav()
     {     console.log('closenav');
         this.setState({navbar:'sidenav closenav'})
     }

    render()
    { 
       

        console.log(this.props.cart)
        let mylist:any;
        let name:any;
        if(localStorage.newLogin)
        {
           name=JSON.parse(localStorage.newLogin);

           mylist= <li className="upper-links dropdown"><a className="links" href="http://clashhacks.in/">  <i className="glyphicon glyphicon-user"></i> My Account</a>
            <ul className="dropdown-menu">
        <li className="profile-li"><b>Hii {name.uname}</b></li>
                <li className="profile-li"><NavLink to="/profile"><a className="profile-links"> <i className="glyphicon glyphicon-user" style={{fontSize:'2s8px',color:'red'}}></i> My Profile</a></NavLink></li>
                <li className="profile-li"><NavLink to="/profile"><a className="profile-links"> <i className="glyphicon glyphicon-shopping-cart" style={{fontSize:'2s8px',color:'red'}}></i> My order</a></NavLink></li>
                <li className="profile-li"><NavLink to="/profile"><a className="profile-links"><i className="glyphicon glyphicon-heart" style={{fontSize:'2s8px',color:'red'}}></i> Wishlist</a></NavLink></li>
                <li className="profile-li"><a className="profile-links" onClick={()=>this.logout()} >Logout</a></li>
     
            </ul>
        </li>
        }

        else{
           mylist= <li className="upper-links"><a className="links" > <NavLink to="/login">  <i className="glyphicon glyphicon-user"></i> Login</NavLink></a> </li>
          
                       
        }
         return(<React.Fragment>
             <div className=" wrapper container-fluid" id="header-up">
           
             </div>
                <div id="flipkart-navbar">
    <div className="container">
        <div className="row row1">
            <ul className="largenav pull-right">
              
              
               {mylist}
            </ul>
        </div>
        <div className="row row2">
            <div className="col-sm-3">
                <h2 style={{margin:0}}><span className="smallnav menu" onClick={()=> this.opennav()} >☰ <img className="logo" src="sitara-foods.png" ></img></span></h2>
                <h1 style={{margin:0}}><span className="largenav"><img className="logo" src="sitara-foods.png" ></img></span></h1>
            </div>
            <div className="flipkart-navbar-search smallsearch col-sm-7 col-xs-11">
                <div className="row">
                    <input className="flipkart-navbar-input col-xs-11" type="" placeholder="Search for Products, Brands and more" name=""></input>
                    <button className="flipkart-navbar-button col-xs-1">
                        <svg width="15px" height="15px">
                            <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="cart col-sm-2">
                <a className="cart-button">
                <NavLink to="/cart">
                    <svg className="cart-svg " width="16 " height="16 " viewBox="0 0 16 16 ">
                        <path d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86 " fill="#fff "></path>
                    </svg> Cart
                     <span className="item-number ">{this.props.cart.length}</span>
                        <span></span>
                        </NavLink>
                </a>
            </div>
        </div>
    </div>
</div>
<div id="mySidenav" className={this.state.navbar}>
    <div className="container" style={{backgroundColor: '#2874f0', paddingTop: 10}}>
        <span className="sidenav-heading">Home</span>
        <a href="javascript:void(0)" className="closebtn" onClick={()=>this.closenav()}>×</a>
    </div>
    <a href="http://clashhacks.in/">Link</a>
    <a href="http://clashhacks.in/">Link</a>
    <a href="http://clashhacks.in/">Link</a>
    <a href="http://clashhacks.in/">Link</a>
</div>

         </React.Fragment>)
    }
}


const receive = (state:any)=>{
    //console.log(state);
    return {
        
        isauthenticated:state.isauthenticated
  
            }
  }
  
  
  const dispatch = (dispatch:any) => ({
    logout: (item: any) => dispatch({ type:'logout', payload: item })
    
  });
  

    


export default withRouter(connect(receive,dispatch) (Header));