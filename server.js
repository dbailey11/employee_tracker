// require/dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

//connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_trackerDB",
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw err;
  start();
});

//--------------------------------------------------------------

// function to start main menu
const start = () => {
  inquirer
    .prompt({
      name: "userChoice",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View departments",
        "View roles",
        "View employees",
        "Add an employee",
        "Add a role",
        "Add a department",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.userChoice) {
        case "View employees":
          viewEmployee();
          break;

        case "View departments":
          viewDepartment();
          break;

        case "View roles":
          viewRole();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add a department":
          addDepartment();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
};

// Functions for choices -------------------------------------------

// view all employees
const viewEmployee = () => {
  connection.query("SELECT * FROM employee", function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    console.table(results);
    start();
  });
};

const viewRole = () => {
  connection.query("SELECT * FROM role", function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    console.table(results);
    start();
  });
};

const viewDepartment = () => {
  connection.query(
    "SELECT * FROM department",
    function (error, results, fields) {
      if (error) throw error;
      // console.log(results);
      console.table(results);
      start();
    }
  );
};

// add an employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastname",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "roleid",
        type: "input",
        message: "What is the employee's role ID!",
      },
      {
        name: "managerid",
        type: "input",
        message: "Enter the employee's manager's id!",
      },
    ])
    .then((answer) => {

      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [answer.firstname, answer.lastname, answer.roleid, answer.managerid],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
};

// add a role
const addRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the job title you want to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this position?",
      },
      {
        name: "departmentid",
        type: "input",
        message: "What is the department ID for this position?",
      },
    ])
    .then((answer) => {

      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [answer.title, answer.salary, answer.departmentid],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
};

// add a department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the department you want to add?",
      },
    ])
    .then((answer) => {

      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [answer.name],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          start();
        }
      );
    });
};