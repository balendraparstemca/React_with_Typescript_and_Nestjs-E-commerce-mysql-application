import React from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import Header from './project/header';
import Footer from './project/footer';
import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';

export interface IFormState {
    [key: string]: any
    submitSuccess: boolean;
    loading: boolean;
}
interface TodoContainerProps {
    cart:any;
    isauthenticated:boolean
    login:(item: any) => object;

    
  }
class Login extends React.Component<RouteComponentProps<{}> & TodoContainerProps, IFormState>
{
    constructor(props:RouteComponentProps<{}> & TodoContainerProps)
    {
           super(props);
           this.setState({
               email:'',
               passowrd:'',
               submitSuccess:false,
                smessage:'',
               loading:false
           })
    }

    componentDidMount()
    {
        if(localStorage.newLogin)
        {
            this.props.history.push("/");
        }
    }

   

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }

        const formdata={
            "email":this.state.email,
            "password":this.state.password
           
                    }

                        console.log(formdata);

        axios.post('http://localhost:3000/users/login',formdata).then((pos)=>
        {   if(pos.data.status==200)
            {
              console.log(pos.data);
              alert("login succeefull token is:"+ pos.data.token);
              pos.data.uname=this.state.email;
              localStorage.setItem('newLogin',JSON.stringify(pos.data));
              localStorage.setItem('cart',JSON.stringify([]));
               this.props.login({})
              this.props.history.push("/");
           

            
            }
            else{
                
                alert("login failed ");
            }
            
        },(err)=>
        {
            console.log(err);
            alert("login failed server error ");
        })

        
    }


    private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
                    })
      
 }
    render()
    {
         return(<React.Fragment>
            
       
            <div className="container">
                    <div className="row centered-form">
                    <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                    <h3 className="panel-title">Login Form</h3>
         
                                     </div>
                                     <div className="panel-body">
                                    <form role="form"  onSubmit={this.processFormSubmission}>
                                        <div className="row">
                                            <div className="col-xs-3 col-sm-3 col-md-3">
                                                <div className="form-group">
                                                    <h5>Name:</h5>
                                                 </div>
                                            </div>
                                            <div className="col-xs-9 col-sm- 9col-md-9">
                                                <div className="form-group">
                                                    <input type="email" name="email" id="email"  onChange={(e)=>this.handleChange(e)} className="form-control input-sm" placeholder="email" autoComplete="off" required></input>
                                                </div>
                                            </div>
                                        </div>
            
                                        <div className="row">
                                            <div className="col-xs-3 col-sm-3 col-md-3">
                                                <div className="form-group">
                                                    <h5>passoword:</h5>
                                                 </div>
                                            </div>
                                            <div className="col-xs-9 col-sm- 9col-md-9">
                                                <div className="form-group">
                                                    <input type="password" name="password" id="password"  onChange={(e)=>this.handleChange(e)} className="form-control input-sm" placeholder="password" autoComplete="off"  required></input>
                                                </div>
                                            </div>
                                        </div>
            
                                     
                                      
                                        
                                        <input type="submit" value="Login" className="btn btn-info btn-block" ></input>
                                    
                                    </form>
                                    <span><h5> <NavLink to="/register">Register</NavLink> before login </h5></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  </React.Fragment>)
    }
}

const receive = (state:any)=>{
    //console.log(state);
    return {
        isauthenticated:state.isauthenticated
  
            }
  }
  
  
  const dispatch = (dispatch:any) => ({
    login: (item: any) => dispatch({ type:'login', payload: item })
    
  });
  
  export default connect(receive,dispatch) (Login);