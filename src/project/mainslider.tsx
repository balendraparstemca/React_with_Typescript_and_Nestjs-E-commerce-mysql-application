import React from 'react';

class Mainslider extends React.Component
{
    constructor(props:{})
    {
        super(props)
    }
    render()
    {
        return(<React.Fragment>
            <div className="mainslider">
<div id="carousel-example-generic" className="carousel slide" data-ride="carousel">


    <div className="carousel-inner" role="listbox">
      <div className="item active">
        <img src="https://rukminim1.flixcart.com/flap/944/500/image/a16c0a32bd834501.jpg?q=50"></img>
      </div>
      <div className="item">
        <img src="https://rukminim1.flixcart.com/flap/944/500/image/e6e6b80973ea04ea.jpg?q=50"></img>
      </div>
      <div className="item">
        <img src="https://rukminim1.flixcart.com/flap/950/500/image/1e566e8553a1d779.jpg?q=50"></img>
      </div>
      <div className="item">
        <img src="https://rukminim1.flixcart.com/flap/950/500/image/d26413ad11009a95.jpg?q=50"></img>
      </div>
      <div className="item">
        <img src="https://rukminim1.flixcart.com/flap/950/500/image/1fed6c8d3af80cfc.jpg?q=50"></img>
      </div>
    </div>

   
    <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
  </div>
        </React.Fragment>)
    }
}

export default Mainslider;