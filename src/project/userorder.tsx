import React from 'react';
import axios from 'axios';
interface Props {
    oid:number;
   
 
  
    
  }

class Userorder extends React.Component<Props,{order:any}>
{

    constructor(props:Props)
    {
        super(props);
        this.state={
            order:[],
         

        }

    }

    componentDidMount()
    {
        let id=this.props.oid;
        console.log(id);
           
        axios.get(`http://localhost:3000/orderdetail/${id}`).then(data => {
            console.log(data.data);

           this.setState({order:data.data});
            
        })

    }
    render()
    {
         return(<React.Fragment>
                  
                  <div className="modal fade" id="edit" role="dialog" aria-labelledby="edit" aria-hidden="true">
      <div className="modal-dialog">
    <div className="modal-content">
          <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-hidden="true"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
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

       {this.state.order.map((e:any,i:any)=>(


<tr>
       <td>{e.productname}</td>
       <td>{e.quantity}</td>
<td>{e.price}</td>
<td>{e.price}</td>
       <td>{e.status}</td>
  
</tr>




       )
       
       )}
     
     
    </tbody>
  </table>
      </div>
          <div className="modal-footer ">
        <button type="button" className="btn btn-warning btn-lg" style={{width: '100%'}}><span className="glyphicon glyphicon-ok-sign"></span> Update</button>
      </div>
        </div>
  
  </div>
    
    </div>

         </React.Fragment>)
    }
}


export default Userorder