const orderConfirmation = async () => {
  const orderToConfirm = JSON.parse(localStorage.getItem("orderClient"));

  if (orderToConfirm) {
    console.log(orderToConfirm);
    const orderId = [];
    orderId.push(orderToConfirm.order);

    document.getElementById("orderId").textContent = orderId;
    console.log(orderId);

    localStorage.removeItem("orderClient");
    localStorage.removeItem("product");
  }
};
orderConfirmation();
