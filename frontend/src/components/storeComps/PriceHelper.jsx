export const getPriceQueryParams = (searchParams, key, value) => {
  const hasValue = searchParams.has(key);

  if(value && hasValue){ // Updates price's value
    searchParams.set(key, value); // Increase Value
  }
  else if(value){
    searchParams.append(key, value); // Decrease Value
  }
  else if(hasValue){ // Delete Value
    searchParams.delete(key);
  }
  
  return searchParams;
}

export const caluclateOrderCost = (cartProducts) =>{
  const itemsPrice = cartProducts?.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);
  
  return{
    itemsPrice: Number(itemsPrice).toFixed(2),
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};