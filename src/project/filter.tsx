import React from 'react';
import '../App.css';
import axios from 'axios';
import Pdetail from './productdetail';

import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

export interface IFormState {
    
    submitSuccess: boolean;
	loading: boolean;
    products:any;
    filterproduct:any;
    cartid:number;
    brandcategory:any;
    storagecat:any;
    ramcat:any;
    filter:any;
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
class Filterproduct extends React.Component<RouteComponentProps<{}> & TodoContainerProps, IFormState>
{
    constructor(props:RouteComponentProps<{}> & TodoContainerProps)
    {
		super(props);
		this.state={
			loading:false,
			submitSuccess:false,
			products:[],
            cartid:0,
            brandcategory:[],
            filterproduct:[],
            storagecat:[],
            ramcat:[],
            filter:[],
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
                   cart=cart.map((k:any) =>
                    k.product_id === obj.product_id ? { ...k, quantity: obj.quantity + 1 } : k
                                )
                          

                       let myobj={
                           id:obj.product_id,
                           quantity:obj.quantity+1
                       }
                              

                    localStorage.setItem('cart',JSON.stringify(cart));
                    this.props.updatecart(myobj)

        }
        else{ 
          this.props.addcart(product)
          cart.push(product);
          localStorage.setItem('cart',JSON.stringify(cart));

        }


       
            
       

      
    }



    private sortprice = (e: React.FormEvent<HTMLInputElement>) => {
        /*
         if(e.currentTarget.name=='minimum')
         {
                 let pricearray=this.state.filterproduct;
       
               let myarr = pricearray.filter((e:any)=> {
                return e.product_brand = "Moto";
             
                })
                console.log(myarr);
                this.setState({products:myarr});
         }
         else{
            console.log(e.currentTarget.value);
         }*/
        
    }

    private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
       
        
    if(e.currentTarget.checked)
    {
      this.state.filter.push(e.currentTarget.value)
    }

        else{
            let  index = this.state.filter.indexOf(e.currentTarget.value);
    if (index > -1) {
        this.state.filter.splice(index, 1);
    }
        }

    console.log(this.state.filter);
    this.filter();
    
     
    

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

            if(!map.has(item.product_storage)){
                map.set(item.product_storage, true);    // set any value to Map
                this.state.storagecat.push({
                    id:item.product_id,
                    brandname: item.product_storage
                });
            }

            if(!map.has(item.product_ram)){
                map.set(item.product_ram, true);    // set any value to Map
                this.state.ramcat.push({
                    id:item.product_id,
                    brandname: item.product_ram
                });
            }


        }
        console.log(result);
        this.setState({brandcategory:result})
    }

    viewcart(pid:any)
	{
        this.setState({cartid:pid})
    }

    filter()
    { 
        let product=this.state.filterproduct;
    
       let filterarr= this.state.filter;
       if(filterarr.length> 0)
       {
       
       let arr= product.filter(function(item:any) {
       return filterarr.includes(item.product_ram) || filterarr.includes(item.product_brand) || filterarr.includes(item.product_storage); 
          });

          console.log(arr);
          this.setState({products:arr});
        }

        else{
            this.setState({products:product});

        }
        
     
    }

    
    


  render()
  {
      console.log(this.props.cart);
      return(<React.Fragment>
        
        <div className="container-fluid">
                <div className="row product">
                    <div className="col-sm-3">

                    <div className="card bg-light mb-3 colproductin">
                    <div className="card-header bg-primary text-white text-uppercase"><i className="fa fa-list"></i> Price Range</div>
                     
                    <div className="container-fluid">
                   
			
			<div className="row">
			<div className="col-sm-6">
			  <label>Min</label>
			  <input type="number" className="form-control inputEmail4" name="minimum" placeholder="Rs 0" onBlur={(e)=>this.sortprice(e)}></input>
             </div>
			
             <div className="col-sm-6">
			  <label>Max</label>
			  <input type="number" className="form-control inputEmail4" name="maximum" placeholder="maxumum 50000 Rs" onChange={(e)=>this.sortprice(e)}  value="50000"></input>
             </div>
			</div>
			</div>
                 </div>
                    <div className="card-header bg-primary text-white text-uppercase"><i className="fa fa-list"></i> Brand</div>
                    <div className="card bg-light mb-3 colproductin myfiletr">
               
                    <div className="filter-content container">
			<div className="card-body">
            { this.state.brandcategory.map((e:any,i:any)=>(
                            
                  <div className="form-group">
				  <input className="form-check-input" type="checkbox" value={e.brandname} onChange={(e)=>this.handleChange(e)}></input>
				  <span className="form-check-label">
				    {e.brandname}
				  </span>
				</div> 

             ))}
				
			

			</div> 
		</div>
                    
                    </div>


                    <div className="card bg-light mb-3 colproductin">
                    <div className="card-header bg-primary text-white text-uppercase"><i className="fa fa-list"></i> Ram</div>
                     
                    <div className="filter-content container">
			<div className="card-body">
            { this.state.ramcat.map((e:any,i:any)=>(
				
                <div className="form-group">
				  <input className="form-check-input" type="checkbox" value={e.brandname} onChange={(e)=>this.handleChange(e)}></input>
				  <span className="form-check-label">
				    {e.brandname}GB
				  </span>
                </div> 
                
                ))}
				 
				  
                
			

			</div> 
		</div>
               
         </div>

         <div className="card bg-light mb-3 colproductin">
                    <div className="card-header bg-primary text-white text-uppercase"><i className="fa fa-list"></i> Internal Storage</div>
                     
                    <div className="filter-content container">
			<div className="card-body">
            { this.state.storagecat.map((e:any,i:any)=>(
				
                <div className="form-group">
				  <input className="form-check-input" type="checkbox" value={e.brandname} onChange={(e)=>this.handleChange(e)}></input>
				  <span className="form-check-label">
				    {e.brandname}GB
				  </span>
                </div> 
                
                ))}
               
                
			

			</div> 
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
                                <a  onClick={()=>this.savecart(e)} className="btn btn-primary"><span className="glyphicon glyphicon-shopping-cart" ></span> Add to Cart</a>
                                </div>
                            </div>
								
									
								</div>						
							</div>

                        
						</div>


					))}
							
						
					</div>

						
                    <Pdetail id={this.state.cartid}></Pdetail>
				
                    <div style={{float:"right"}}>{this.state.pager}</div>

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


export default connect(receive,dispatch) (Filterproduct);