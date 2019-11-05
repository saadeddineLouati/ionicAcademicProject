
const my_btn1 = document.querySelector("#mybtn1");
const my_btn2 = document.querySelector("#mybtn2");
const TotSalaries = document.querySelector("#TotSalaries");
const TotEmployees = document.querySelector("#TotEmployees");
const controller = document.querySelector("ion-alert-controller");
const list = document.querySelector("#List");
const emp = [
  { id: "0", name: "saad", age: "29", salaire: "10000" },
  { id: "1", name: "chaima", age: "27", salaire: "10000" }
];

function FetchAll() {
  document.getElementById("TotEmployees").innerHTML = emp.length;
  
    var TotSalaries = 0;
    for (i = 0; i < emp.length; i++) {
      TotSalaries = Number(emp[i].salaire) + TotSalaries;
    }
    document.getElementById("TotSalaries").innerHTML = TotSalaries;
 


  var data = "";
  if (emp.length > 0) {
    for (i = 0; i < emp.length; i++) {
      data += "<ion-item>";
      data += "<ion-label>" + emp[i].name + "</ion-label> ";
      data +=
        '<ion-icon name="hammer" slot="end" color="dark"  onclick="tUpdate(' +
        i +
        ')"></ion-icon> ';
      data +=
        '<ion-icon name="trash" slot="end" color="dark" onclick="tDelete(' +
        i +
        ') "></ion-icon> </ion-item>';
    }
  }

  return (list.innerHTML = data);
}

FetchAll();

my_btn2.addEventListener("click", () => {
  console.log("hello");

  document.getElementById("FirstName").value = "";
  document.getElementById("Age").value = "";
  document.getElementById("Salary").value = "";
});

my_btn1.addEventListener("click", () => {
  console.log("hello");

  controller
    .create({
      header: "Confirmation",
      message: "Are you sure you want to add this new employee?",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            controller.dismiss(true);
            FirstName = document.getElementById("FirstName");
            Age = document.getElementById("Age");
            Salary = document.getElementById("Salary");
            // Get the value
            var name = FirstName.value;
            var age = Age.value;
            var Salaire = Salary.value;
            var myObj = {
              name: name,
              age: Age,
              salaire: Salaire
            };
            if (name) {
              emp.push(myObj);

              FirstName.value = "";
              Age.value = "";
              Salary.value = "";
              FetchAll();
          
            }
          }
        },
        {
          text: "No",
          handler: () => {
            controller.dismiss(true);
            return false;
          }
        }
      ]
    })
    .then(alert => {
      alert.present();
    });
});


customElements.define(
  "modal-content",
  class ModalContent extends HTMLElement {
    connectedCallback() {
      const modalElement = document.querySelector('ion-modal');
      console.log(modalElement.componentProps.salaire);
      var data='   <ion-header translucent> \
      <ion-toolbar> \
          <ion-title>Update employee</ion-title> \
          <ion-buttons slot="end"> \
          <ion-button onclick="dismissModal()">Close</ion-button> \
        </ion-buttons> \
      </ion-toolbar></ion-header> \
      <ion-content fullscreen> \
      <ion-list lines="full" class="ion-no-margin ion-no-padding"> \
      <ion-item> \
          <ion-label position="floating">Name</ion-label> \
          <ion-input id="FirstNameE"  value='+modalElement.componentProps.name+' ></ion-input> \
      </ion-item> \
      <ion-item> \
          <ion-label position="floating">Age</ion-label> \
          <ion-input id="AgeE" value='+modalElement.componentProps.age+'></ion-input> \
      </ion-item> \
      <ion-item> \
          <ion-label position="floating">Salary</ion-label> \
          <ion-input id="SalaryE" value='+modalElement.componentProps.salaire+'></ion-input> \
      </ion-item> \
      </ion-list> \
      </ion-content fullscreen> \
      <ion-grid> \
          <div class="ion-padding"> \
             <ion-button  expand="block" type="submit"  onclick="Update('+modalElement.componentProps.item+')"class="ion-no-margin" color="primary">Back</ion-button> \
          </div> \
      </ion-grid> ' ;
      this.innerHTML = data ;
 

    ;
    }
  }
);

let currentModal = null;
const controllers = document.querySelector("ion-modal-controller");

function tUpdate(i) {
  controllers
    .create({
      component: "modal-content"
    })
    .then(modal => {
      modal.present();
      modal.componentProps = {
        'item':i,
        'name':emp[i].name,
        'age':emp[i].age,
        'salaire':emp[i].salaire,
      };
      currentModal = modal;
    });
}

function dismissModal() {
  if (currentModal) {
    currentModal.dismiss().then(() => { currentModal = null; });
  }
} 

function Update(i) {
  FirstName = document.getElementById("FirstNameE");
  Age = document.getElementById("AgeE");
  Salary = document.getElementById("SalaryE");
  var name = FirstName.value;
  var Age = Age.value;
  var Salaire = Salary.value;
  var myObj = {
    name: name,
    age: Age,
    salaire: Salaire
  };
  if (name) {
    emp.splice(i, 1, myObj);


    FirstName.value = "";
    Age.value = "";
    Salary.value = "";
    dismissModal();
    FetchAll();
  }

  console.log(emp);

}

function tDelete(i) {
  emp.splice(i, 1);   
  FetchAll();
}

