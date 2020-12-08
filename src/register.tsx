import React from 'react';
import axios from 'axios';
import Header from './project/header';
import Footer from './project/footer';
import { RouteComponentProps, RouteProps } from 'react-router-dom';
import {
   
    NavLink
    
  } from "react-router-dom";



export interface IFormState {
        [key: string]: any
        submitSuccess: boolean;
        loading: boolean;
        valid:Boolean
    }
class Register extends React.Component<RouteComponentProps,IFormState>
{  constructor(props:RouteComponentProps)
    {
         super(props);
         this.state={
             firstname:'',
             lastname:'',
             email:'',
             password:'',
             phone:'',
             loading: false,
             submitSuccess: false,
             valid:false,
             emailvalid:true,
             namevalid:false,
             passowrdvalid:false,
             cpasswordvalid:true,
             mobilevalid:true,
             successmsg:'',
            
             errormessage:''
             
         }
    }
         
    validateEmail (email:string) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
      }

      matchpassword (pass:string) {
        return this.state.password==pass;
      }

      validatemobile(mobile:string)
      {
        const re =/^([9]{1})([234789]{1})([0-9]{8})$/;
        return re.test(mobile)

      }
      
    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    


        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }

        const formdata={
            "firstname":this.state.firstname,
            "lastname":this.state.lastname,
            "email":this.state.email,
            "phone":this.state.phone,
            "password":this.state.password
            
                    }

                        console.log(formdata);

        axios.post('http://localhost:3000/users/register',formdata).then((pos)=>
        {
          if(pos.data.status==200)
          {
               alert("registration successfull");
            const msg='registration successfull'
            this.setState({successmsg:msg});
            this.props.history.push("/login");
          }
          else{
            alert("registration failed");
            this.setState({successmsg:pos.data.message});
            this.props.history.push("/register");
          }
           
            
          

        },(err)=>
        {    alert("registration failed");
            console.log(err);
            this.setState({ successmsg:'registration unsuccessfull server error' }) 
            this.props.history.push("/register");
        })

        this.setState({
            firstname:'',
            lastname:'',
            phone:'',
            email:'',
            password:''


        })
    }

    private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        if(e.currentTarget.name=='password' && e.currentTarget.value.length<6)
        {   
            this.setState({ passwordvalid:true,errormessage:'password should be minimum length 6'});
        }
        else
        {
            this.setState({ passwordvalid:false});
        }

        if(e.currentTarget.name=='firstname' && e.currentTarget.value.length < 6)
        {
              console.log(e.currentTarget.value.length);
            this.setState({ namevalid:true,errormessage:'name should be minimum length 6'});
        }
        else
        {
            this.setState({ namevalid:false});
        }

        if(e.currentTarget.name=='email')
        {
            const emailValid = this.validateEmail(e.currentTarget.value) ;
            this.setState({ emailvalid:emailValid})
        }

        if(e.currentTarget.name=='phone')
        {
            const mobileValid = this.validatemobile(e.currentTarget.value) ;
            this.setState({ mobilevalid:mobileValid})
        }


        if(e.currentTarget.name=='cpassword')
        {
            const matched = this.matchpassword(e.currentTarget.value) ;
            console.log(matched);
            this.setState({ cpasswordvalid:matched})
        }

        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
                    })
      
 }

    render()
    {    let fieldContainerClass = 'form-group field-container'
    const { email, valid } = this.state;
    
    if (!valid) {
      fieldContainerClass += 'form-group  error'
    }
         return(<React.Fragment>
            
            <div className="container">
                    <div className="row centered-form">
                    <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
         <h3 className="panel-title">Register Form  </h3>
         <h5>{ this.state.successmsg }</h5>
                                     </div>
                                     <div className="panel-body">
                                    <form role="form" onSubmit={this.processFormSubmission}>
                                        <div className="row">
                                            <div className="col-xs-3 col-sm-3 col-md-3">
                                                <div className="form-group">
                                                    <h5>FirstName:</h5>
                                                 </div>
                                            </div>
                                            <div className="col-xs-9 col-sm- 9col-md-9">
                                                <div className="form-group">
                                                    <input type="text" name="firstname" id="firstname"  onChange={(e)=>this.handleChange(e)} className="form-control input-sm" placeholder="FirstName" autoComplete="off" required ></input>
                                                    { this.state.namevalid ? 'name should be minimum length 6':''  }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-xs-3 col-sm-3 col-md-3">
                                                <div className="form-group">
                                                    <h5>LastName:</h5>
                                                 </div>
                                            </div>
                                            <div className="col-xs-9 col-sm- 9col-md-9">
                                                <div className="form-group">
                                                    <input type="text" name="lastname" id="lastname"  onChange={(e)=>this.handleChange(e)} className="form-control input-sm" placeholder="LastName" autoComplete="off" required></input>
                                                    { this.state.namevalid ? 'name should be minimum length 6':''  }
                                                </div>
                                            </div>
                                        </div>
            
                                        <div className="row">
                                            <div className="col-xs-3 col-sm-3 col-md-3">
                                                <div className="form-group">
                                                    <h5>Email:</h5>
                                                 </div>
                                            </div>
                                            <div className="col-xs-9 col-sm- 9col-md-9">
                                                <div className={fieldContainerClass}>
                                                    <input type="email" name="email" id="email" onChange={(e)=>this.handleChange(e)} className="form-control input-sm" placeholder="email" autoComplete="off" required></input>
                                                    { this.state.emailvalid ? '' :'email is invalid'}
                                                    
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-xs-3 col-sm-3 col-md-3">
                                                <div className="form-group">
                                                    <h5>Mobile:</h5>
                                                 </div>
                                            </div>
                                            <div className="col-xs-9 col-sm- 9col-md-9">
                                                <div className="form-group">
                                                    <input type="tel" name="phone" id="phone" onChange={(e)=>this.handleChange(e)} className="form-control input-sm" placeholder="mobile no.." autoComplete="off" required></input>
                                                    { this.state.mobilevalid ? '': 'invalid mobile no'}
                                                </div>
                                            </div>
                                        </div>
            
                                        <div className="row">
                                            <div className="col-xs-3 col-sm-3 col-md-3">
                                                <div className="form-group">
                                                    <h5>Password:</h5>
                                                 </div>
                                            </div>
                                            <div className="col-xs-9 col-sm- 9col-md-9">
                                                <div className="form-group">
                                                    <input type="password" name="password" id="password" onChange={(e)=>this.handleChange(e)} className="form-control input-sm" placeholder="password" autoComplete="off" required></input>
                                                    { this.state.passwordvalid ? 'password should be minimum length 6': ''}
                                                </div>
                                            </div>
                                        </div>

                                      

                                        <div className="row">
                                            <div className="col-xs-3 col-sm-3 col-md-3">
                                                <div className="form-group">
                                                    <h5>confirm password:</h5>
                                                 </div>
                                            </div>
                                            <div className="col-xs-9 col-sm- 9 col-md-9">
                                                <div className="form-group">
                                                    <input type="text" name="cpassword" id="cpassword" className="form-control input-sm"  onChange={(e)=>this.handleChange(e)} placeholder="confirm password" autoComplete="off" required></input>
                                                    { this.state.cpasswordvalid ? '': 'password not matched'}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <input type="submit" value="Register"  className="btn btn-info btn-block"></input>
                                    
                                    </form>
                                    <span><h5><NavLink to="/login">Login</NavLink> if already registered</h5></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></React.Fragment>)
    }
}

export default Register;