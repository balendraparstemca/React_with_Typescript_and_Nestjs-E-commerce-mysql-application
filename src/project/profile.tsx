import React from 'react';
import axios from 'axios';
import { RouteComponentProps, RouteProps } from 'react-router-dom';
import './profile.css';
import Userorder from './userorder';
export interface IFormState {
   [key: string]: any
   submitSuccess: boolean;
   loading: boolean;
   orderid:any;
   isorder:boolean;
   orderdetail:any
  
}
class Profile extends  React.Component<RouteComponentProps,IFormState>
{
   constructor(props:RouteComponentProps)
   {
      super(props);
      this.state={
         loading: false,
         submitSuccess: false,
         customer:{},
         editenable:Boolean,
         isToggleOn: true,
         category:[],
         order:[],
         orderdetail:[],
         orderid:0,
         isorder:false
               }
   }

   public componentDidMount(): void {
   let id=JSON.parse(localStorage.newLogin).userdetails.id;
      console.log(id);
      axios.get(`http://localhost:3000/users/${id}`).then(data => {
          console.log(data.data)
          this.setState({ customer: data.data });
    
      })


      axios.post(`http://localhost:3000/order/getuserorder`,{id:id}).then((data:any) => {
         console.log(data.data)
         this.setState({ order: data.data });
   
     })
 
  }

  viewdetail(id:any)
	{
      this.setState({orderid:id});
      this.setState({isorder:true})

      axios.get(`http://localhost:3000/orderdetail/${id}`).then(data => {
         console.log(data.data);

        this.setState({orderdetail:data.data});
         
     })


    }

  handleClick() {
   this.setState({
      isToggleOn:!this.state.isToggleOn
                  })

                  console.log(this.state.isToggleOn);
       
      }


