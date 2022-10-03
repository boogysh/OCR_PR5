//-----ProductId---------
function getProductId() {
  return new URL(location.href).searchParams.get("id");
}
//------FetchProduct----------
const fetchproduct = (productId) =>
  fetch(`http://localhost:3000/api/products/${productId}`)
    .then(res => res.json())
    .then(promise => productData = promise)
    .catch(err => console.log("Error fetchProducts", err));
//-----productDisplay
const productDisplay = async () => {
  document.querySelector(".item__img img").src = productData.imageUrl;
  document.querySelector(".item__img img").alt = productData.altTxt;
  document.getElementById("title").innerText = productData.name;
  document.getElementById("price").innerText = productData.price;
  document.getElementById("description").innerText = productData.description;

  const colors = productData.colors;
  for (color of colors) {
    document.getElementById(
      "colors"
    ).innerHTML += `<option value="${color}" id="${color}">${color}</options>`;
  }
  document.getElementById(
    "addToCart"
  ).innerHTML = `<button id="${productData._id}">Ajouter au panier</button>`;

  return productData;
};
//-----addToCart---------
const addToCart = () => {
  //-----------Select Color---------------------
  const select_color = document.getElementById("colors");
  select_color.addEventListener('input', ()=> {
    console.log(select_color.value);
  })
  //------Select Quantity & Functionality---------
  const select_quantity = document.getElementById("quantity");
  select_quantity.addEventListener('input', () => {
    if (select_quantity.value < 1 ){
      select_quantity.value = 1
      console.log(select_quantity.value)
    }
    else if (select_quantity.value > 100 ){
      select_quantity.value = 100
      console.log(select_quantity.value)
    }
    else if (select_quantity.value >= 1 && select_quantity.value <= 100) {
      console.log(select_quantity.valueAsNumber)
    } 
  })
  //---------------ADD TO CART-----------------------
  const button_add_to_cart = document.getElementById(productData._id);
  button_add_to_cart.addEventListener("click", () => {

    //attention is let, not const
    let productArray = JSON.parse(localStorage.getItem("product"));
    //-----ASIGN------
    const fusionProductColor = Object.assign({}, productData, {
      color: select_color.value,
      quantity: select_quantity.valueAsNumber
    });
    //---------------
    //console.log(fusionProductColor)
    if (productArray == null) {
      productArray = [];
      productArray.push(fusionProductColor);
      localStorage.setItem("product", JSON.stringify(productArray)); //the product added to localStorage
      console.log(productArray);
    } else if (productArray != null) {
      for (i = 0; i < productArray.length; i++) {
        if (  //if selectedProduct have the same id and color comparate with localStorageProduct
          productArray[i]._id == productData._id &&
          productArray[i].color == select_color.value 
        ) {
          //--------Functionality--------------------------------------------------------------------------
          //-----------------------------------------------------------------------------------------------
          //if the user return to pageProduct and change quantity, new quantity is:
          const total_quantity_product_page = []; //cart quantity + new quantity
          total_quantity_product_page.push(productArray[i].quantity); //cart quantity
          console.log(fusionProductColor.quantity)
          total_quantity_product_page.push(fusionProductColor.quantity); //new quantity
          console.log(total_quantity_product_page)
          
          productArray[i].quantity = eval(total_quantity_product_page.join("+")) //---!!! RESULT !!!---
          console.log(productArray[i].quantity)
          //Max 100 items for each product
          if(productArray[i].quantity > 100){
            productArray[i].quantity = 100
            }  
            return (
            
            localStorage.setItem("product", JSON.stringify(productArray)),
            (productArray = JSON.parse(localStorage.getItem("product")))
          );
        }
        //-------------------------------------------------------------------------------------------------   
      }
      for (i = 0; i < productArray.length; i++) {
        //if selectedProduct have the same id comparated with the localStorageProduct bad don't have the same color
        if (
          (productArray[i]._id == productData._id &&
            productArray[i].color != select_color.value) ||
          productArray[i]._id != productData._id
        ) {
          return (
            console.log("new"),
            productArray.push(fusionProductColor),
            localStorage.setItem("product", JSON.stringify(productArray)),
            (productArray = JSON.parse(localStorage.getItem("product")))
          );
        }
      }
    }
  });
  return (productArray = JSON.parse(localStorage.getItem("product")));
};
////////////////////////////////////
const main = async () => {
  const productId = await getProductId();
  await fetchproduct(productId);
  await productDisplay();
  await addToCart();
};
main();
