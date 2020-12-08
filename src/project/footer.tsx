import React from 'react';
import { NavLink } from 'react-router-dom';

class  Footer extends React.Component
{
    render()
    {
         return(<React.Fragment>
           
            <footer className="text-light">
                <div className="container">
                    <div className="row">

                       <div className="col-sm-12">  <NavLink to="/admin">balendra@copyright.com</NavLink></div>
                    </div>
                </div>
            </footer>  </React.Fragment>)
    }
}


export default Footer;