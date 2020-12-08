import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


interface IState{
    order:any[];
    users:any[];
    aciveusers:any[];
    products:any[];


  

    
}
class Dashboard extends React.Component<{},IState>
{


    constructor(props:{})
    {
        super(props);
        this.state={
            order:[],
            users:[],
            products:[],
            aciveusers:[]
        }
    }

    componentDidMount()
    {

        axios.get(`http://localhost:3000/order`).then(data=>{
            console.log(data.data);
            this.setState({
                order:data.data
            })
         
       
      
            })

            axios.get(`http://localhost:3000/users`).then(data=>{
                console.log(data.data);
                this.setState({
                    users:data.data
                })
             
           
          
                })


                axios.get(`http://localhost:3000/product`).then(data=>{
                    console.log(data.data);
                    this.setState({
                        products:data.data
                    })
                 
               
              
                    })

    }

    render()
    {
        return(<React.Fragment>
            	
	<article className="wrapper">
	    
	  
	    
	    <section className="main">
	        
	        <section className="tab-content">
	            
	           <section className="tab-pane active fade in content" id="dashboard">
	               
	                <div className="row">
                    <NavLink to="/order">
                 <div className="col-xs-6 col-sm-3">
                        
                     <div className="panel status panel-danger">
                    <div className="panel-heading">
                    <h1 className="panel-title text-center">{this.state.order.length}</h1>
                    </div>
                    <div className="panel-body text-center">                        
                        <strong>Orders</strong>
                    </div>
                </div>
	                    </div></NavLink>
                        <NavLink to="/product">
	                    <div className="col-xs-6 col-sm-3">
                <div className="panel status panel-warning">
                <div className="panel-heading">
                    <h1 className="panel-title text-center">{this.state.products.length}</h1>
                </div>
                <div className="panel-body text-center">                        
                    <strong>Products</strong>
                </div>
            </div>
	                    </div></NavLink>
	                    <NavLink to="/user">
	                    <div className="col-xs-6 col-sm-3">
                        <div className="panel status panel-success">
                <div className="panel-heading">
                    <h1 className="panel-title text-center">{this.state.users.length}</h1>
                </div>
                <div className="panel-body text-center">                        
                    <strong>Users</strong>
                </div>
            </div>
	                    </div>
                        </NavLink>
	                    
	                    <div className="col-xs-6 col-sm-3">
                        <div className="panel status panel-info">
                        <div className="panel-heading">
                            <h1 className="panel-title text-center">25</h1>
                        </div>
                        <div className="panel-body text-center">                        
                            <strong>ACTIVE USERS NOW</strong>
                        </div>
                    </div>
	                    </div>
	                   
	                   <div className="col-xs-12 col-sm-9">
	                       <div className="panel panel-default">
	                           <div className="panel-heading">
	                               <h5>Latest order</h5>
	                           </div>
	                           <div className="panel-body">
	                               This layout uses tabs to demonstrate what you could do with it. It probably makes more sense to use individual pages/templates in a production app.
	                               <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
	                           </div>
	                       </div>
	                   </div>
	                   
	                   <div className="col-xs-12 col-sm-3">
	                       <div className="panel panel-default">
	                           <div className="panel-heading">
                               <h5></h5>
	                           </div>
	                           <div className="panel-body">
	                               The sidebar is naturally responsive according to screen width. You can toggle it using the menu button in the topbar. Test it out by increasing/decreasing your screen width and watch it respond.
	                           </div>
	                       </div>
	                       
	                       <div className="panel panel-default">
	                           <div className="panel-heading">
                               <h5>Somethingbbjhbjhghghjgjk</h5>
	                           </div>
	                           <div className="panel-body">
	                               Designed by <a href="http://www.kaitanilabs.com" target="_blank"></a>
	                           </div>
	                       </div>
	                   </div>
	                   
	               </div>
	               
	           </section>
	           
	           <section className="tab-pane fade" id="configuration">
	               <nav className="subbar">
			            <ul className="nav nav-tabs">
				            <li className="active"><a href="#access" data-toggle="tab"><i className="fa fa-code"></i> <span>System</span></a></li>
				            <li><a href="#roles" data-toggle="tab"><i className="fa fa-user"></i> <span>Roles</span></a></li>
			            </ul>
		            </nav>
		            
		            <section className="tab-content content">
		                
		                <section className="tab-pane active fade in" id="access">
		                    
                            <div className="row">
                                <div className="col-xs-12">
	                                <div className="panel panel-default">
	                                    <div className="panel-heading">
	                                        Something
	                                    </div>
	                                    <div className="panel-body">
	                                        <br/><br/><br/><br/>
	                                    </div>
	                                </div>
	                            </div>
	                            
	                            <div className="col-xs-12 col-sm-4">
	                                <div className="panel panel-default">
	                                    <div className="panel-heading">
	                                        Something
	                                    </div>
	                                    <div className="panel-body">
	                                        <br/><br/><br/><br/>
	                                    </div>
	                                </div>
	                            </div>
	                            
	                            <div className="col-xs-12 col-sm-4">
	                                <div className="panel panel-default">
	                                    <div className="panel-heading">
	                                        Something
	                                    </div>
	                                    <div className="panel-body">
	                                        <br/><br/><br/><br/>
	                                    </div>
	                                </div>
	                            </div>
	                            
	                            <div className="col-xs-12 col-sm-4">
	                                <div className="panel panel-default">
	                                    <div className="panel-heading">
	                                        Something
	                                    </div>
	                                    <div className="panel-body">
	                                        <br/><br/><br/><br/>
	                                    </div>
	                                </div>
	                            </div>
                            </div>
		                    
		                </section>
		                
		                <section className="tab-pane fade" id="roles">
		                    
		                    <div className="row">
                                <div className="col-xs-12 col-sm-8 col-md-9">
	                                <div className="panel panel-default">
	                                    <div className="panel-heading">
	                                        Something
	                                    </div>
	                                    <div className="panel-body">
	                                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
	                                    </div>
	                                </div>
	                            </div>
	                            
	                            <div className="hidden-xs col-sm-4 col-md-3">
	                                <div className="panel panel-default">
	                                    <div className="panel-heading">
	                                        Something
	                                    </div>
	                                    <div className="panel-body">
	                                        <br/><br/><br/>
	                                    </div>
	                                </div>
	                                
	                                <div className="panel panel-default">
	                                    <div className="panel-heading">
	                                        Something
	                                    </div>
	                                    <div className="panel-body">
	                                        <br/><br/><br/>
	                                    </div>
	                                </div>
	                            </div>
	                       </div>
		                </section>
		                
		            </section>
		            
	           </section>
	           
	           <section className="tab-pane fade" id="users">
                   
	               
	           </section>
	           
	           <section className="tab-pane fade" id="mail">
	               
	           </section>
	           
	        </section>
	        
	        
	                
	        
	    </section>
	    
	</article>
        </React.Fragment>)
    }
}

export default Dashboard;