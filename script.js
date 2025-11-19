const employees = [];
function saveEmployeeToLocalStorage() {
  staff = {
    name: document.getElementById("nameModalAjouter").value,
    role: document.getElementById("roleModalAjouter").value,
    email: document.getElementById("emailModalAjouter").value,
    phone: document.getElementById("phoneModalAjouter").value,
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

function renderEmployees() {
  let employeesData = JSON.parse(localStorage.getItem("employees"));
  let card = "";
  employeesData.forEach((emp) => {
    card += `
        <div
        class="card-employee d-flex align-items-center bg-light-custom p-2 rounded mb-2 profile-info"
        data-bs-toggle="modal"
        data-bs-target="#employeeModal"
        >
        <img src="" alt="..." class="rounded-circle me-2" />
        <div>
          <p class="mb-0 small">${emp.name}</p>
          <small class="text-muted-light secondary">${emp.role}</small>
        </div>
        <button class="btn btn-link text-danger ms-auto p-1">
          <i class="bi bi-x-circle"></i>
        </button>`;
  });
  document.getElementById("cardlist").innerHTML = card;
}
