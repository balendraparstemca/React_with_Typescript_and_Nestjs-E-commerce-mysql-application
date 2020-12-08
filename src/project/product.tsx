import React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Pdetail from './productdetail';
import { connect } from 'react-redux';
export interface IFormState {
    
    submitSuccess: boolean;
	loading: boolean;
    products:any;
    category:any
    cartid:number;
    filterproduct:any;
    initialproduct:any;
    text:any;
    page:any;
    per_page:any;
    pre_page:any;
    next_page:any;
    total:any;
    total_pages:any;
    pager:any;
    takeperpag:any;
}

interface TodoContainerProps {
    cart:any;
    addcart:(item: any) => object;
    updatecart:(item: any) => object;
    
  }
class Product extends React.Component<RouteComponentProps<{}> & TodoContainerProps, IFormState>
{
    constructor(props:RouteComponentProps<{}> & TodoContainerProps)
    {
		super(props);
		this.state={
			loading:false,
			submitSuccess:false,
            products:[],
            category:[],
            cartid:0,
            filterproduct:[],
            initialproduct:[],
            text:'',
            page:0,
            per_page:6,
            pre_page:null,
            next_page:null,
            total:0,
            total_pages:0,
            pager:'',
            takeperpag:0
		}
	}
	
	public componentDidMount(): void {
        axios.get(`http://localhost:3000/product`).then(data => {
            console.log(data.data)
           this.setState({
                               products:data.data,
                               filterproduct:data.data,
                               initialproduct:data.data
                           })
                           
                           this.category();
                           this.Paginator(1);
        })

        
	}
	
	viewcart(pid:any)
	{
		this.setState({cartid:pid})

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
    
    category()
    {
        const array =this.state.products;
        const result = [];
        const map = new Map();
        for (const item of array) {
            if(!map.has(item.product_brand)){
                map.set(item.product_brand, true);    // set any value to Map
                result.push({
                    id:item.product_id,
                    brandname: item.product_brand
                });
            }
        }
        console.log(result);
        this.setState({category:result})
    }

    filter(search:any)
   
{ 
    let product=this.state.filterproduct;
        if(search=='all')
        {
            this.setState({products:product});
        }
        else{
           
            let arr= product.filter(function(item:any) {
                return item.product_brand==search 
              });
         
                console.log(arr);
               this.setState({products:arr});
        }
        

        
    }

    Paginator=(pageno:any)=>
    {  
        console.log(pageno);
        let items=this.state.initialproduct;
     let page=pageno || 1;
     let per_page=this.state.per_page;
     console.log(per_page);
     let offset=(page - 1) * per_page;
     let paginatedItems = items.slice(offset).slice(0, per_page);
     let total_pages = Math.ceil(items.length / per_page);
     
     let data=paginatedItems;
     let pagebutton:any=[];
  
     let cls:string;
     for(let i=1;i<=total_pages;i++)
     {
      if(page==i)
      {
          pagebutton.push( <li className="page-item active" onClick={()=>this.Paginator(i)}><a className="page-link">{i}</a></li>)
      }
      else{ 
          pagebutton.push( <li className="page-item" onClick={()=>this.Paginator(i)}><a className="page-link">{i}</a></li>)
          }

          console.log("paginator");
   
     }
     
     this.setState({

      page:page,
      per_page: per_page,
      pre_page:page - 1 ? page - 1 : null,
      next_page:(total_pages > page) ? page + 1 : null,
      total: items.length,
      total_pages:total_pages,
      products:data
     })

     let pager=<nav aria-label="...">
     <ul className="pagination">
       <li className={ this.state.pre_page==null ? "page-item disabled":"page-item"}  onClick={()=>this.Paginator(this.state.pre_page)}>
         <a className="page-link">Previous</a>
       </li>
      
      {pagebutton}
       <li className={ this.state.next_page==null ? "page-item disabled":"page-item"} onClick={()=>this.Paginator(this.state.next_page)}>
         <a className="page-link" >Next</a>
       </li>
     </ul>
   </nav>;

   this.setState({pager:pager});
 


     console.log(this.state);
  
    }


    render()
    {
         return(<div>
            <div className="container-fluid">
                <div className="row product">
                    <div className="col-sm-3">
                    <div className="card-header text-white text-uppercase"><i className="fa fa-list"></i> Categories</div>
                    <div className="card bg-light mb-3 colproductin myfiletr">
                    <ul className="list-group category_block">
                    <li className="list-group-item  active" onClick={()=>this.filter('all')}><a>All</a></li>

                        { this.state.category.map((e:any,i:any)=>(
                            
                            <li className="list-group-item" onClick={()=>this.filter(e.brandname)}><a>{e.brandname}</a></li>

                        ))}
               
               
                   
                      
                    </ul>
                    
                    </div>


                    <div className="card bg-light mb-3 colproductin">
                    <div className="card-header  text-white text-uppercase"><i className="fa fa-list"></i> Latest</div>
                 
                 <div className="latest">
                   <img src="latest.gif" width="200" ></img>
                  </div>
               
                  
              
               
               </div>


                    </div>
                   

                    <div className="col-sm-9 colproduct "  style={{ marginLeft:'0px'}}>
				
					<div className="card-header  text-white text-uppercase"><i className="fa fa-list"></i> </div>
                   
				
                    <div className="row">
					{ this.state.products.map((e:any,i:any)=>(
						  
						  <div className="col-sm-4">
							<div className="thumb-wrapper">
								
								<div className="img-box">
									<img src={'image/' + e.product_image} className="img-responsive img-fluid" alt=""></img>
								</div>
								<div className="thumb-content">
                                   <span>
					<h4><i style={{fontSize:"19px"}} className="fa">&#xf156;</i> {e.product_price} </h4>
                                        </span>
                                        <span>
					<h4>{e.product_name}</h4>
                                        </span>
                                
									
                                    <div className="row">
                                <div className="col-lg-6">
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#product_view" onClick={()=>this.viewcart(e.product_id)}><i className="fa fa-search"></i> Quick View</button>
                                </div>
                                <div className="col-lg-6">
                                <button  className="btn btn-primary" onClick={()=>this.savecart(e)} ><span className="glyphicon glyphicon-shopping-cart"></span> Add to Cart</button>
                                </div>
                            </div>
								
									
								</div>						
							</div>

                        
						</div>


					))}
						
					
						
						
					</div>


                 
					
					
						
				
                    <div style={{float:"right"}}>{this.state.pager}</div>
                    </div>
                    <Pdetail id={this.state.cartid}></Pdetail>
                </div>
            </div>
		 </div>
		 )
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


export default withRouter( connect(receive,dispatch) (Product));