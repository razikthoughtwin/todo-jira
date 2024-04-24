let title = document.querySelector(".title");
let description = document.querySelector(".description");
let saveBtn = document.querySelector(".saveBtn");
let todocard = document.querySelector(".todoCard");
let todocardbtn = document.querySelector(".todoCardBtn");
let inprogresscard = document.querySelector(".inProgressCard");
let completedcard = document.querySelector(".completedcard");
let message = document.querySelector(".msg");

let todoflag = false;
let inprogflag = false;
let comflag = false;

// Todo's component arry

let userArray = [];

let islocalpresent = localStorage.getItem("users");
if (islocalpresent !== null) {
  userArray = JSON.parse(islocalpresent);
  console.log(userArray);
  renderlist();
}

// inprogress component array

let newarr = [];

let inprogresslocal = localStorage.getItem("inprogress");
if (inprogresslocal !== null) {
  newarr = JSON.parse(inprogresslocal);
  console.log(newarr);
  renderinprogresslist();
}

// completed component array

let comarr = [];

let completedlocal = localStorage.getItem("completed");
if (completedlocal !== null) {
  comarr = JSON.parse(completedlocal);
  console.log(comarr);
  rendercompletedlist();
}

// Add todo's functionality

const saveButton = () => {
  if (title.value == "" || description.value == "") {
    message.innerHTML = "Please fillout the todo's";
    return;
  }

  todocard.innerHTML = "";
  let userObj = {
    // id: Math.floor(Math.random() * 100),
    id: crypto.randomUUID(),
    title: title.value,
    description: description.value,
    date: new Date(),
  };
  console.log(userArray);
  todocard.className = "border border-dark";
  userArray.push(userObj);
  localStorage.setItem("users", JSON.stringify(userArray));
  renderlist();
  title.value = "";
  description.value = "";
};

// show todo's on todo card

function renderlist() {
  for (let i = 0; i < userArray.length; i++) {
    todoflag = true;
    console.log(todoflag);
    var id = userArray[i].id;
    todocard.innerHTML += `<ul class="border border-dark" onClick=\'moveId("${id}")\'>
        <li>${userArray[i].title}</li>
        <li>${userArray[i].description}</li>
        <li>${userArray[i].date}</li>
        
        </ul>
        `;
        // <button class="btn btn-primary todoCardBtn" onClick=\'moveId("${id}")\'>Next</button>
  }
}

// move todo's data to inprogress card

function moveId(id) {
  console.log(todoflag);
  console.log("id ---> : ", id);
  // alert(id);

  let inProgressArr = userArray
    .filter(function (x) {
      return x.id == id;
    })
    .map(function (userArray) {
      return userArray;
    });

  inProgressArr.forEach(function (item) {
    newarr.push(item);
    localStorage.setItem("inprogress", JSON.stringify(newarr));
  });
  renderinprogresslist();
  deltodo(id);
}

console.log(newarr);

// show data in inprogress component

function renderinprogresslist(id) {
  inprogresscard.innerHTML = "";

  for (let i = 0; i < newarr.length; i++) {
    inprogflag = true;
    console.log(inprogflag);
    var id = newarr[i].id;
    inprogresscard.innerHTML += `<ul class="border border-dark" onClick=\'completed("${id}")\'>
             <li>${newarr[i].title}</li>
             <li>${newarr[i].description}</li>
             <li>${newarr[i].date}</li>
             <button  class="btn btn-primary" onClick=\'inprogressprev("${id}")\'>←</button>
             `;
            //  <button  class="btn btn-primary" onClick=\'completed("${id}")\'>Next</button>

  }
}

// move inprogrss data to completed card

function completed(id) {
  console.log("id ---> : ", id);
  // alert(id);

  let completedArr = newarr
    .filter(function (x) {
      return x.id === id;
    })
    .map(function (newarr) {
      return newarr;
    });

  completedArr.forEach(function (item) {
    comarr.push(item);
    localStorage.setItem("completed", JSON.stringify(comarr));
  });
  rendercompletedlist();
  delinprogress(id);
}

// show completed data

