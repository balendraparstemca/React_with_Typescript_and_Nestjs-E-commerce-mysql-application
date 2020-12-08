import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux';

interface Props {
    id:any;
    cart:any;
    addcart:(item: any) => object;
    updatecart:(item: any) => object;
    
  }

  export interface IFormState {
    
    submitSuccess: boolean;
    loading: boolean;
    product:any;
}



  

class Pdetail extends React.Component<Props,IFormState> 
{
    constructor(props:Props)
    {
        super(props);

        this.state={
            submitSuccess:false,
            loading:false,
            product:{}
        }
    }

    savecart(product:any)
    {
        let cart:any=[];
        let available:any;
        product.quantity=1;
        cart=localStorage.getItem('cart');
        console.log(cart);
        cart=JSON.parse(cart);
       
      

        let obj = this.props.cart.find((o:any) => o.product_id === product.product_id);

        if(obj)
        {          
                   alert("this product already in your cart");

        }
        else{ 
          this.props.addcart(product)
          cart.push(product);
          localStorage.setItem('cart',JSON.stringify(cart));

        }


       
            
       

      
    }
            
    public fetchcartdetails(): void {
        let id=this.props.id;
           
           axios.get(`http://localhost:3000/product/${id}`).then(data => {
               console.log(data.data);

               this.setState({product:data.data})
               
           })
          
       }

    render()
    {
        this.fetchcartdetails();
           
        return(<React.Fragment>
             <div className="modal fade product_view" id="product_view">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <a href="#" data-dismiss="modal" className="className pull-right"><span className="glyphicon glyphicon-remove"></span></a>
                <h3 className="modal-title">Product   {this.props.id}</h3>
               
            </div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-md-6 product_img">
                        <img src={'image/' + this.state.product.product_image} width="320" className="img-responsive"></img>
                    </div>
                    <div className="col-md-6 product_content">
                        <h4>Product Id: <span>{this.props.id}</span></h4>
                        <h3 className="modal-title">Product   {this.state.product.product_name}</h3>
                        <div className="rating">
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            (10 reviews)
                        </div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <h4><i style={{fontSize:"19px"}} className="fa">&#xf156;</i> {this.state.product.product_price} </h4>
                        <div className="row">
                            
                            <div className="col-md-4 col-sm-6 col-xs-12">
                            <h6>camera</h6>
                                <select className="form-control" name="select">
                                    <option value="" >{this.state.product.product_camera} MP</option>
                                   
                                </select>
                            </div>
                           
                            <div className="col-md-4 col-sm-6 col-xs-12">
                            <h6>storage</h6>
                                <select className="form-control" name="select">
        <option value="">{this.state.product.product_storage} GB</option>
                                    <option value="">16GB</option>
                                    <option value="">32GB</option>
                                    <option value="">64GB</option>
                                    <option value="">128GB</option>
                                </select>
                            </div>
                       
                            <div className="col-md-4 col-sm-12">
                            <h6>Ram</h6>
                                <select className="form-control" name="select">
        <option value="" >{this.state.product.product_ram} GB</option>
                                   
                                </select>
                            </div>
                            
                        </div>
                        <div className="space-ten"></div>
                        <div className="btn-ground">
                            <button type="button" className="btn btn-primary"  onClick={()=>this.savecart(this.state.product)}><span className="glyphicon glyphicon-shopping-cart"></span> Add To Cart</button>
                           
                        </div>
                    </div>
                </div>
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
        cart:state.cart

            }
}


const dispatch = (dispatch:any) => ({
    addcart: (item: any) => dispatch({ type:'Add', payload: item }),
    updatecart: (item: any) => dispatch({ type:'Update', payload: item })
    
  });


export default connect(receive,dispatch) (Pdetail);


