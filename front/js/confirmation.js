const orderConfirmation = async () => {
  const orderToConfirm = JSON.parse(localStorage.getItem("orderClient"));

  if (orderToConfirm) {
    await orderToConfirm;
    console.log(orderToConfirm);
    const orderId = [];
    orderId.push(orderToConfirm.order);

    localStorage.removeItem("orderClient");

    document.getElementById("orderId").textContent = orderId;
    console.log(orderId);
  }
};
orderConfirmation();

// const orderConfirmation = async () => {
//     if(orders) {
//         console.log('function async orderConfirmation')
//         await orders
//         console.log(orders)

//         const lastorder = orders[orders.length -1]

//         document.getElementById('orderId').textContent = lastorder.order

//     }
// }
// orderConfirmation()

//attention le numéro de la order doit etre affichée, mais pas stockée
//attention le numéro de la order doit etre affichée, mais pas stockée
//attention le numéro de la order doit etre affichée, mais pas stockée
