import React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';

interface IState{
    order:any[];
    isloading:boolean,
    initialorder:any[];
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

class Projectadmin extends React.Component<RouteComponentProps,IState>
{
     constructor(props:RouteComponentProps)
     {
         super(props)

         this.state={
            order:[],
            isloading:false,
            initialorder:[],
            text:'',
            page:0,
            per_page:5,
            pre_page:null,
            next_page:null,
            total:0,
            total_pages:0,
            pager:'',
            takeperpag:0

        }
     }


     public componentDidMount():void{
    
        axios.get(`http://localhost:3000/product`).then(data=>{
                  console.log(data.data);
                this.setState({  initialorder:data.data,order: data.data,isloading:true, })
                this.Paginator(1);
            console.log(this.state.order);
           
            
        })

        
    }



    Paginator=(pageno:any)=>
    {  console.log(pageno);
        let items=this.state.initialorder;
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
   
     }
     
     this.setState({

      page:page,
      per_page: per_page,
      pre_page:page - 1 ? page - 1 : null,
      next_page:(total_pages > page) ? page + 1 : null,
      total: items.length,
      total_pages:total_pages,
      order:data
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
        const order = this.state.order;
        return(<React.Fragment>
               <div className="container-fluid">
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
						<h2>Manage <b>product</b></h2>
					</div>
					<div className="col-sm-6">
						<a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></a>
						<a href="#deleteEmployeeModal" className="btn btn-danger" data-toggle="modal"><i className="material-icons">&#xE15C;</i> <span>Delete</span></a>						
					</div>
                </div>
            </div>
            <table className="table table-responsive table-striped table-hover">
                <thead>
                    <tr>
						<th>
							<span className="custom-checkbox">
								<input type="checkbox" id="selectAll"></input>
								<label></label>
							</span>
						</th>
                        <th>id</th>
                        <th>product_name</th>
                        <th>product_brand</th>
                        <th>product_price</th>
						<th>product_ram </th>
                        <th>product_storage</th>
                        <th>product_camera</th>
                        <th>product_image</th>
                        <th>product_quantity</th>
                        <th>product_status</th>
                        
                    </tr>
                </thead>
                <tbody>
                  
                   {
                        order.length === 0 && (
                            <div className="text-center">
                                <h2>there is No order</h2>
                            </div>
                        )}

                  {  order && order.map((order:any,i:any) =>
                     
                        <tr>
						<td>
							<span className="custom-checkbox">
								<input type="checkbox" id="checkbox5" name="options[]" value="1"></input>
								<label></label>
							</span>
						</td>
                         <td>{order.product_id}</td>
                  <td>{order.product_name}</td>
                  <td>{order.product_brand}</td>
                  <td>{order.product_price}</td>
                  <td>{order.product_ram}</td>
                  <td>{order.product_storage}</td>
                  <td>{order.product_camera}</td>
                  <td> <span className="thumbnail pull-left"> <img className="media-object" src={'image/' + order.product_image}  style={{ width:'52px'}}></img> </span>
                    </td>
                  <td>{order.product_quantity}</td>
                  <td>{order.product_status}</td>
                  <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button className="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" onClick={()=>this.viewdetail(order.userid)} ><span className="glyphicon glyphicon-pencil"></span> view details</button></p></td>

                  
                        <td>
                            <a href="#editEmployeeModal" className="edit" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a href="#deleteEmployeeModal" className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                        </td>
                    </tr> 
                     
                     )
                   }
				
                   				
				

                </tbody>
            </table>
			<div className="clearfix">
                <div className="hint-text">Showing <b>5</b> out of <b>{this.state.total}</b> entries</div>
                <ul className="pagination">
                  {this.state.pager}
                </ul>
            </div>
        </div>
    </div>

	<div id="addEmployeeModal" className="modal fade productmodel">
		<div className="modal-dialog">
			<div className="modal-content">
				<form>
					<div className="modal-header">						
						<h4 className="modal-title">Add Employee</h4>
						<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div className="modal-body">					
						<div className="form-group">
							<label>Name</label>
							<input type="text" className="form-control" required></input>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input type="email" className="form-control" required></input>
						</div>
						<div className="form-group">
							<label>Address</label>
							<textarea className="form-control" required></textarea>
						</div>
						<div className="form-group">
							<label>Phone</label>
							<input type="text" className="form-control" required></input>
						</div>					
					</div>
					<div className="modal-footer">
						<input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"></input>
						<input type="submit" className="btn btn-success" value="Add"></input>
					</div>
				</form>
			</div>
		</div>
	</div>
	
	<div id="editEmployeeModal" className="modal fade productmodel">
		<div className="modal-dialog">
			<div className="modal-content">
				<form>
					<div className="modal-header">						
						<h4 className="modal-title">Edit Employee</h4>
						<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div className="modal-body">					
						<div className="form-group">
							<label>Name</label>
							<input type="text" className="form-control" required></input>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input type="email" className="form-control" required></input>
						</div>
						<div className="form-group">
							<label>Address</label>
							<textarea className="form-control" required></textarea>
						</div>
						<div className="form-group">
							<label>Phone</label>
							<input type="text" className="form-control" required></input>
						</div>					
					</div>
					<div className="modal-footer">
						<input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"></input>
						<input type="submit" className="btn btn-info" value="Save"></input>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div id="deleteEmployeeModal" className="modal fade productmodel">
		<div className="modal-dialog">
			<div className="modal-content">
				<form>
					<div className="modal-header">						
						<h4 className="modal-title">Delete Employee</h4>
						<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div className="modal-body">					
						<p>Are you sure you want to delete these Records?</p>
						<p className="text-warning"><small>This action cannot be undone.</small></p>
					</div>
					<div className="modal-footer">
						<input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"></input>
						<input type="submit" className="btn btn-danger" value="Delete"></input>
					</div>
				</form>
			</div>
		</div>
	</div>
        </React.Fragment>)
    }
    viewdetail(orderid: any): void {
        throw new Error("Method not implemented.");
    }
}

export default Projectadmin;