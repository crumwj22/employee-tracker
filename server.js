const express = require("express");
const inquirer = require("inquirer");
const fs = require("fs");
// Import and require mysql2
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password
    password: "",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

// Create an employee
// team profiles
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

const teamArray = [];

const createTeam = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "what type of employee would you like to add to your team?",
        name: "addEmployeePrompt",
        choices: [
          "Manager",
          "Engineer",
          "Intern",
          "No more team members are needed.",
        ],
      },
    ])
    .then(function (userInput) {
      switch (userInput.addEmployeePrompt) {
        case "Manager":
          addManager();
          break;
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
        // case "No more team members are needed.":
        default:
          renderFile(teamArray);
          break;
      }
    });
};

// adding manager
const addManager = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "who is the manager of the team:",
        name: "name",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the managers name.");
            return false;
          }
        },
      },

      {
        type: "input",
        message: "Please enter the managers ID:",
        name: "id",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the managers ID.");
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Please enter the managers email:",
        name: "email",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the managers email.");
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Please enter the managers office number:",
        name: "officeNumber",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the managers office number.");
            return false;
          }
        },
      },
    ])

    .then((managerInput) => {
      const { name, id, email, officeNumber } = managerInput;
      const manager = new Manager(name, id, email, officeNumber);

      teamArray.push(manager);
      console.log(manager);

      createTeam();
    });
};

// adding engineer
const addEngineer = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the engineer?:",
        name: "name",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the engineers name.");
            return false;
          }
        },
      },

      {
        type: "input",
        message: "Please enter the engineers ID:",
        name: "id",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the engineers ID.");
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Please enter the engineers email:",
        name: "email",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the engineers email.");
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Please enter the engineers GitHub username:",
        name: "officeNumber",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the engineers GitHub username.");
            return false;
          }
        },
      },
    ])

    .then((engineerInput) => {
      const { name, id, email, github } = engineerInput;
      const engineer = new Engineer(name, id, email, github);

      teamArray.push(engineer);
      console.log(engineer);

      createTeam();
    });
};

// add Intern
const addIntern = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the Intern?:",
        name: "name",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the Interns name.");
            return false;
          }
        },
      },

      {
        type: "input",
        message: "Please enter the Interns ID:",
        name: "id",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the Interns ID.");
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Please enter the Interns email:",
        name: "email",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the Interns email.");
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Please enter the Interns school that they went to:",
        name: "school",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the Interns school.");
            return false;
          }
        },
      },
    ])

    .then((internInput) => {
      const { name, id, email, school } = internInput;
      const intern = new Intern(name, id, email, school);

      teamArray.push(intern);
      console.log(intern);

      createTeam();
    });
};
