const connection = require("./connection");

class Database {
  constructor(connection) {
    this.connection = connection;
  }

  findEmployees() {
    return this.connection
      .promise()
      .query(
        `SELECT employee.id, employee.first_name, employee.last_name,  role.title, role.salary, department.name, CONCAT(manager.first_name, ' ' ,manager.last_name) AS manager FROM employee left join role on employee.role_id = role.id left JOIN department ON role.department_id = department.id  left join employee manager on manager.id = employee.manager_id;`
      );
  }

  findRoles() {
    return this.connection.promise().query(
      // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
      "SELECT role.id, role.title, role.department_id, role.salary AS Salary FROM employee JOIN role ON employee.role_id = role.id"
    );
  }

  findDepartments() {
    return this.connection.promise().query(
      // THEN I am presented with a formatted table showing department names and department ids
      "SELECT department.name, department.id AS department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id"
    );
  }
}

module.exports = new Database(connection);
