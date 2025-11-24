let employees = [];
let zoneTargeted = null;

// Render helper: render list of employee cards into containerId
function renderInto(containerId, list){
  const room = document.getElementById(containerId);
  if(!room) return;
  // use AssignEmployees for the assign modal list, otherwise default to renderEmployees
  if (containerId === 'cardlistassign') {
    room.innerHTML = AssignEmployees(list);
  } else {
    room.innerHTML = renderEmployees(list);
  }
}

function assignEmployeeToZone(zoneId, employeeEmail){
  employees = JSON.parse(localStorage.getItem("employees")) || employees;
  const index = employees.findIndex(e => e.email === employeeEmail);
  if(index === -1) return false;
  employees[index].room = zoneId;
  localStorage.setItem('employees', JSON.stringify(employees));
  renderPage();
  renderZone(zoneId);
  return true;
}

// Render occupants of a zone (container id is same as zoneId)
function renderZone(zoneId){
  const occupants = employees.filter(e => e.room === zoneId);
  renderInto(zoneId, occupants);
}

const renderPage = () => {
  employees = JSON.parse(localStorage.getItem("employees")) || [];

  // show only unassigned employees in the sidebar
  const unassigned = employees.filter(e => !e.room);
  renderInto('cardlist', unassigned);
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
    room: null,
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
          <div class="card-buttons d-flex flex-column ms-auto p-1">
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
  zoneTargeted = 'reception';
  const receptionemployees = employees.filter(
    (emp) =>
      (emp.role === "receptionist" ||
      emp.role === "manager" ||
      emp.role === "nettoyage" ||
      emp.role === "autres") && !emp.room
  );
  renderInto('cardlistassign', receptionemployees);
});

document
  .getElementById("assignBtnconferenceroom")    
  .addEventListener("click", () => {
    zoneTargeted = 'conferenceroom';
    const conferenceroomemployees = employees.filter(
      (emp) => (emp.role === "manager" || emp.role === "receptionist" || emp.role === "autres") && !emp.room
    );
    renderInto('cardlistassign', conferenceroomemployees);
  });

document.getElementById("assignBtnsecurity").addEventListener("click", () => {
  zoneTargeted = 'security';
  const securityemployees = employees.filter(
    (emp) =>
      (emp.role === "security" || emp.role === "manager" || emp.role === "nettoyage") && !emp.room
  );
  renderInto('cardlistassign', securityemployees);
});

document
  .getElementById("assignBtnserversroom")
  .addEventListener("click", () => {
    zoneTargeted = 'serversroom';
    const serversemployees = employees.filter(
      (emp) => (emp.role === "technicien" || emp.role === "manager" || emp.role === "nettoyage") && !emp.room
    );
    renderInto('cardlistassign', serversemployees);
  });

document.getElementById("assignBtnvault").addEventListener("click", () => {
  zoneTargeted = 'vault';
  const vaultemployees = employees.filter(
    (emp) => (emp.role === "manager" || emp.role === "security") && !emp.room
  );
  renderInto('cardlistassign', vaultemployees);
});
document.getElementById("assignBtnstaffroom").addEventListener("click", () => {
  zoneTargeted = 'staffroom';
  const staffroomemployees = employees.filter(emp => !emp.room);
  renderInto('cardlistassign', staffroomemployees);
});

document.addEventListener("click", (e) => {
  const viewBtn = e.target.closest(".view");
  if (!viewBtn) return;
  const name = viewBtn.getAttribute("data-name");
  const emp = employees.find((cartename) => cartename.name === name);
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
function AssignEmployees(employees) {
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
          <div class="card-buttons d-flex flex-column ms-auto p-2">
            <button class="assign-btn btn btn-link text-danger ms-auto p-1 text-decoration-none" data-email="${emp.email}">
              Ajouter
            </button>
          </div>
        </div>`;
  });
  return cards;
  
}
// delegated handler for assign buttons inside the assign modal
document.getElementById('cardlistassign').addEventListener('click', (e) => {
  const btn = e.target.closest('.assign-btn');
  if (!btn) return;
  const email = btn.dataset.email;
  if (!zoneTargeted) return;
  const ok = assignEmployeeToZone(zoneTargeted, email);
  if (ok) {
    // hide the assign modal
    const modalEl = document.getElementById('exampleModal2');
    if (modalEl && window.bootstrap && typeof window.bootstrap.Modal === 'function') {
      const modal = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);
      modal.hide();
    }
  }
});

renderPage();






































  
  
  

// document.getElementById('ajouterassigne').addEventListener('click ', () => {
// let conferencecards = document.createElement('div')

// conferencecards.innerHTML += renderEmployees(employees)
// console.log('conferencecards')







// 


renderPage();
