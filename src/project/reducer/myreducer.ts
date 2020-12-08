
let cart:any;
if(localStorage.cart)
{
 cart=localStorage.getItem('cart');
 cart=JSON.parse(cart);
}
else{
  localStorage.setItem('cart',JSON.stringify([]));
  cart=[]
}
         
const initialState = {
  
    cart:cart,
    totalamount:0,
    isauthenticated:false
  }


const reducer= (state = initialState, action:any) => {
  
  switch (action.type) {
    case "Add":
      return {
          ...state,
          cart:state.cart.concat(action.payload)
             }
    case "Remove":
      return {
          ...state,
         cart: state.cart.filter((_:any, i:any) => i !== action.payload)
             }

   case "Update":
          
          return {
           ...state,
             cart: state.cart.map((obj:any) =>
              obj.product_id === action.payload.id ? { ...obj, quantity: action.payload.quantity } : obj
          )
          }

    case "totalamount":
           localStorage.totalamount=action.payload.amount;
            return {
             ...state,
               totalamount:action.payload.amount
                
            
            }

    case "emptycart":
              
               return {
                ...state,
                  cart:[]
                   
               
               }

    case "login":
                
            return {
                ...state,
                   isauthenticated:true
                      
                  
                  }

    case "logout":
                
           return {
                  ...state,
                   isauthenticated:false
                              
                          
                   }

    default:
      return state
  }
}

export default reducer;