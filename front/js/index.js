///////////
const fetchProducts = () =>
  fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => (productsData = promise))
    .catch((err) => console.log("Error fetchProducts", err));

async function displayProducts() {
  await fetchProducts();
  console.log(productsData); //+++++
  for (product of productsData) {
    const templateElt = document.getElementById("templateArticle");

    const cloneElt = templateElt.cloneNode(true).content;
    //const cloneElt = document.importNode(templateElt.content, true)   //another solution, it's work

    if (templateElt) {
      cloneElt.querySelector(".productName").textContent = product.name;
      cloneElt.querySelector(".productDescription").textContent = product.description;
      cloneElt.querySelector("article img").src = product.imageUrl;
      cloneElt.querySelector("article img").alt = product.altTxt;
      cloneElt.querySelector("a").href += `?id=${product._id}`;
      //---alt
    } else console.error("templateElt not found, please restore templateElt");

    if (items) {
      document.getElementById("items").appendChild(cloneElt);
    } else console.error("items not found");
  }
}
displayProducts();

