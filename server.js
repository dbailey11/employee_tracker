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

// ------ function to start main menu -----------------------------

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
        "Update employee role",
        "Delete employee",
        "Delete role",
        "Delete department",
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

        case "Update employee role":
          updateEmpRole();
          break;

        case "Delete employee":
          deleteEmp();
          break;

        case "Delete role":
          deleteRole();
          break;

        case "Delete department":
          deleteDept();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
};

// ------- Functions for choices -------------------------------------------

// view all employees
const viewEmployee = () => {
  let sql = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary,department.name AS department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON employee.manager_id = department.id";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    // console.log(results);
    console.table(results);
    start();
  });
};

// view all current roles
const viewRole = () => {
  connection.query("SELECT * FROM role", function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    console.table(results);
    start();
  });
};

// view all departments
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
  
  const roleSql = 'SELECT role.id, role.title FROM role';
  connection.query(roleSql, (err, data) => {
    if (err) throw err; 
    const roles = data.map(({ id, title }) => ({ name: title, value: id }));
  
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
        type: "list",
        message: "Enter the employee's role!",
        choices: roles
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
          // viewEmployee();
          start();
        }
      );
    });
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

// update an employee's role
const updateEmpRole = () => {
  //query to select table to be updated
  connection.query(
    "SELECT id, first_name, last_name, role_id FROM employee",
    (err, results) => {
      console.table("Current Employee roles", results);
      
      inquirer
        .prompt([
          {
            name: "name",
            type: "list",
            message: "Which employee do you want to update?",
            choices: function () {
              //funciton to list out employees
              let employees = results.map((employee) => ({
                name: employee.first_name + " " + employee.last_name,
                value: employee.id,
              }));
              return employees;
            },
          },
          {
            name: "newrole",
            type: "list",
            message: "What is the employee's new role ID?",
            choices: function () {
              let roles = results.map((role) => ({
                name: role.title,
                value: role.id,
              }));
              return roles;
            },
          },
        ])
        .then((answer) => {

          //update table query
          connection.query(
            "UPDATE employee SET employee.role_id = ? WHERE employee.id = ?",
            [answer.newrole, answer.name],
            (err, results) => {
              if (err) throw err;
              console.log(results);
              console.table(results);
              start();
            }
          );
        });
    }
  );
};

// delete employee function
const deleteEmp = () => {
  //query to select table to be updated
  connection.query(
    "SELECT id, first_name, last_name FROM employee",
    (err, results) => {
      console.table("Current Employees", results);
      
      inquirer
        .prompt([
          {
            name: "name",
            type: "list",
            message: "Which employee do you want to remove?",
            choices: function () {
              //funciton to list out employees
              let employees = results.map((employee) => ({
                name: employee.first_name + " " + employee.last_name,
                value: employee.id,
              }));
              return employees;
            },
          },
        ])
        .then((answer) => {

          //delete record in table query
          connection.query(
            "DELETE FROM employee WHERE employee.id = ?",
            [answer.name],
            (err, results) => {
              if (err) throw err;
              console.log(results);
              console.table(results);
              start();
            }
          );
        });
    }
  );
};

// delete role function
const deleteRole = () => {
  //query to select table to be updated
  connection.query(
    "SELECT id, title FROM role",
    (err, results) => {
      
      inquirer
        .prompt([
          {
            name: "oldrole",
            type: "list",
            message: "Which role do you want to remove?",
            choices: function () {
              //funciton to list out employees
              let oldRole = results.map((role) => ({
                name: role.title,
                value: role.id,
              }));
              return oldRole;
            },
          },
        ])
        .then((answer) => {

          //delete record in table query
          connection.query(
            "DELETE FROM role WHERE role.id = ?",
            [answer.oldrole],
            (err, results) => {
              if (err) throw err;
              console.log(results);
              console.table(results);
              start();
            }
          );
        });
    }
  );
};

// delete department function
const deleteDept = () => {
  //query to select table to be updated
  connection.query(
    "SELECT id, name FROM department",
    (err, results) => {
      
      inquirer
        .prompt([
          {
            name: "olddept",
            type: "list",
            message: "Which department do you want to remove?",
            choices: function () {
              //funciton to list out employees
              let oldDept = results.map((department) => ({
                name: department.name,
                value: department.id,
              }));
              return oldDept;
            },
          },
        ])
        .then((answer) => {

          //delete record in table query
          connection.query(
            "DELETE FROM department WHERE department.id = ?",
            [answer.olddept],
            (err, results) => {
              if (err) throw err;
              console.log(results);
              console.table(results);
              start();
            }
          );
        });
    }
  );
};
