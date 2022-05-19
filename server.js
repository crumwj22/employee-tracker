const inquirer = require("inquirer");
const db = require("./db");
require("console.table");
const connection = require("./db/connection.js");

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
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          // addRole();
          break;
        case "Update Employee Role":
          // updateEmployeeRole();
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

  const rows = allManagers[0];

  const filteredManagers = rows.filter(function (employee) {
    if (employee.manager === null) {
      return employee;
    }
  });
  // console.log(filteredManagers);
  const managerList = filteredManagers.map((manager) => {
    return {
      name: `${manager.first_name} ${manager.last_name} `,
      value: manager.id,
      // console.log(managerList);
    };
  });
  console.log(managerList);
  const allRoles = await db.findRoles();
  const roles = allRoles[0];
  // console.log(roles);
  // console.log(allRoles);
  const roleList = roles.map((role) => {
    return {
      name: role.title,
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
    .then((data) => {
      console.log(data);
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: data.firstname,
          last_name: data.lastname,
          manager_id: data.managerId,
          role_id: data.roleId,
        },
        function (err) {
          if (err) throw err;
          console.table(data);
          createTeam();
        }
      );
    });
};
const addDepartment = async () => {
  const allDepartments = await db.findDepartments();
  const departmentList = allDepartments.map((department) => {
    return {
      name: `${department.name}`,
      value: department.id,
    };
  });
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the name of department you would like to add",
        name: "departmentName",
        choices: departmentList,
      },
    ])
    .then(([data]) => {
      return this.connection.promise().query(
        "INSERT INTO department SET",
        {
          department_id: data.departmentName,
        },
        function (err) {
          if (err) throw err;
          console.table(data);
          createTeam();
        }
      );
    });
  // const addRole = async () => {
  //   const allRoles = await db.findRoles();
  //   const roleList = allRoles.map((role) => {
  //     return {
  //       name: `${role.name}`,
  //       value: role.id,
  //     };
  //   });
  //   inquirer
  //     .prompt([
  //       {
  //         type: "input",
  //         message: "Enter name of the role you would like to add",
  //         name: "roleName",
  //         choices: roleList,
  //       },
  //     ])
  //     .then(([data]) => {
  //       return this.connection.promise().query(
  //         "INSERT INTO role SET",
  //         {
  //           role_id: data.roleName,

  //         },
  //         function (err) {
  //           if (err) throw err;
  //           console.table(data);
  //           createTeam();
  //         }
  //       );
  //     });
  //
  //     const updateEmployeeRole = async () => {
  //       const allRoles = await db.findRoles();
  //       const roleList = allRoles.map((role) => {
  //       return {
  //         name: `${role.name}`,
  //         value: role.id,
  //         };
  //       });
  //       inquirer
  //         .prompt([
  //           {
  //             type: "list",
  //             message: "What will their role be?",
  //             name: "roleId",
  //             choices: roleList,
  //           },
  //         ])
  //         .then(([data]) => {
  //           return this.connection.promise().query(
  //             "INSERT INTO employee SET",
  //             {
  //               role_id: data.roleName,

  //             },
  //             function (err) {
  //               if (err) throw err;
  //               console.table(data);
  //               createTeam();
  //             }
  //           );
  //         });
};

welcome();
