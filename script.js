// Check if the departments are saved in localStorage
if (!localStorage.getItem('departments')) {
    localStorage.setItem('departments', JSON.stringify([])); // Initialize empty departments
  }
  
  const departments = JSON.parse(localStorage.getItem('departments'));
  
  const addDepartmentForm = document.getElementById('addDepartmentForm');
  const departmentNameInput = document.getElementById('departmentName');
  const addEmployeeForm = document.getElementById('addEmployeeForm');
  const employeeNameInput = document.getElementById('employeeName');
  const phone1Input = document.getElementById('phone1');
  const phone2Input = document.getElementById('phone2');
  const departmentsList = document.getElementById('departmentsList');
  const addEmployeeFormContainer = document.getElementById('addEmployeeFormContainer');
  
  // Load departments and display them
  function loadDepartments() {
    departmentsList.innerHTML = ''; // Clear existing list
    departments.forEach((department, index) => {
      const departmentDiv = document.createElement('div');
      departmentDiv.classList.add('department');
      departmentDiv.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <h4>${department.name}</h4>
          <div>
            <button class="btn btn-info btn-sm" onclick="toggleDepartment(${index})">Expand</button>
            <button class="btn btn-secondary btn-sm" onclick="showEmployeeForm(${index})">Add Employee</button>
            <button class="btn btn-danger btn-sm" onclick="removeDepartment(${index})">Delete</button>
          </div>
        </div>
        <div class="employees mt-3" id="employeesList-${index}" style="display: none;">
          <div class="mb-3">
            <input type="text" class="form-control" id="searchEmployeeInput-${index}" placeholder="Search Employee" oninput="searchEmployee(${index})">
          </div>
          ${department.employees.map((e, empIndex) => `
            <div class="employee">
              ${e.name} - <a href="tel:${e.phone1}" class="btn btn-link btn-sm">${e.phone1}</a>, 
                           <a href="tel:${e.phone2}" class="btn btn-link btn-sm">${e.phone2}</a>
              <button class="btn btn-warning btn-sm" onclick="editEmployee(${index}, ${empIndex})">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="removeEmployee(${index}, ${empIndex})">Delete</button>
            </div>
          `).join('')}
        </div>
      `;
      departmentsList.appendChild(departmentDiv);
    });
  }
  
  // Toggle visibility of department employees
  function toggleDepartment(departmentIndex) {
    const employeesList = document.getElementById(`employeesList-${departmentIndex}`);
    const displayStyle = employeesList.style.display === 'none' ? 'block' : 'none';
    employeesList.style.display = displayStyle;
  }
  
  // Show the employee form for a department
  function showEmployeeForm(departmentIndex) {
    addEmployeeFormContainer.style.display = 'block';
    addEmployeeForm.onsubmit = function(event) {
      event.preventDefault();
      addEmployee(departmentIndex);
    };
  }
  
  // Add a new department
  addDepartmentForm.onsubmit = function(event) {
    event.preventDefault();
    const newDepartment = {
      name: departmentNameInput.value,
      employees: []
    };
    departments.push(newDepartment);
    localStorage.setItem('departments', JSON.stringify(departments)); // Save to localStorage
    departmentNameInput.value = ''; // Clear input
    loadDepartments();
  };
  
  // Add an employee to a department
  function addEmployee(departmentIndex) {
    const employee = {
      name: employeeNameInput.value,
      phone1: phone1Input.value,
      phone2: phone2Input.value
    };
    departments[departmentIndex].employees.push(employee);
    localStorage.setItem('departments', JSON.stringify(departments)); // Save to localStorage
    employeeNameInput.value = '';
    phone1Input.value = '';
    phone2Input.value = '';
    loadDepartments();
  }
  
  // Search through employees in a department
  function searchEmployee(departmentIndex) {
    const searchInput = document.getElementById(`searchEmployeeInput-${departmentIndex}`).value.toLowerCase();
    const employeeList = document.getElementById(`employeesList-${departmentIndex}`);
    const employees = employeeList.getElementsByClassName('employee');
  
    for (let i = 0; i < employees.length; i++) {
      const employeeName = employees[i].textContent.toLowerCase();
      if (employeeName.includes(searchInput)) {
        employees[i].style.display = 'block';
      } else {
        employees[i].style.display = 'none';
      }
    }
  }
  
  // Remove a department
  function removeDepartment(departmentIndex) {
    departments.splice(departmentIndex, 1); // Remove the department from the array
    localStorage.setItem('departments', JSON.stringify(departments)); // Save to localStorage
    loadDepartments();
  }
  
  // Remove an employee from a department
  function removeEmployee(departmentIndex, employeeIndex) {
    departments[departmentIndex].employees.splice(employeeIndex, 1); // Remove the employee
    localStorage.setItem('departments', JSON.stringify(departments)); // Save to localStorage
    loadDepartments();
  }
  
  // Edit an employee's details
  function editEmployee(departmentIndex, employeeIndex) {
    const employee = departments[departmentIndex].employees[employeeIndex];
    const newName = prompt("Edit Employee Name:", employee.name);
    const newPhone1 = prompt("Edit Phone Number 1:", employee.phone1);
    const newPhone2 = prompt("Edit Phone Number 2:", employee.phone2);
  
    if (newName !== null && newPhone1 !== null && newPhone2 !== null) {
      employee.name = newName;
      employee.phone1 = newPhone1;
      employee.phone2 = newPhone2;
      localStorage.setItem('departments', JSON.stringify(departments)); // Save to localStorage
      loadDepartments();
    }
  }
  
  // Initially load all departments
  loadDepartments();
  