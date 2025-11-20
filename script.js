let employees = [];


const renderPage = () => {
  employees = JSON.parse(localStorage.getItem("employees")) || [];

  document.getElementById("cardlist").innerHTML = renderEmployees(employees);
}

renderPage();


function saveEmployeeToLocalStorage() {
  staff = {
    name: document.getElementById("nameModalAjouter").value,
    role: document.getElementById("roleModalAjouter").value,
    email: document.getElementById("emailModalAjouter").value,
    phone: document.getElementById("phoneModalAjouter").value,
    photoURL: document.getElementById("photoModalAjouter").value,
  };
  employees.push(staff);
  localStorage.setItem("employees", JSON.stringify(employees));
  console.log(employees);
}
document.getElementById("savechangesAjouter").addEventListener("click", () => {
  saveEmployeeToLocalStorage();
  renderEmployees();
});

document.getElementById("ajouterexp").addEventListener("click", () => {
  document.getElementById("dynamiqueForm").innerHTML += `
              <div class="form-group p-3 mb-2 bg-secondary text-white rounded-2">
                <label for="entreprise form-label">Entreprise</label>
                <input type="text" class="form-control" placeholder="Entrez le nom d'entreprise">
                <label for="role form-label">Role</label>
                <input type="text" class="form-control" placeholder="Entrez le role">
                <label for="from form-label">From :</label>
                <input type="date" class="form-control">
                <label for="To form-label">To :</label>
                <input type="date" class="form-control">
              </div>
             `;
});
if (employees.length === 0) {
  document.getElementById("cardlist").innerHTML = `<p class="text-center text-secondary">Aucun employé n'a été ajouté encore.</p>`;
}
function renderEmployees(employees) {
  let cards = "";      
  employees.forEach((emp) => {
    
    cards += `
        <div
        class="card-employee d-flex align-items-center bg-light-custom p-2 rounded mb-2 profile-info"
        data-bs-toggle="modal"
          data-bs-target="#exampleModal3"
        >
        <img src="${emp.photoURL}" alt="..." class="rounded-circle me-2" />
        <div>
          <p class="card-name mb-0 small">${emp.name}</p>
          <small class="text-muted-light text-secondary">${emp.role}</small>
        </div>
        <div class="card-buttons d-flex flex-column ms-auto">
          <button class="view btn btn-link text-primary ms-auto p-1 mb-1 text-decoration-none data-bs-toggle="modal" data-bs-target="#exampleModal3"">
            voir profil
          </button>
          <hr class="m-1 p-0 w-100"/>
        <button class="edit btn btn-link text-danger ms-auto p-1 text-decoration-none">
          modifier
        </button>
        </div></div>`;
  });
  return cards;
}

let receptionemployees = employees.filter(emp => emp.role === "receptionist" || emp.role === "manager");

document.getElementById('assignBtnreception').addEventListener('click', () => {
  let assignemployees = document.getElementById("cardlistassign");
  assignemployees.innerHTML = renderEmployees(receptionemployees);
});

function profileEmployee(card) {
  let emp = employees.find(emp => emp.name === card.querySelector(".card-name").innerText);
  let profilmodal = document.getElementById("employeeModal3");
  profilmodal.querySelector(".modal-header").innerHTML = `
      <h5 class="modal-title" id="exampleModalLabel3">${emp.name}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  `;
  profilmodal.querySelector(".modal-body").innerHTML = `
    <div class="text-center">
      <img src="${emp.photoURL}" alt="Profile Picture" class="rounded-circle mb-3" width="150" height="150"/>
      <h5>${emp.name}</h5>
      <p class="text-muted">${emp.role}</p>
    </div>
    <div class="modal-body">
      <div class="d-flex flex-column align-items-center">
        <img src="${emp.photoURL}" alt="Profile Picture" class="rounded-circle mb-3" width="150" height="150"/>
        <h5>${emp.role}</h5>
        <p>Email: ${emp.email}</p>
        <p>Phone: ${emp.phone}</p>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  `;
}