function rendercompletedlist() {
  completedcard.innerHTML = "";
  for (let i = 0; i < comarr.length; i++) {
    var id = comarr[i].id;
    completedcard.innerHTML += `<ul class="border border-dark">
             <li>${comarr[i].title}</li>
             <li>${comarr[i].description}</li>
             <li>${comarr[i].date}</li>
             `;
            //  <button  class="btn btn-primary" onClick=\'completedprev("${id}")\'>Previous</button>
  }
}

// inprogress prev button functionality

function inprogressprev(id) {
  console.log("id ---> : ", id);
  // alert(id);

  let todoArr = newarr
    .filter(function (x) {
      return x.id === id;
    })
    .map(function (newarr) {
      return newarr;
    });

  todoArr.forEach(function (item) {
    userArray.push(item);
    localStorage.setItem("users", JSON.stringify(userArray));
  });
  rendercompletedlist();
  delinprogressprev(id);
}

// completed prev button functionality

function completedprev(id) {
  console.log("id ---> : ", id);
  // alert(id);

  let todoArr = comarr
    .filter(function (x) {
      return x.id === id;
    })
    .map(function (comarr) {
      return comarr;
    });

  todoArr.forEach(function (item) {
    newarr.push(item);
    localStorage.setItem("inprogress", JSON.stringify(newarr));
  });
  // rendercompletedlist();
  delcompletedprev(id);
}

// functionality to remove data from userArray[] if we click on the todo's card next button

function deltodo(id) {
  console.log("id ---> : ", id);
  // alert(id);

  let data = JSON.parse(localStorage.getItem("users"));

  // console.log(data);

  const index = data
    .filter(function (x) {
      return x.id !== id;
    })
    .map(function (arr) {
      return arr;
    });

  //  data.toSpliced(index, 1);
  // data.splice(index, 1);

  localStorage.setItem("users", JSON.stringify(index));

  location.reload();
}

// functionality to remove data from newarr[] if we click on the inprogress card next button

function delinprogress(id) {
  console.log("id ---> : ", id);
  // alert(id);

  let data = JSON.parse(localStorage.getItem("inprogress"));

  // console.log(data);

  const index = data
    .filter(function (x) {
      return x.id !== id;
    })
    .map(function (arr) {
      return arr;
    });

  // data.splice(index, 1);

  localStorage.setItem("inprogress", JSON.stringify(index));
  location.reload();
}

// functionality to remove data from newarr[] and push on to the userArray[] if we click on the inprogress card previous button

function delinprogressprev(id) {
  console.log("id ---> : ", id);
  // alert(id);

  let data = JSON.parse(localStorage.getItem("inprogress"));

  // console.log(data);

  const index = data
    .filter(function (x) {
      return x.id !== id;
    })
    .map(function (arr) {
      return arr;
    });

  // data.splice(index, 1);

  localStorage.setItem("inprogress", JSON.stringify(index));
  location.reload();
}

// functionality to remove data from comarr[] and push on to the newarr[] if we click on the completed card previous button

function delcompletedprev(id) {
  console.log("id ---> : ", id);
  // alert(id);

  let data = JSON.parse(localStorage.getItem("completed"));

  // console.log(data);

  const index = data
    .filter(function (x) {
      return x.id !== id;
    })
    .map(function (arr) {
      return arr;
    });

  // data.splice(index, 1);

  localStorage.setItem("completed", JSON.stringify(index));
  location.reload();
}

function deleteitems(id) {
  if (todoflag === true) {
    let data = JSON.parse(localStorage.getItem("users"));
    alert("todoflag" + todoflag);
    alert(id);
    let rmitem = data
      .filter(function (x) {
        return x.id !== id;
      })
      .map(function (arr) {
        return arr;
      });

    console.log(rmitem);

    localStorage.setItem("users", JSON.stringify(rmitem));
    location.reload();
  } else if (inprogflag === true) {
    alert("inprogflag" + inprogflag);

    let data = JSON.parse(localStorage.getItem("inprogress"));
    alert(inprogflag);
    alert(id);
    let rmitem = data
      .filter(function (x) {
        return x.id !== id;
      })
      .map(function (arr) {
        return arr;
      });

    console.log(rmitem);

    localStorage.setItem("inprogress", JSON.stringify(rmitem));
    location.reload();
  }
}
