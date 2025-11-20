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

function renderEmployees(employees) {
  let cards = "";      
  employees.forEach((emp) => {
    cards += `
        <div
        class="card-employee d-flex align-items-center bg-light-custom p-2 rounded mb-2 profile-info"
        data-bs-toggle="modal"
        data-bs-target="#employeeModal"
        >
        <img src="${emp.photoURL}" alt="..." class="rounded-circle me-2" />
        <div>
          <p class="mb-0 small">${emp.name}</p>
          <small class="text-muted-light secondary">${emp.role}</small>
        </div>
        <div class="card-buttons d-flex flex-column ms-auto">
          <button class="view btn btn-link text-primary ms-auto p-1 mb-1 text-decoration-none">
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


document.getElementById('assignBtn1').addEventListener('click', () => {
  let assignemployees = document.getElementById("cardlistassign");
  
  // renderEmployees();
  assignemployees.innerHTML += renderEmployees(employees);
})