    render()
    {
       
         
         return(<React.Fragment>
             <div className="container">
          <div className="row">
          
        <hr/>
        <div className="col-xs-3 col">
           
            <ul className="myul">
                <li className="active"><a href="#home" data-toggle="tab"><i className="glyphicon glyphicon-user" style={{fontSize:'2s8px',color:'red'}}></i> My Profile</a></li>
                <li><a href="#profile" data-toggle="tab"><i className="glyphicon glyphicon-shopping-cart" style={{fontSize:'2s8px',color:'red'}}></i> My order</a></li>
                <li><a href="#messages" data-toggle="tab"><i className="glyphicon glyphicon-heart" style={{fontSize:'2s8px',color:'red'}}></i> My wishList</a></li>
                <li><a href="#settings" data-toggle="tab"><i className="glyphicon glyphicon-home" style={{fontSize:'2s8px',color:'red'}}></i> My address</a></li>
            </ul>
        </div>
        <div className="col-xs-8 col">
         
            <div className="tab-content">
                <div className="tab-pane active" id="home">  
          <label className="switch">
  <input type="checkbox" onClick={()=>this.handleClick()}></input>
  <span className="slider round"></span>
</label>

                <div className="myhome">
                       
              
       <table className="table table-striped">
          <tbody>
             <tr>
                <td>
                   <form className="well form-horizontal">
                      <fieldset disabled={ this.state.isToggleOn ? true : false}>
                         <div className="form-group">
                            <label className="col-md-4 control-label">First Name</label>
                            <div className="col-md-8 inputGroupContainer">
                               <div className="input-group"><span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                               <input id="firstName" name="firstName" placeholder="FirstName" defaultValue={this.state.customer.firstname} className="form-control"  type="text"></input></div>
                            </div>
                         </div>

                         <div className="form-group">
                            <label className="col-md-4 control-label">Last Name</label>
                            <div className="col-md-8 inputGroupContainer">
                               <div className="input-group"><span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                               <input id="lastName" name="lastName" placeholder="lastname"  defaultValue={this.state.customer.lastname} className="form-control"  type="text"></input></div>
                            </div>
                         </div>
                        
                       
                        
                         <div className="form-group">
                            <label className="col-md-4 control-label">Email</label>
                            <div className="col-md-8 inputGroupContainer">
                               <div className="input-group"><span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                               <input id="email" name="email" placeholder="Email" defaultValue={this.state.customer.email} className="form-control"  type="text"></input></div>
                            </div>
                         </div>
                         <div className="form-group">
                            <label className="col-md-4 control-label">Phone Number</label>
                            <div className="col-md-8 inputGroupContainer">
                               <div className="input-group"><span className="input-group-addon"><i className="glyphicon glyphicon-earphone"></i></span>
                               <input id="phone" name="phone" placeholder="phone" defaultValue={this.state.customer.phone} className="form-control"  type="number"></input></div>
                            </div>
                         </div>
                         <input type="submit" value="Update"  style={{fontSize:'2s8px',color:'red'}}></input>
                      </fieldset>
                   </form>
                </td>
             </tr>
          </tbody>
       </table>
  



                </div>

                </div>
                <div className="tab-pane" id="profile">My order.

                <div className="myhome">
                <table className=" table table-responsive">
    <thead>
      <tr>
      <th>OrderId</th>
        <th>No of product</th>
        <th>totalamount</th>
        <th>status</th>
      </tr>
    </thead>
    <tbody>

       {this.state.order.map((e:any,i:any)=>(


<tr>
       <td>{e.orderid}</td>
       <td>{e.noofproduct}</td>
<td>{e.totalamount}</td>
<td>{e.final_status}</td>
<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button className="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" onClick={()=>this.viewdetail(e.orderid)} ><span className="glyphicon glyphicon-pencil"></span> view details</button></p></td>
  
</tr>




       )
       
       )}
     
     
    </tbody>
  </table>

  <div className="modal fade" id="edit" role="dialog" aria-labelledby="edit" aria-hidden="true">
      <div className="modal-dialog">
    <div className="modal-content">
          <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span> close</button>
        <h4 className="modal-title custom_align" id="Heading"> Your Order Detail</h4>
      </div>
          <div className="modal-body">
          
       
          <table className=" table table-responsive">
    <thead>
      <tr>
      <th>id</th>
        <th>product name</th>
        <th>quantity</th>
        <th>price</th>
        <th>total price</th>
        <th>status</th>
      </tr>
    </thead>
    <tbody>

       {this.state.orderdetail.map((e:any,i:any)=>(


<tr>
       <td>{i + 1}</td>
       <td>{e.productname}</td>
       <td>{e.quantity}</td>
<td>{e.price}</td>
<td>{e.price * e.quantity}</td>
       <td>{e.status}</td>
  
</tr>




       )
       
       )}
     
     
    </tbody>
  </table>
      </div>
          <div className="modal-footer ">
        <button type="button" className="btn btn-warning btn-lg" data-dismiss="modal"><span className="glyphicon glyphicon-ok-sign"></span> close</button>
      </div>
        </div>
  
  </div>
    
    </div>    
                </div>

                </div>

                <div className="tab-pane" id="messages">Messages Tab.
                <div className="myhome">

                </div>
                </div>
                <div className="tab-pane" id="settings">   <label className="switch">
  <input type="checkbox" onClick={()=>this.handleClick()}></input>
  <span className="slider round"></span>
</label>
                <div className="myhome">
                <table className="table table-striped">
          <tbody>
             <tr>
                <td>
                   <form className="well form-horizontal">
                      <fieldset disabled={ this.state.isToggleOn ? true : false}>
                         
                         <div className="form-group">
                            <label className="col-md-4 control-label">Address Line 1</label>
                            <div className="col-md-8 inputGroupContainer">
                               <div className="input-group"><span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                               <input id="addressLine1" name="addressLine1" placeholder="Address Line 1" defaultValue={this.state.customer.address} className="form-control" type="text"></input></div>
                            </div>
                         </div>
                         <div className="form-group">
                            <label className="col-md-4 control-label">State/Province/Region</label>
                            <div className="col-md-8 inputGroupContainer">
                               <div className="input-group"><span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                               <input id="state" name="state" placeholder="State/Province/Region" defaultValue={this.state.customer.address} className="form-control"  type="text"></input></div>
                            </div>
                         </div>

                         <div className="form-group">
                            <label className="col-md-4 control-label">Postal Code/ZIP</label>
                            <div className="col-md-8 inputGroupContainer">
                               <div className="input-group"><span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                               <input id="postcode" name="postcode" placeholder="Postal Code/ZIP" defaultValue={this.state.customer.zipcode} className="form-control"  type="text"></input></div>
                            </div>
                         </div>
                         <div className="form-group">
                            <label className="col-md-4 control-label">Country</label>
                            <div className="col-md-8 inputGroupContainer">
                               <div className="input-group">
                                  <span className="input-group-addon" ><i className="glyphicon glyphicon-list"></i></span>
                                  <select className="selectpicker form-control">
         <option>{this.state.customer.country}</option>
                                  </select>
                               </div>
                            </div>
                         </div>
                      </fieldset>
                   </form>
                </td>
             </tr>
          </tbody>
       </table>
                </div>
                </div>
            </div>
        </div>
        <div className="clearfix"></div>
          </div></div>
           </React.Fragment>)
    }

}


export default Profile;


