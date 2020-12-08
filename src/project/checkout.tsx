import React from 'react';
import axios from 'axios';



import Cart from './cart';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
interface mystate {
  userdetail:any;
  address:any;
  paymenttype:any;
  totalamount:any;

  
}
interface TodoContainerProps {
  cart:any;
  totalamount:any;

  emptycart:(item:any)=> object;
  
  
}
class Checkout extends React.Component<RouteComponentProps<{}> & TodoContainerProps,mystate>
{
    constructor(props:RouteComponentProps<{}> & TodoContainerProps)
    {
        super(props)

        this.state={
          userdetail:0,
          address:'',
          paymenttype:'',
          totalamount:0
        }

    }

    componentDidMount()
    {
      

    
    if(localStorage.newLogin)
    {
      let logindetails=JSON.parse(localStorage.newLogin);
      let totalamount=localStorage.totalamount;
      console.log(totalamount);

      this.setState({
        userdetail:logindetails.userdetails,
        totalamount:totalamount
       
        
      })
      
    }
    else{

      alert("login first to checkout")

      this.props.history.push("/login");
     
    }
    



  

   

    }

    checkout=()=>
    {
      if(this.state.address=='' || this.state.paymenttype=='')
      {
        alert("please mention proper address  and  choose payment  ");
        console.log(this.props.cart)
      }
      else if(this.props.cart.length===0)
      {
        alert("empty cart  please add product to checkout");
        this.props.history.push("/filter");
      }
     
      else{
      let cart:any=[];
      let orderproduct:any=[];
        cart=localStorage.getItem('cart');
        cart=JSON.parse(cart);
        let orderid=Math.floor(1000 + Math.random() * 9000);

        cart.map((e:any,i:any)=>{
           let myobj={
             orderid:orderid,
             productid:e.product_id,
             productname:e.product_name,
             quantity:e.quantity,
             price:e.product_price,

           }
           orderproduct.push(myobj);



        })


        let orderobj={
          orderid:orderid,
          userid:this.state.userdetail.id,
          noofproduct:cart.length,
          totalamount:this.state.totalamount,
          odate:Date(),
          payment_type:this.state.paymenttype,
          payment_status:"PENDING",
          final_status:"ACCEPTED",
          update_date:Date()
        

        }
                          console.log(orderproduct);
                          console.log(orderobj);


                          axios.post(`http://localhost:3000/order/insertorder`,orderobj).then(data => {
                            console.log(data.data)
                               
                            axios.post(`http://localhost:3000/orderdetail/insertorderdetail`,orderproduct).then(data => {
                              console.log(data.data)
                                 
                            this.props.emptycart({});
                            localStorage.setItem('cart',JSON.stringify([]));

                            alert("your order is completed");
                            this.props.history.push("/filter");
                          
                                             
                          })
                                           
                        })

                      }
    }

    private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      if(e.currentTarget.name=="address")
      {
      this.setState({address:e.currentTarget.value})
    
      }
      else if(e.currentTarget.name=="payment")
      {
        this.setState({paymenttype:e.currentTarget.value})
       

      }

    }

    render()
    {
        return(<React.Fragment>
            
               <div className="container-fluid checkoutbody">
  <div className="page-header">
    <h1>Checkout <small></small></h1>
  </div>
  <div className="row">
    <div className="col-xs-12">
      <div className="well">
        &hellip;
      </div>
     
      <h3>Ship my order to&hellip;</h3>
      <div className="list-group">
        <div className="list-group-item">
          <div className="list-group-item-heading">          
              <div className="row radio">
                <div className="col-xs-3">
                  <label>
                    <input type="radio" name="address" onChange={ (e)=>{this.handleChange(e)}} id="optionShipp1" value={this.state.userdetail.zipcode + this.state.userdetail.address + this.state.userdetail.country } ></input>
                   {this.state.userdetail.zipcode}, { this.state.userdetail.address}, {this.state.userdetail.country}
                  </label>
                </div>
                <div className="col-xs-5">
                  <dl className="dl-small">
        <dt>{this.state.userdetail.country}</dt>
                    <dd>{this.state.userdetail.zipcode}, {this.state.userdetail.address}</dd>
                  </dl>
                  <button className="btn btn-sm">Edit</button>
                  <button className="btn btn-sm btn-link">Delete this address</button>
                </div>
              </div>
          </div>
        </div>
        <div className="list-group-item">
        <form role="form">
          <div className="checkbox">
            <label data-toggle="collapse" data-target="#gift">
              <input type="checkbox"></input> I'd like to include a new  address  please enter all the details country zipcode region all
            </label>
          </div>
          <div className="form-group collapse" id="gift">
            <label  className="control-label">shipping address</label>
            <textarea name="address" onChange={ (e:any)=>{this.handleChange(e)}} className="form-control form-control-large" rows={3}></textarea>
            <p className="help-block">256 characters left</p>
          </div>
      </form>
        </div>
      </div>
     
      <h3>I'll pay with&hellip;</h3>
      <div className="list-group">
        <div className="list-group-item">
          <div className="list-group-item-heading">          
              <div className="row radio">
                <div className="col-xs-3">
                  <label>
                    <input type="radio" name="payment" onChange={ (e:any)=>{this.handleChange(e)}} id="optionsRadios2" value="online payment" checked></input>
                    Online Payment
                  </label>
                </div>
                
              </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="list-group-item-heading">          
              <div className="row radio">
                <div className="col-xs-3">
                  <label data-toggl-e="collapse" data-target="#newcard">
                    <input type="radio" name="payment"  onChange={ (e:any)=>{this.handleChange(e)}} id="optionsRadios2" value="upi payment"></input>
                    UPI
                  </label>
                </div>
                <div className="col-xs-9">                      
                  <div className="media">
                    
                    <div className="media-body" id="newcard">
                      We accept UPI payment
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        
        <div className="list-group-item">
          <div className="list-group-item-heading">          
              <div className="row radio">
                <div className="col-xs-3">
                  <label>
                    <input type="radio" name="payment"  onChange={ (e:any)=>{this.handleChange(e)}} id="optionsRadios2" value="paypal"></input>
                    PayPal
                  </label>
                </div>
                <div className="col-xs-9">                      
                  <div className="media">
                    <a className="media-left" href="#">
                      <img src="https://www.paypalobjects.com/webstatic/mktg/logo-center/PP_Acceptance_Marks_for_LogoCenter_76x48.png" height="25" alt="" />
                    </a>
                    <div className="media-body">
                      When you click "Place Order", you will be taken to the PayPal website.
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div className="list-group-item">
          <div className="list-group-item-heading">          
              <div className="row radio">
                <div className="col-xs-3">
                  <label>
                    <input type="radio" name="payment"   onChange={ (e:any)=>{this.handleChange(e)}} id="optionsRadios2" value="cod"></input>
                    Cash on delivery
                  </label>
                </div>
                
              </div>
          </div>
        </div>
      </div>
      <div className="well">
        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={()=>{this.checkout()}}>Place Order</button>
      </div>
    </div>
  </div>
</div>



        </React.Fragment>)
    }
}

const receive = (state:any)=>{
  //console.log(state);
  return {
      cart:state.cart,
      totalamount:state.totalamount

          }
}


const dispatch = (dispatch:any) => ({
 
  emptycart: (item: any) => dispatch({ type:'emptycart', payload: item })
  
});


export default connect(receive,dispatch) (Checkout);