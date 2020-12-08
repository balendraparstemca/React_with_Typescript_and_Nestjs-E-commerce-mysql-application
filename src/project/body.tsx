import React from 'react';
import Categoryslider from './categoryslider';
import Product from './product';
import axios from 'axios';

interface istate {
    
    products:any[];
  }
class Body extends React.Component<{},istate>
{
	constructor(props:{})
	{
		super(props);
		this.state={
			products:[0,0,0,0,0]
		}
	
	}



	public componentDidMount(): void {
        axios.get(`http://localhost:3000/product`).then(data => {
            console.log(data.data)
         
                           
        })

        
	}
	

my(i:any) {

	
i=i+1;
return (i===4) ? "</div> </div> <div className='item carousel-item'><div className='row'>" : console.log(i);
		
	}


    render()
    {
         return(<div className="mybody">

               <Categoryslider> </Categoryslider>

               <div className="container-fluid">
<div className="row">
<div className="col-sm-12 coloumn">

<h4><span className="card-header"> <b>Best Selling product</b> </span> <span className="viewall"> <button className="btn">VIEW ALL</button> </span></h4>
<hr/>

		
<div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="0">
		
		  
		
			<div className="carousel-inner">
			<div className="item carousel-item active">
			<div className="row">

			{this.state.products.map((e,i)=>
			(
			


			  
				  

			
				  
		

	
<div className="col-sm-3">
		<div className="thumb-wrapper">
			<span className="wish-icon"><i className="fa fa-heart-o"></i></span>
			<div className="img-box">
				<img src="image/image-1.jpeg" className="img-responsive img-fluid" alt=""></img>
			</div>
			<div className="thumb-content">
				<h4>Sony Headphone</h4>									
				<div className="star-rating">
					<ul className="list-inline">
						<li className="list-inline-item"><i className="fa fa-star"></i></li>
						<li className="list-inline-item"><i className="fa fa-star"></i></li>
						<li className="list-inline-item"><i className="fa fa-star"></i></li>
						<li className="list-inline-item"><i className="fa fa-star"></i></li>
						<li className="list-inline-item"><i className="fa fa-star-o"></i></li>
					</ul>
				</div>
				<p className="item-price"> <b>$23.99</b></p>
				<a href="#" className="btn btn-primary">Add to Cart</a>
			</div>						
		</div>
	</div>
			


			)

			
)}
		</div>

		</div>		
				
				
			</div>
			
			<a className="carousel-control left carousel-control-prev" href="#myCarousel" data-slide="prev">
				<i className="fa fa-angle-left"></i>
			</a>
			<a className="carousel-control right carousel-control-next" href="#myCarousel" data-slide="next">
				<i className="fa fa-angle-right"></i>
			</a>
		</div>

 </div>


</div>
</div>


         </div>)
    }
}


export default Body;