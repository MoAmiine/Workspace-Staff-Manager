let employees = [];
let zoneTargeted = null;
let editingEmail = null;
renderPage();
function renderPage() {
  employees = JSON.parse(localStorage.getItem("employees")) || [];
  const unassigned = employees.filter(e => !e.room); {
    renderInto('cardlist', unassigned);
    renderZone('reception');
    renderZone('conferenceroom');
    renderZone('securityroom');
    renderZone('serversroom');
    renderZone('vault');
    renderZone('staffroom');

  }
}


function renderInto(containerId, list) {
  const room = document.getElementById(containerId);
  if (!room) return;
  if (containerId === 'cardlistassign') {
    room.innerHTML = AssignEmployees(list);
  } else {
    room.innerHTML = renderEmployees(list);
  }
}

function assignEmployeeToZone(zoneId, employeeEmail) {
  employees = JSON.parse(localStorage.getItem("employees")) || employees;
  const index = employees.findIndex(e => e.email === employeeEmail);
  employees[index].room = zoneId;
  localStorage.setItem('employees', JSON.stringify(employees));
  console.log('hello')
  renderPage();
  renderZone(zoneId);
  return true;
}




function renderZoneCards(occupants, zoneId) {
  let cardZoneAssigned = '';
  occupants.forEach(emp => {
    cardZoneAssigned += `
      <div class="zone-card d-flex align-items-center bg-light-custom p-1 rounded mb-1 bg-light">
        <img src="${emp.photoURL}" alt="" class="rounded-circle me-2" style="width:36px;height:36px;object-fit:cover;" />
        <div>
          <p class="mb-0 small">${emp.name}</p>
          <small class="text-muted">${emp.role}</small>
        </div>
        <button class="retirer-btn btn btn-sm btn-outline-danger ms-auto" data-email="${emp.email}" data-zone="${zoneId}">Retirer</button>
      </div>`;
  })

  document.querySelectorAll('.retirer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const email = e.target.getAttribute('data-email');
      const zone = e.target.getAttribute('data-zone');
      removeEmployeeFromZone(zone, email);
    });
  });
  return cardZoneAssigned;
};


function renderZone(zoneId) {
  const container = document.getElementById(zoneId);
  if (!container) return;
  let occupant = container.querySelector('.zone-occupants');
  if (!occupant) {
    occupant = document.createElement('div');
    occupant.className = 'zone-occupants mt-2';
    container.appendChild(occupant);
  }
  const assignedEmployees = employees.filter(e => e.room === zoneId);
  if (assignedEmployees.length === 0) {
    container.classList.add('zone-empty');
    occupant.innerHTML = `<p class="text-muted small">Aucun employé</p>`;
  } else {
    container.classList.remove('zone-empty');
    occupant.innerHTML = renderZoneCards(assignedEmployees, zoneId);
  }
}



renderPage();

function saveEmployeeToLocalStorage() {
  const staff = {
    name: document.getElementById("nameModalAjouter").value,
    role: document.getElementById("roleModalAjouter").value,
    email: document.getElementById("emailModalAjouter").value,
    phone: document.getElementById("phoneModalAjouter").value,
    photoURL: "/assets/images/pfp.jpg",
    room: null,
  };
  employees.push(staff);
  localStorage.setItem("employees", JSON.stringify(employees));
  console.log(employees);
  experiencesInputs = document
    .getElementById("dynamiqueForm")
    .querySelectorAll(".form-group");
  experiencesInputs.forEach((group) => {
    const experience = {
      entreprise: group.querySelector('input[placeholder="Entrez le nom d\'entreprise"]').value,
      role: group.querySelector('input[placeholder="Entrez le role"]').value,
      from: group.querySelector('input[type="date"]').value,
      to: group.querySelectorAll('input[type="date"]').value,
    };
    staff.experiences.push(experience);
  });
}
document.getElementById("savechangesAjouter").addEventListener("click", () => {
  saveEmployeeToLocalStorage();
  renderEmployees();
  renderPage();
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
            <button class="edit btn btn-link text-danger ms-auto p-1 text-decoration-none" data-email="${emp.email}" data-bs-toggle="modal" data-bs-target="#exampleModalModifier">
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
      (emp.role === "receptionist" || emp.role === "manager" || emp.role === "nettoyage" || emp.role === "autres") && !emp.room
  );
  renderInto('cardlistassign', receptionemployees);
});

document
  .getElementById("assignBtnconferenceroom")
  .addEventListener("click", () => {
    zoneTargeted = 'conferenceroom';
    const conferenceroomemployees = employees.filter(
      (emp) => (emp.role === "manager" || emp.role === "receptionist" || emp.role === "autres") 
    );
    renderInto('cardlistassign', conferenceroomemployees);
  });

document.getElementById("assignBtnsecurity").addEventListener("click", () => {
  zoneTargeted = 'securityroom';
  const securityemployees = employees.filter(
    (emp) =>
      (emp.role === "security" || emp.role === "manager" || emp.role === "nettoyage") 
  );
  renderInto('cardlistassign', securityemployees);
});

document
  .getElementById("assignBtnserversroom")
  .addEventListener("click", () => {
    zoneTargeted = 'serversroom';
    const serversemployees = employees.filter(
      (emp) => (emp.role === "technicien" || emp.role === "manager" || emp.role === "nettoyage")
    );
    renderInto('cardlistassign', serversemployees);
  });

document.getElementById("assignBtnvault").addEventListener("click", () => {
  zoneTargeted = 'vault';
  const vaultemployees = employees.filter(
    (emp) => (emp.role === "manager" || emp.role === "security") 
  );
  renderInto('cardlistassign', vaultemployees);
});
document.getElementById("assignBtnstaffroom").addEventListener("click", () => {
  zoneTargeted = 'staffroom';
  const staffroomemployees = employees.filter(emp => !emp.room);
  renderInto('cardlistassign', staffroomemployees);
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains('assign-btn')) {
    const email = e.target.getAttribute('data-email');
    assignEmployeeToZone(zoneTargeted, email);
  }
  if (e.target.classList.contains('retirer-btn')) {
    const email = e.target.getAttribute('data-email');
    const zone = e.target.getAttribute('data-zone');
    removeEmployeeFromZone(zone, email);
  }
  const viewBtn = e.target.closest(".view");
  if (!viewBtn) return;
  const name = viewBtn.getAttribute("data-name");
  const emp = employees.find((cartename) => cartename.name === name);
  const profilmodal = document.getElementById("exampleModal3");
  profilmodal.querySelector(".modal-title").innerText = emp.name;
  profilmodal.querySelector(".modal-body").innerHTML = `
    <div class="text-center">
      <img src="${emp.photoURL}" alt="..." class="rounded-circle mb-2" style="width:120px;height:120px;object-fit:cover;" />
    </div>
    <p><strong>Role:</strong> ${emp.role}</p>
    <p><strong>Email:</strong> ${emp.email}</p>
    <p><strong>Phone:</strong> ${emp.phone}</p>
  `;
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

function removeEmployeeFromZone(zoneId, employeeEmail) {
  employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.forEach(emp => {
    if (emp.email === employeeEmail) {
      emp.room = null;
    }
  });
  localStorage.setItem('employees', JSON.stringify(employees));
  renderPage();
}







renderPage();

