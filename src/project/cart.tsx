import React from 'react';
import './cart.css';
import Header from './header';
import Footer from './footer';
import Urlbar from './urlbar';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps } from 'react-router-dom';

interface TodoContainerProps {
    cart:any;
    totalamount:any;
    removecart:(item: any) => object;
    updatecart:(item: any) => object;
    setamount:(item:any)=> object;
    
    
  }

  interface mystate {
    cart:any;
   totalamount:number;
   gst:number;
   promocode:string;
   applycode:boolean;
    
  }


class Cart extends React.Component<RouteComponentProps<{}> & TodoContainerProps,mystate>
{
    total: any;
    constructor(props: RouteComponentProps<{}> & TodoContainerProps)
    {
          super(props);

          this.state={
              cart:[],
              totalamount:0,
              gst:0,
              promocode:'',
              applycode:false

          }



          
    }

   

    

  

    
    private handleChange = (e: React.FormEvent<HTMLInputElement>,pid:any) => {
       
        let obj={
            id:pid,
            quantity:parseInt(e.currentTarget.value)
        }
        alert(obj);

        let cart:any=[];
        cart=localStorage.getItem('cart');
        cart=JSON.parse(cart);
        cart=cart.map((k:any) =>
              k.product_id === obj.id ? { ...k, quantity: obj.quantity } : k
          )

          localStorage.setItem('cart',JSON.stringify(cart));

        this.props.updatecart(obj);

      
        }

    applypromo(e: React.FormEvent<HTMLInputElement>)
    {
        this.setState({promocode:e.currentTarget.value})
        
       

    }
    matchcode()
    {
        if(this.state.promocode=="BHHT")
        {
            alert("you are getting your 10%off");
            this.setState({applycode:true})
        }

        else{
            alert("wrong code");
        }

        this.setState({promocode:''})
    }

    checkout()
    {
        if(this.props.cart.length==0)
        {
            alert("there is no product in the cart to shop please add to cart before checkout")
        }
        else{
            this.props.history.push("/checkout");

        }

    }

       
                               

   removemycart(id:any)
   {
    let cart:any=[];
    

    cart=localStorage.getItem('cart');
    cart=JSON.parse(cart);
    cart=cart.filter((_:any, i:any) => i !== id);
    localStorage.setItem('cart',JSON.stringify(cart));
    this.props.removecart(id);
   }

    render()
    {  let subtotal:any=0;
      let gstamount:any=0;
      let totalamount:any=0;
      this.props.cart.map((e:any,i:any)=>{ subtotal=subtotal + parseFloat(e.quantity) * parseFloat(e.product_price)})
      gstamount=subtotal * 6 / 100;
      totalamount=subtotal + parseInt(gstamount);
      if(this.state.applycode){ 
          totalamount = totalamount + (totalamount * 10 / 100)
      }; 
      
      this.props.setamount({amount:totalamount});
      console.log(totalamount);
      console.log(this.props.totalamount);
     
         return(<React.Fragment>

       <div className="container-fluid" style={{marginTop:'50px', overflowY: 'scroll'}}>
    <div className="row" >
        <div className="col-md-10 col-md-offset-1">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Total</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                {
               

                
               this.props.cart.length === 0 && (
                   <div className="text-center">
                       <h2>no product in the cart</h2>
                   </div>
               )}

                   
              
              
                {
                   
                  this.props.cart.map((e:any,i:any)=>
                  (
                    <tr>
                    <td className="col-md-6">
                    <div className="media">
                        <span className="thumbnail pull-left"> <img className="media-object" src={'image/' + e.product_image}  style={{ width:'52px'}}></img> </span>
                        <div className="media-body" style={{ margin:'15'}}>
                  <h4 className="media-heading"><a href="#">{e.product_name}</a></h4>
                            <h5 className="media-heading"> by <a href="#">{e.product_brand}</a></h5>
                            <span>Status: </span><span className="text-warning"><strong>Leaves warehouse in 2 - 3 weeks</strong></span>
                        </div>
                    </div></td>
                    <td  style={{textAlign: 'center'}}>
                    <div className="col-md-4 col-sm-12">
                          
                                <select className="form-control quantity" name="quantity" onChange={(event:any)=>this.handleChange(event,e.product_id)}>
                  <option value={e.quantity} >{e.quantity}</option>
                                    <option value="1" >1</option>
                                    <option value="2" >2</option>
                                    <option value="3" >3</option>
                                    <option value="4" >4</option>
                                    <option value="5" >5</option>
                                   
                                </select>
                            </div>
                    </td>
                    <td className="col-md-1 text-center"><span><i className="fa fa-inr" style={{fontSize:'18px',color:'black'}}></i> {e.product_price}</span></td>
                  <td className="col-md-1 text-center"><strong><i className="fa fa-inr" style={{fontSize:'18px',color:'black'}}></i>  { 
                  parseFloat(e.quantity) * parseFloat(e.product_price)
                
                  
                  }</strong></td>
                    <td className="col-md-1">
                    <button type="button" className="btn btn-danger" onClick={()=>this.removemycart(i)}>
                        <span className="glyphicon glyphicon-remove"></span> Remove
                    </button></td>
                  <td></td>
                </tr>
                

                  )
                  )}
                    
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td><h5>Subtotal</h5></td>
                <td className="text-right"><h5><strong><i className="fa fa-inr" style={{fontSize:'18px',color:'black'}}></i> {subtotal}</strong></h5></td>
                    </tr>
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td><h5>GST(6%)</h5></td>
                <td className="text-right"><h5><strong><i className="fa fa-inr" style={{fontSize:'18px',color:'black'}}></i> { parseInt(gstamount) }</strong></h5></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        
                        <td></td>
                        <td colSpan={2}> 
                        <div className="checkbox">
        <label data-toggle="collapse" data-target="#promo">
          <input type="checkbox"></input> I have a promo code
        </label>
      </div>
      <div className="collapse" id="promo">
        <div className="form-group">
          <label  className="control-label">Promo Code</label>
          <div className="form-inline">
            <input type="text" className="form-control" id="inputpromo"  value={this.state.promocode} name="promo" onChange={(event:any)=>this.applypromo(event)} placeholder="Enter promo code"></input>
            <button className="btn btn-sm" onClick={()=>this.matchcode()}>Apply</button>
          </div>
        </div>
      </div></td>
                    </tr>
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td><h3>Total</h3></td>
                  <td className="text-right"><h3><strong><i className="fa fa-inr" style={{fontSize:'18px',color:'black'}}></i> {totalamount}</strong></h3></td>
                    </tr>
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td>
                        <button type="button" className="btn btn-default">
                        <NavLink to="/filter"> <span className="glyphicon glyphicon-shopping-cart"></span> Continue Shopping</NavLink>
                        </button></td>
                        <td>
                        <button type="button" className="btn btn-success" onClick={()=>this.checkout()}>
                       Checkout <span className="glyphicon glyphicon-play"></span>
                        </button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</React.Fragment>

         )
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
    removecart: (item: any) => dispatch({ type:'Remove', payload: item }),
    updatecart: (item: any) => dispatch({ type:'Update', payload: item }),
    setamount: (item: any) => dispatch({ type:'totalamount', payload: item })
    
  });


export default connect(receive,dispatch) (Cart);