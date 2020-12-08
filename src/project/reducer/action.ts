const addcart = (todo: any) => ({ type: "Add", payload: todo })

const removecart = (index: any) => ({ type: "Remove", payload: index })

export {
  addcart,
  removecart
}