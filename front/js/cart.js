//-----Get Product from localstorage
function addProductFunc() {
  const addProduct = JSON.parse(localStorage.getItem("product"));
  //console.log(addProduct)
  return addProduct;
}
//----------------cartDisplay---------------------------------------------
const cartDisplay = async (products) => {
  //console.log(products)

  if (products) {
    document.getElementById("cart__items").innerHTML = products
      .map(
        (product) => `
    <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
      <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="${product.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>Couleur : ${product.color}</p>
          <p>Prix/Unité : ${product.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" data-id="${product._id}" data-color="${product.color}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem" data-id="${product._id}" data-color="${product.color}">Supprimer</p>
          </div>
        </div>
      </div>
    </article>
    `
      )
      .join("");
    return products;
  }
};
//---------------modifyQuantity--------------------------------------------
const modifyQuantity = async (products) => {
  const modifyBtnInput = document.querySelectorAll(".itemQuantity"); //expected all ojects with theirs inputs
  modifyBtnInput.forEach((nvQuantity) => {
    nvQuantity.addEventListener("input", () => {
      // the input of a sinle object to change
      for (i = 0; i < products.length; i++) {
        if (
          products[i]._id == nvQuantity.dataset.id &&
          products[i].color == nvQuantity.dataset.color
        ) {
          if (nvQuantity.value > 100) {
            nvQuantity.value = 100;
            //return nvQuantity.value
          }
          if (nvQuantity.value <= 0) {
            nvQuantity.value = 1;
            return nvQuantity.value;
          }
          if (nvQuantity.value >= 1 && nvQuantity.value <= 100) {
            //console.log(nvQuantity.value),              //20 new quantity
            //console.log(products[i].quantity),          //9 in the cart
            (products[i].quantity = nvQuantity.value), //20 in the cart
              localStorage.setItem("product", JSON.stringify(products)),
              getTotalPrice(products);
            return nvQuantity.value;
          }
        }
      }
    });
  });
  //return
};
//---------------removeProduct---------------------------------------------
const removeProduct = async (products) => {
  const delBtn = document.querySelectorAll(".deleteItem");
  delBtn.forEach((button_delete) => {
    button_delete.addEventListener("click", () => {
      console.log(button_delete);

      const productsRemove = products.length;
      console.log(productsRemove);

      if (productsRemove == 1) {
        return (
          localStorage.removeItem("product"),
          console.log("delete whole cart"),
          (location.href = "cart.html")
        );
      } else {
        const resultFilter = products.filter((el) => {
          if (
            button_delete.dataset.id != el._id ||
            button_delete.dataset.color != el.color
          ) {
            return true;
          }
        });
        localStorage.setItem("product", JSON.stringify(resultFilter));
        location.href = "cart.html";
      }
    });
  });
  return;
};
//---------------GET TOTAL PRICE---------------------------------------------
const getTotalPrice = async (products) => {
  const each_product__quantity__array = [];
  const each_product__total_price__array = [];

  for (i = 0; i < products.length; i++) {
    const each_product__total_price = eval(
      products[i].quantity * products[i].price
    ); //totalPrice for a single position
    each_product__total_price__array.push(each_product__total_price);
    each_product__quantity__array.push(products[i].quantity);
  }
  const each_product__quantity = eval(each_product__quantity__array.join("+"));
  const all_products__total_price__result = eval(
    each_product__total_price__array.join("+")
  );

  document.getElementById(
    "totalQuantity"
  ).innerHTML = `<p>Total (<span id="totalQuantity">${each_product__quantity}</span> articles) : <span id="totalPrice"></span>${all_products__total_price__result} €</p>`;

  return all_products__total_price__result;
};

////////////////// FORM   ///////////////////

