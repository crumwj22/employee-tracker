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
          // addEmployee();
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

// adding manager
const viewAllEmployees = () => {
  db.findEmployees()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => createTeam());
};

// adding engineer
const viewAllRoles = () => {
  db.findRoles()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => createTeam());
};

// const viewAllDepartments = () => {
//   db.findDepartments()
//     .then(([data]) => {
//       console.table(data);
//     })
//     .then(() => createTeam());
// };

welcome();
