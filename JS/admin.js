class Product {
  constructor(id, name, price, description, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
  }
}
class StoreProduct {
  constructor() {
    this.products = [];
  }
  add(product) {
    for (let i = 0; i < this.products.length; i++) {
      const currentProduct = this.products[i];
      if (currentProduct.id === product.id) {
        return false;
      }
    }
    this.products.push(product);
    return true;
  }
  update(product) {
    // let vt = -1;
    for (let i = 0; i < this.products.length; i++) {
      const currentProduct = this.products[i];
      if (currentProduct.id === product.id) {
        this.products[i] = product;
        return true;
      }
    }
    return false;
  }

  getById(id) {
    for (let i = 0; i < this.products.length; i++) {
      const currentProduct = this.products[i];
      if (currentProduct.id == id) {
        return currentProduct;
      }
    }
    return null;
  }

  remove(id) {
    console.log(this.products);
    for (let i = 0; i < this.products.length; i++) {
      const currentProduct = this.products[i];
      if (currentProduct.id == id) {
        this.products.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  save() {
    if (this.products.length > 0) {
      const data = JSON.stringify(this.products);
      localStorage.setItem("products", data);
    }
  }

  getData() {
    const data = JSON.parse(localStorage.getItem("products"));
    if (data) {
      const listProduct = [];
      for (let i = 0; i < data.length; i++) {
        const user = new Product(
          data[i].id,
          data[i].name,
          data[i].price,
          data[i].description,
          data[i].image
        );
        listProduct.push(user);
      }
      this.products = listProduct;
    }
  }

  getProduct() {
    return this.products;
  }
}

store = new StoreProduct();
store.getData();

function renderTable(products) {
  let content = "";
  for (let i = 0; i < products.length; i++) {
    const item = products[i];
    content += `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.description}</td>
                            <td>${item.price}</td>
                            <td><img class="img-sp" src="${item.image}" alt="lỗi ảnh"></td>
                            <td>
                                <button onclick='onEdit(${item.id})' type="button" class="btn btn-primary">edit</button>
                                <button onclick='onRemove(${item.id})' type="button" class="btn btn-danger">remove</button>
                            </td>
                        </tr>
                    `;
  }
  document.getElementById("tableBody").innerHTML = content;
}
renderTable(store.getProduct());

document.getElementById("frmProductCreate").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").value;
  let kt1 = false;
  let kt2 = false;
  let kt3 = false;
  let kt4 = false;
  let kt5 = false;
  if (id === "") {
    document.getElementById("id").classList.add("border-red");
    kt1 = false;
  } else {
    document.getElementById("id").classList.remove("border-red");
    kt1 = true;
  }
  if (name === "") {
    document.getElementById("name").classList.add("border-red");
    kt2 = false;
  } else {
    document.getElementById("name").classList.remove("border-red");
    kt2 = true;
  }
  if (price === "") {
    document.getElementById("price").classList.add("border-red");
    kt3 = false;
  } else {
    document.getElementById("price").classList.remove("border-red");
    kt3 = true;
  }
  if (description === "") {
    document.getElementById("description").classList.add("border-red");
    kt4 = false;
  } else {
    document.getElementById("description").classList.remove("border-red");
    kt4 = true;
  }
  if (image === "") {
    document.getElementById("image").classList.add("border-red");
    kt5 = false;
  } else {
    document.getElementById("image").classList.remove("border-red");
    kt5 = true;
  }

  if (kt1 == true && kt2 == true && kt3 == true && kt4 == true && kt5 == true) {
    const product = new Product(id, name, price, description, image);
    const isCreate = store.add(product);
    if (isCreate) {
      document.querySelector(".notification").innerHTML = `Thêm thành công`;
      document.getElementById("id").classList.remove("border-red");
      store.save();
      renderTable(store.getProduct());
    } else {
      document.querySelector(".notification").innerHTML = `Trùng ID`;
      document.getElementById("id").classList.add("border-red");
    }
  } else {
    document.querySelector(
      ".notification"
    ).innerHTML = `Vui lòng điền đầy đủ thông tin`;
  }
});

function onRemove(id) {
  const isRemove = store.remove(id);
  if (isRemove) {
    // alert("Xóa thành công");
    store.save();
    renderTable(store.getProduct());
  } else {
    // alert("Xóa thất bại");
  }
}

function onEdit(id) {
  var myModal = new bootstrap.Modal(
    document.getElementById("modalProductEdit"),
    {
      keyboard: false,
    }
  );

  // get detail
  const product = store.getById(id);
  document.getElementById("prodId").value = product.id;
  document.getElementById("prodName").value = product.name;
  document.getElementById("prodPrice").value = product.price;
  document.getElementById("prodDescription").value = product.description;
  document.getElementById("prodImage").value = product.image;
  myModal.show();
}

document
  .getElementById("frmProductEdit")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const id = document.getElementById("prodId").value;
    const name = document.getElementById("prodName").value;
    const price = document.getElementById("prodPrice").value;
    const description = document.getElementById("prodDescription").value;
    const image = document.getElementById("prodImage").value;
    let kt1 = false;
    let kt2 = false;
    let kt3 = false;
    let kt4 = false;
    let kt5 = false;
    if (id === "") {
      document.getElementById("prodId").classList.add("border-red");
      kt1 = false;
    } else {
      document.getElementById("prodId").classList.remove("border-red");
      kt1 = true;
    }
    if (name === "") {
      document.getElementById("prodName").classList.add("border-red");
      kt2 = false;
    } else {
      document.getElementById("prodName").classList.remove("border-red");
      kt2 = true;
    }
    if (price === "") {
      document.getElementById("prodPrice").classList.add("border-red");
      kt3 = false;
    } else {
      document.getElementById("prodPrice").classList.remove("border-red");
      kt3 = true;
    }
    if (description === "") {
      document.getElementById("prodDescription").classList.add("border-red");
      kt4 = false;
    } else {
      document.getElementById("prodDescription").classList.remove("border-red");
      kt4 = true;
    }
    if (image === "") {
      document.getElementById("prodImage").classList.add("border-red");
      kt5 = false;
    } else {
      document.getElementById("prodImage").classList.remove("border-red");
      kt5 = true;
    }

    if (
      kt1 == true &&
      kt2 == true &&
      kt3 == true &&
      kt4 == true &&
      kt5 == true
    ) {
      const product = new Product(id, name, price, description, image);
      const isUpdate = store.update(product);
      if (isUpdate) {
        document.querySelector(
          ".notification-2"
        ).innerHTML = `Sửa đổi thành công`;
        store.save();
        renderTable(store.getProduct());
      } else {
        document.querySelector(
          ".notification-2"
        ).innerHTML = `Sửa đổi thất bại`;
      }
    } else {
      document.querySelector(
        ".notification-2"
      ).innerHTML = `Vui lòng điền đầy đủ thông tin`;
    }
  });