// ---------FIRST NAME-------------
function completeFirstName(e) {
  let valueFirstName;

  if (e.target.value.length == 0) {
    firstNameErrorMsg.innerHTML = "";
    valueFirstName = null; //if empty = null ; else is undefined
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    firstNameErrorMsg.innerHTML =
      "Prenom doit contenir entre 3 et 25 caractéres";
    valueFirstName = null;
    localStorage.removeItem("firstName");
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    firstNameErrorMsg.innerHTML = "";
    valueFirstName = e.target.value;
    localStorage.setItem("firstName", JSON.stringify(valueFirstName));
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    firstNameErrorMsg.innerHTML =
      "Prenom contient que des majuscules et minuscules";
    valueFirstName = null;
    localStorage.removeItem("firstName");
  }
  return valueFirstName;
}
//   ---------LAST NAME---------
function completeLastName(e) {
  let valueLastName;
  if (e.target.value.length == 0) {
    lastNameErrorMsg.innerHTML = "";
    valueLastName = null; //if empty = null ; else is undefined
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    lastNameErrorMsg.innerHTML = "Nom doit contenir entre 3 et 25 caractéres";
    valueLastName = null;
    localStorage.removeItem("lastName");
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    lastNameErrorMsg.innerHTML = "";
    valueLastName = e.target.value;
    localStorage.setItem("lastName", JSON.stringify(valueLastName));
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    lastNameErrorMsg.innerHTML =
      "Nom ne contient que des lettres majuscules et minuscules";
    valueLastName = null;
    localStorage.removeItem("lastName");
  }
  return valueLastName;
}
//----------ADDRESS----------
function completeAddress(e) {
  let valueAddress;
  if (e.target.value.length == 0) {
    addressErrorMsg.innerHTML = "";
    valueAddress = null; //if empty = null ; else is undefined
  } else if (e.target.value.length < 3 || e.target.value.length > 35) {
    addressErrorMsg.innerHTML =
      "Adresse doit contenir entre 3 et 35 caractéres";
    valueAddress = null;
    localStorage.removeItem("address");
  }
  if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,35}$/)) {
    addressErrorMsg.innerHTML = "";
    valueAddress = e.target.value;
    localStorage.setItem("address", JSON.stringify(valueAddress));
  }
  if (
    !e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,35}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 35
  ) {
    addressErrorMsg.innerHTML =
      "Adresse commence par des chiffres suivis par des lettres";
    valueAddress = null;
    localStorage.removeItem("address");
  }
  return valueAddress;
}
//------CITY---------
function completeCity(e) {
  let valueCity;
  if (e.target.value.length == 0) {
    cityErrorMsg.innerHTML = "";
    valueCity = null; //if empty = null ; else is undefined
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    cityErrorMsg.innerHTML = "Ville doit contenir entre 3 et 25 caractéres";
    valueCity = null;
    localStorage.removeItem("city");
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    cityErrorMsg.innerHTML = "";
    valueCity = e.target.value;
    localStorage.setItem("city", JSON.stringify(valueCity));
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    cityErrorMsg.innerHTML =
      "Ville ne contient que des lettres majuscules et minuscules";
    valueCity = null;
    localStorage.removeItem("city");
  }
  return valueCity;
}
//---------EMAIL----------
function completeEmail(e) {
  let valueEmail;
  if (e.target.value.length == 0) {
    emailErrorMsg.innerHTML = "";
    valueEmail = null; //if empty = null ; else is undefined
  } else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    emailErrorMsg.innerHTML = "";
    valueEmail = e.target.value;
    localStorage.setItem("email", JSON.stringify(valueEmail));
  }
  if (
    !e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
    !e.target.value.length == 0
  ) {
    emailErrorMsg.innerHTML = "Email format incorrect. Ex: pierre@gmail.com";
    localStorage.removeItem("email");
  }
  return valueEmail;
}
//-------PREPARATION ORDER
async function prepareOrder() {
  //---Tous les products du cart
  const orderPrepare = JSON.parse(localStorage.getItem("product"));
  const orderId = [];

  //Push all id-products into the array orderId
  orderPrepare.forEach((each_product_cart) => {
    orderId.push(each_product_cart._id);
  });
  const data = {
    contact: {
      firstName: valueFirstName,
      lastName: valueLastName,
      address: valueAddress,
      city: valueCity,
      email: valueEmail,
    },
    products: orderId,
  };
  console.log(data);
  return data;
}
//---------- fetch post---------------------------
const postDataOrder = (order) =>
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
    .then((promise) => (responseServer = promise))
    .catch((err) => console.log("Problem, fetch post", err));
//---------Optimisation Order-------------------
async function optimisationDataOrder(products) {
  const priceOrder = await getTotalPrice(products);
  //console.log(priceOrder);
  //----------
  const productsMoreInfo = [];
  const orderOptim = JSON.parse(localStorage.getItem("product"));
  orderOptim.forEach((each_product_cart) => {
    //The object  data_each_product_cart need to push into the array "orderMoreInfo".
    const data_more_info = {
      id: each_product_cart._id,
      color: each_product_cart.color,
      quantity: each_product_cart.quantity,
    };
    productsMoreInfo.push(data_more_info);
  });
  //-----------------------------------------------
  //console.log(responseServer)
  const dataOrder = {
    //responseServer after await postDataOrder in the SendOrder
    contact: responseServer.contact,
    order: responseServer.orderId,
    products: responseServer.products,

    productsMoreInfo: productsMoreInfo,
    priceOrder: `${priceOrder} €`,
  };
  if (dataOrder) {
    localStorage.setItem("orderClient", JSON.stringify(dataOrder));
    const orderClient = JSON.parse(localStorage.getItem("orderClient"));
    console.log(orderClient);
  } else {
    console.error("dataorder not found");
  }
  localStorage.removeItem("product");
  localStorage.removeItem("firstName");
  localStorage.removeItem("lastName");
  localStorage.removeItem("address");
  localStorage.removeItem("city");
  localStorage.removeItem("email");
  //-----------------------------------------------------------
  location.href = "confirmation.html";
  // if desactivated the orders are stocked in the localStorage
  // to verify the logs of product page need to by desactivated
  return dataOrder;
}
//++++++++++++++++++++++++++++++++
const main = async () => {
  const products = addProductFunc();
  await cartDisplay(products);
  await modifyQuantity(products);
  await removeProduct(products);
  await getTotalPrice(products);
  //const firstName = document.getElementById('firstName')
  firstName.addEventListener("input", completeFirstName);
  lastName.addEventListener("input", completeLastName);
  address.addEventListener("input", completeAddress);
  city.addEventListener("input", completeCity);
  email.addEventListener("input", completeEmail);
  //---------------------
  sendForm.addEventListener("submit", async function sendOrder(e) {
    e.preventDefault(); //to stop sending the form

    //input values from localStorage
    valueFirstName = JSON.parse(localStorage.getItem("firstName"));
    valueLastName = JSON.parse(localStorage.getItem("lastName"));
    valueAddress = JSON.parse(localStorage.getItem("address"));
    valueCity = JSON.parse(localStorage.getItem("city"));
    valueEmail = JSON.parse(localStorage.getItem("email"));
    //--------------------
    if (valueFirstName && valueLastName && valueAddress && valueCity && valueEmail) {
      const order = await prepareOrder();
      await postDataOrder(order);
      optimisationDataOrder(products);
    }
  });
};
main();
//+++++++++++++++++++++++++++++++++++

//Expected from BackEnd
//  * Expects request to contain:
//  * contact: {
//  *   firstName: string,
//  *   lastName: string,
//  *   address: string,
//  *   city: string,
//  *   email: string
//  * }
//  * products: [string] <-- array of product _id
//  *
