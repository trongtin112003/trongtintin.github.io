class User {
  constructor(name, username, email, password, role) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
  }
  getUsername() {
    return this.username;
  }
  getPassword() {
    return this.password;
  }
  getRole() {
    return this.role;
  }
  xuatThongTin() {
    console.log(`Name: ${this.name}`);
    console.log(`Username: ${this.username}`);
    console.log(`Password: ${this.password}`);
    console.log(`Email: ${this.email}`);
    console.log(`Role: ${this.role}`);
  }
}

class StoreUsers {
  constructor() {
    this.users = [];
  }
  addUser(user) {
    let check = false;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].getUsername() === user.getUsername()) {
        return check;
      }
    }
    if (!check) {
      this.users.push(user);
      check = true;
      return check;
    }
  }
  login(username, password) {
    let user = null;
    for (let i = 0; i < this.users.length; i++) {
      if (
        this.users[i].getUsername() === username &&
        this.users[i].getPassword() === password
      ) {
        user = this.users[i];
      }
    }
    return user;
  }
  getListUsers() {
    return this.users;
  }
  save() {
    const data = JSON.stringify(this.users);

    localStorage.setItem("users", data);
  }

  getData() {
    const data = localStorage.getItem("users");
    if (data) {
      const arrUser = JSON.parse(data);
      const listUsers = [];
      for (let i = 0; i < arrUser.length; i++) {
        const UserTemp = new User(
          arrUser[i].name,
          arrUser[i].username,
          arrUser[i].email,
          arrUser[i].password,
          arrUser[i].role
        );
        listUsers.push(UserTemp);
      }
      this.users = listUsers;
    }
  }
}

const listUsers = new StoreUsers();
listUsers.getData();
console.log(listUsers);

document.querySelector("#frmDangKy") &&
  document.querySelector("#frmDangKy").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const tenTaiKhoan = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const matKhau = document.querySelector("#password").value;
    const role = document.querySelector("#role").value;
    let test0 = true;
    let test1 = true;
    let test2 = true;
    let test3 = true;
    let test4 = true;

    if (name.length === 0) {
      document.querySelector(
        ".error-name"
      ).innerHTML = `User Name không được để trống`;
      document.querySelector("#name").classList.add("border-red");
      test0 = false;
    } else {
      document.querySelector(".error-name").innerHTML = ``;
      document.querySelector("#name").classList.remove("border-red");
      test0 = true;
    }

    if (tenTaiKhoan.length === 0) {
      document.querySelector(
        ".error-user"
      ).innerHTML = `User Name không được để trống`;
      document.querySelector("#username").classList.add("border-red");
      test1 = false;
    } else {
      document.querySelector(".error-user").innerHTML = ``;
      document.querySelector("#username").classList.remove("border-red");
      test1 = true;
    }

    if (email.length === 0) {
      document.querySelector(
        ".error-email"
      ).innerHTML = `Email không được để trống`;
      document.querySelector("#email").classList.add("border-red");
      test2 = false;
    } else if (!email.includes("@gmail.com")) {
      document.querySelector(".error-email").innerHTML = `Lỗi cuốn pháp`;
      document.querySelector("#email").classList.add("border-red");
      test2 = false;
    } else {
      document.querySelector(".error-email").innerHTML = ``;
      document.querySelector("#email").classList.remove("border-red");
      test2 = true;
    }

    if (matKhau.length == 0) {
      document.querySelector(
        ".error-password"
      ).innerHTML = `Password không được để trống`;
      document.querySelector("#password").classList.add("border-red");
      test3 = false;
    } else {
      document.querySelector(".error-password").innerHTML = ``;
      document.querySelector("#password").classList.remove("border-red");
      test3 = true;
    }

    // let roleItem = role.options[role.selectedIndex].text;
    console.log(role);
    if (role != "select role") {
      test4 = true;
      document.querySelector(".error-role").innerHTML = ``;
      document.querySelector("#role").classList.remove("border-red");
    } else {
      test4 = false;
      document.querySelector(".error-role").innerHTML = `Hãy chọn một role`;
      document.querySelector("#role").classList.add("border-red");
    }
    //
    if (
      test0 == true &&
      test1 == true &&
      test2 == true &&
      test3 == true &&
      test4 == true
    ) {
      const createUser = new User(name, tenTaiKhoan, email, matKhau, role);
      const isCheck = listUsers.addUser(createUser);
      console.log("isCheck", isCheck);
      if (isCheck) {
        listUsers.save();
        document.querySelector(".success").innerHTML = `Đăng ký thành công!`;
        setTimeout(() => {
          window.location = "dangNhap.html";
        }, 1000);
      } else {
        document.querySelector(
          ".error-user"
        ).innerHTML = `User Name đã tồn tại`;
        document.querySelector("#username").classList.add("border-red");
        test1 = false;
      }
    }
    //
  });

document.querySelector("#frmLogin") &&
  document.querySelector("#frmLogin").addEventListener("submit", function (e) {
    e.preventDefault();

    const username1 = document.querySelector("#username").value;
    const password1 = document.querySelector("#password").value;
    let test1 = true;
    let test2 = true;

    if (username1.length === 0) {
      document.querySelector(
        ".error-user"
      ).innerHTML = `User Name không được để trống`;
      document.querySelector("#username").classList.add("border-red");
      test1 = false;
    } else {
      document.querySelector(".error-user").innerHTML = ``;
      document.querySelector("#username").classList.remove("border-red");
      test1 = true;
    }

    if (password1.length == 0) {
      document.querySelector(
        ".error-password"
      ).innerHTML = `Password không được để trống`;
      document.querySelector("#password").classList.add("border-red");
      test2 = false;
    } else {
      document.querySelector(".error-password").innerHTML = ``;
      document.querySelector("#password").classList.remove("border-red");
      test2 = true;
    }

    if (!(username1 === "" || password1 === "")) {
      const isLogin = listUsers.login(username1, password1);
      console.log("login", isLogin);
      if (isLogin) {
        document.querySelector(
          ".success"
        ).innerHTML = `Đăng nhập ADMIN or USER Thành công!`;
        setTimeout(() => {
          if (isLogin.getRole() == "admin") {
            window.location = "index_admin.html";
          } else if (isLogin.getRole() == "user") {
            window.location = "index_user.html";
          }
        }, 1000);
      } else {
        document.querySelector(
          ".error-password"
        ).innerHTML = `User Name hoặc Password không đúng`;
      }
    }
  });
