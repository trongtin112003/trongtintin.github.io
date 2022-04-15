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
  let content2 = "";
  for (let i = 0; i < products.length; i++) {
    const item = products[i];
    // content += `
    //                 <tr>
    //                     <td>${item.id}</td>
    //                     <td>${item.name}</td>
    //                     <td>${item.description}</td>
    //                     <td>${item.price}</td>
    //                     <td><img class="img-sp" src="${item.image}" alt="lỗi ảnh"></td>
    //                     <td>
    //                         <button onclick='onEdit(${item.id})' type="button" class="btn btn-primary">edit</button>
    //                         <button onclick='onRemove(${item.id})' type="button" class="btn btn-danger">remove</button>
    //                     </td>
    //                 </tr>
    //             `;
    content2 += `
      <div class="box-item t-al blur-ef img-zoom">
              <div class="img-zoom-box">
                  <a href="./product-detail.html?id=${item.id}"><img class="img-item-2" src="${item.image}" alt="lỗi ảnh"></a>
              </div>
              <div class="pdg-2">
                  <a class="text-heading tx-14" href="./product-detail.html?id=${item.id}">${item.name}</a>
                  <p class="tx-14" href="./product-detail.html?id=${item.id}">${item.description}</p>
                  <div class="t-al pdg-min">
                      <p>${item.price} VND</p>
                      <p class="still-item"></i>Đã bán: 1000+</p>
                  </div>
              </div>
          </div>
      `;
  }
  // document.getElementById("tableBody").innerHTML = content;
  document.getElementById("container-item").innerHTML = content2;
}
renderTable(store.getProduct());
