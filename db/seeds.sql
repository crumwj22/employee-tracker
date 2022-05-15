INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");
    

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 120000, 1),
       ("Salesperson", 60000, 1),
       ("Lead Engineer", 125000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 115000, 3),
       ("Accountant", 100000, 3),
       ("Legal Team Lead", 125000, 4),
       ("Lawyer", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Mike", "Chan", 2, 1),
       ("Ashley", "Rodrequiz", 3, NULL),
       ("Kevin", "Tupik", 4, 3),
       ("Kunal", "Singh", 4, 3),
       ("Malia", "Brown", 5, NULL),
       ("Sarah", "Lourd", 6, 5),
       ("Tom", "Allen", 7, NULL),
       ("Sam", "Kash", 8, 8);    