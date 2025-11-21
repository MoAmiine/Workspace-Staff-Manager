let employees = [];

const renderPage = () => {
  employees = JSON.parse(localStorage.getItem("employees")) || [];

  document.getElementById("cardlist").innerHTML = renderEmployees(employees);
};

renderPage();

function saveEmployeeToLocalStorage() {
  const staff = {
    name: document.getElementById("nameModalAjouter").value,
    role: document.getElementById("roleModalAjouter").value,
    email: document.getElementById("emailModalAjouter").value,
    phone: document.getElementById("phoneModalAjouter").value,
    photoURL: "/assets/images/pfp.jpg",
    experiences: [],
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
  document.getElementById(
    "cardlist"
  ).innerHTML = `<p class="text-center text-secondary">Aucun employé n'a été ajouté encore.</p>`;
}
function renderEmployees(employees) {
  if (!employees || employees.length === 0) {
    return `<p class="text-center text-secondary">Aucun employé n'a été ajouté encore.</p>`;
  }

  let cards = "";
  employees.forEach((emp) => {
    cards += `
        <div class="card-employee d-flex align-items-center bg-light-custom p-2 rounded mb-2 profile-info">
          <img src="${emp.photoURL}" alt="..." class="rounded-circle me-2 w-25" />
          <div>
            <p class="card-name mb-0 small">${emp.name}</p>
            <small class="text-muted-light text-secondary">${emp.role}</small>
          </div>
          <div class="card-buttons d-flex flex-column ms-auto">
            <button class="view btn btn-link text-primary ms-auto p-1 mb-1 text-decoration-none" data-name="${emp.name}" data-bs-toggle="modal" data-bs-target="#exampleModal3">
              voir profil
            </button>
            <hr class="m-1 p-0 w-100"/>
            <button class="edit btn btn-link text-danger ms-auto p-1 text-decoration-none" data-bs-toggle="modal" data-bs-target="#exampleModalModifier">
              modifier
            </button>
          </div>
        </div>`;
  });
  return cards;
}

document.getElementById("assignBtnreception").addEventListener("click", () => {
  let assignemployees = document.getElementById("cardlistassign");
  const receptionemployees = employees.filter(
    (emp) =>
      emp.role === "receptionist" ||
      emp.role === "manager" ||
      emp.role === "nettoyage" ||
      emp.role === "autres"
  );
  assignemployees.innerHTML = renderEmployees(receptionemployees);
});

document
  .getElementById("assignBtnconferenceroom")
  .addEventListener("click", () => {
    let assignemployees = document.getElementById("cardlistassign");
    const conferenceroomemployees = employees.filter(
      (emp) => emp.role === "manager"
    );
    assignemployees.innerHTML = renderEmployees(conferenceroomemployees);
  });

document.getElementById("assignBtnsecurity").addEventListener("click", () => {
  let assignemployees = document.getElementById("cardlistassign");
  const securityemployees = employees.filter(
    (emp) =>
      emp.role === "security" ||
      emp.role === "manager" ||
      emp.role === "nettoyage"
  );
  assignemployees.innerHTML = renderEmployees(securityemployees);
});

document
  .getElementById("assignBtnserversroom")
  .addEventListener("click", () => {
    let assignemployees = document.getElementById("cardlistassign");
    const serversemployees = employees.filter(
      (emp) =>
        emp.role === "technicien" ||
        emp.role === "manager" ||
        emp.role === "nettoyage"
    );
    assignemployees.innerHTML = renderEmployees(serversemployees);
  });

document.getElementById("assignBtnvault").addEventListener("click", () => {
  let assignemployees = document.getElementById("cardlistassign");
  const vaultemployees = employees.filter(
    (emp) => emp.role === "manager" || emp.role === "security"
  );
  assignemployees.innerHTML = renderEmployees(vaultemployees);
});
document.getElementById("assignBtnstaffroom").addEventListener("click", () => {
  let assignemployees = document.getElementById("cardlistassign");
  const staffroomemployees = employees;
  assignemployees.innerHTML = renderEmployees(staffroomemployees);
});

document.addEventListener("click", (e) => {
  const viewBtn = e.target.closest(".view");
  if (!viewBtn) return;
  const name = viewBtn.getAttribute("data-name");
  const emp = employees.find((x) => x.name === name);
  const profilmodal = document.getElementById("exampleModal3");
  if (!profilmodal) return;
  profilmodal.querySelector(".modal-title").innerText = emp
    ? emp.name
    : "Profil employé";
  profilmodal.querySelector(".modal-body").innerHTML = emp
    ? `
    <div class="text-center">
      <img src="${emp.photoURL}" alt="..." class="rounded-circle mb-2" style="width:120px;height:120px;object-fit:cover;" />
    </div>
    <p><strong>Role:</strong> ${emp.role}</p>
    <p><strong>Email:</strong> ${emp.email}</p>
    <p><strong>Phone:</strong> ${emp.phone}</p>
  `
    : '<p class="text-danger">Employé introuvable</p>';
});

renderPage();
