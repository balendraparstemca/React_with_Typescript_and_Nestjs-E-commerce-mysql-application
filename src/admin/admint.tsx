import React from 'react'
import './admintt.css';
import Order from './order';
import { Switch, Route, NavLink } from 'react-router-dom';
import User from './user';
import product from '../project/product';
import Projectadmin from './product';

class Admin extends React.Component
{
    render()
    {
         return(<React.Fragment>

<nav className="navbar navbar-default navbar-static-top header">
    <div className="container-fluid">
	
		<div className="navbar-header">
			<button type="button" className="navbar-toggle navbar-toggle-sidebar collapsed">
			MENU
			</button>
			<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
				<span className="sr-only">Toggle navigation</span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
			</button>
			<a className="navbar-brand" href="#">
				Administrator
			</a>
		</div>

	
		<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">      
			<form className="navbar-form navbar-left" method="GET" role="search">
				<div className="form-group">
					<input type="text" name="q" className="form-control" placeholder="Search"></input>
				</div>
				<button type="submit" className="btn btn-default"><i className="glyphicon glyphicon-search"></i></button>
			</form>
			<ul className="nav navbar-nav navbar-right">
			
				<li className="dropdown ">
					<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
						Account
						<span className="caret"></span></a>
						<ul className="dropdown-menu" role="menu">
							<li className="dropdown-header">SETTINGS</li>
							<li className=""><a href="#">Other Link</a></li>
							<li className=""><a href="#">Other Link</a></li>
							<li className=""><a href="#">Other Link</a></li>
							<li className="divider"></li>
							<li><a href="#">Logout</a></li>
						</ul>
					</li>
                    <li><a href="http://www.pingpong-labs.com" target="_blank">Visit Site</a></li>
				</ul>
			</div>
		</div>
	</nav>  
    
    	<div className="container-fluid main-container">
  		<div className="col-md-2 sidebar">
  			<div className="row">
	
	<div className="absolute-wrapper"> </div>

	<div className="side-menu">
		<nav className="navbar navbar-default" role="navigation">
      

            
    
			<div className="side-menu-container">
				<ul className="nav navbar-nav mysidebar">
                <NavLink to="/order"><li className="active"><a href="#"><span className="glyphicon glyphicon-dashboard"></span> Dashboard</a></li></NavLink>
                <NavLink to="/user"><li><a href="#"><span className="glyphicon glyphicon-plane"></span> Active Link</a></li></NavLink>
				<NavLink to="/product">	<li><a href="#"><span className="glyphicon glyphicon-cloud"></span> Link</a></li></NavLink>

				
					<li className="panel panel-default" id="dropdown">
						<a data-toggle="collapse" href="#dropdown-lvl1">
							<span className="glyphicon glyphicon-user"></span> Sub Level <span className="caret"></span>
						</a>

					
						<div id="dropdown-lvl1" className="panel-collapse collapse">
							<div className="panel-body">
								<ul className="nav navbar-nav">
									<li><a href="#">Link</a></li>
									<li><a href="#">Link</a></li>
									<li><a href="#">Link</a></li>

								
									<li className="panel panel-default" id="dropdown">
										<a data-toggle="collapse" href="#dropdown-lvl2">
											<span className="glyphicon glyphicon-off"></span> Sub Level <span className="caret"></span>
										</a>
										<div id="dropdown-lvl2" className="panel-collapse collapse">
											<div className="panel-body">
												<ul className="nav navbar-nav">
													<li><a href="#">Link</a></li>
													<li><a href="#">Link</a></li>
													<li><a href="#">Link</a></li>
												</ul>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</li>

					<li><a href="#"><span className="glyphicon glyphicon-signal"></span> Link</a></li>

				</ul>
			</div>
            
		</nav>

	</div>
</div>  		</div>
  		<div className="col-md-10 content">
  			  <div className="panel panel-default">
	<div className="panel-heading">
		Dashboard
	</div>
	<div className="panel-body">
        
   
	</div>
</div>
  		</div>
  		<footer className="pull-left footer">
  			<p className="col-md-12">
  				<hr className="divider"></hr>
  				Copyright &COPY; 2015 <a href="http://www.pingpong-labs.com">Gravitano</a>
  			</p>
  		</footer>
  	</div>
         </React.Fragment>)
    }
}

export default Admin;