window.addEventListener("load", function (e) {
  // this.alert('loading')

  const param = new URLSearchParams(window.location.search);
  const id = param.get("id");
  const product = store.getById(id);
  if (product) {
    document.getElementById("name").textContent = product.name;
    document.getElementById("price").textContent = product.price + "đ";
    document.getElementById("description").textContent = product.description;
    document.getElementById("image").src = product.image;
  }

  document.querySelector(".arrow").addEventListener("click", () => {
    history.back();
  });
});
