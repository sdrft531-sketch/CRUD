let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let Ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;

console.log(title, price, taxes, Ads, discount, total, count, category, submit);
//getTotal
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +Ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "rgb(4, 91, 4)";
  } else {
    total.innerHTML = "";
    total.style.background = "#0481ff";
  }
}
//createProduct
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}
submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    Ads: Ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newpro.count < 100
  ) {
    if (mood === "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[tmp] = newpro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  } else {
    return;
  }
  //save localstorge

  localStorage.setItem("product", JSON.stringify(datapro));
  console.log(newpro);
  clearData();
  showData();
};

//clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  Ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//read
function showData() {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += ` <tr>
              <td>${i + 1}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].taxes}</td>
              <td>${datapro[i].Ads}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
              <td>${datapro[i].category}</td>
              <td><button id="update" onclick="updateData(${i})">Update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.getElementById("deleteAll");
  if (datapro.length > 0) {
    deleteAll.innerHTML = `<button onclick="deleteAll()">Delete All(${datapro.length})</button>`;
  } else {
    deleteAll.innerHTML = " ";
  }
  getTotal();
}
console.log(document.getElementById("tbody"));
showData();
//delete
function deleteData(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showData();
}
function deleteAll() {
  localStorage.clear();
  datapro.splice(0);
  showData();
}

//update
function updateData(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  Ads.value = datapro[i].Ads;
  discount.value = datapro[i].discount;
  category.value = datapro[i].category;
  count.style.display = "none";
  submit.innerHTML = "update";
  mood = "update";
  tmp = i;
  getTotal();
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search
let seaarchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id === "searchtitle") {
    seaarchMood = "title";
    search.placeholder = "Search By  Title";
  } else {
    seaarchMood = "category";
    search.placeholder = "Search By  Category";
  }
  search.focus();
  search.value = "";
  showData;
}
function searchData(value) {
  let table = "";
  if (seaarchMood === "title") {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].title.includes(value.toLowerCase())) {
        table += ` <tr>
              <td>${i}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].taxes}</td>
              <td>${datapro[i].Ads}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
              <td>${datapro[i].category}</td>
              <td><button id="update" onclick="updateData(${i})">Update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>`;
      }
    }
  } else {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].category.includes(value.toLowerCase())) {
        table += ` <tr>
              <td>${i}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].taxes}</td>
              <td>${datapro[i].Ads}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
              <td>${datapro[i].category}</td>
              <td><button id="update" onclick="updateData(${i})">Update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
//cleandata
