const inquirer = require("inquirer");
const db = require("./db");
require("console.table");

// Import and require mysql2

function welcome() {
  console.log("Welcome to the Employee Database");
  createTeam();
}

// start prompt
const createTeam = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Please select an option",
        name: "addPrompt",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
        ],
      },
    ])
    .then(function (userInput) {
      switch (userInput.addPrompt) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee":
          // updateEmployee();
          break;
        case "Add Role":
          // addRole();
          break;
        case "Add Department":
          // addDepartment();
          break;
      }
    });
};

// view employees
const viewAllEmployees = () => {
  db.findEmployees()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => createTeam());
};

// view roles
const viewAllRoles = () => {
  db.findRoles()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => createTeam());
};

// view departments
const viewAllDepartments = () => {
  db.findDepartments()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => createTeam());
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter employees first name",
        name: "firstname",
      },
      {
        type: "input",
        message: "Enter employees last name",
        name: "lastname",
      },
      {
        type: "list",
        message: "What will their role be?",
        name: "role",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
        ],
      },
      {
        type: "list",
        message: "Who will be their manager?",
        name: "manager",
        choices: [
          "John Doe, Sales Lead",
          "Ashley Rodreguiz, Lead Engineer",
          "Malia Brown, Account Manager",
          "Tom Allen, Legal Team Lead",
        ],
      },
    ])
    .then(([data]) => {
      return this.connection.promise().query(
        "INSERT INTO employee SET",
        {
          first_name: data.firstName,
          last_name: data.lastName,
          manager_id: managerId,
          role_id: roleId,
        },
        function (err) {
          if (err) throw err;
          console.table(data);
          createTeam();
        }
      );
    });
};

welcome();
