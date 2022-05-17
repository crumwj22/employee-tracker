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

const addEmployee = async () => {
  const allManagers = await db.findEmployees();
  const managerList = allManagers.map((manager) => {
    return {
      name: `${manager.first_name} ${manager.last_name} `,
      value: manager.id,
    };
    // console.log(managerList);
  });
  const allRoles = await db.findRoles();
  const roleList = allRoles.map((role) => {
    return {
      name: `${role.name}`,
      value: role.id,
    };
  });

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
        name: "roleId",
        choices: roleList,
      },
      {
        type: "list",
        message: "Who will be their manager?",
        name: "managerId",
        choices: managerList,
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
