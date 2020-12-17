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
      choices: ["View all employees", "Add an employee", "Exit"],
    })
    .then((answer) => {
      switch (answer.userChoice) {
        case "View all employees":
          viewEmployee();
          break;

        case "Add an employee":
          addEmployee();
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
        console.log(results);
        console.table(results);
        start();
    });
    
};

// add an employee
const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: "What is the employee's first name?"
          },
          {
            name: 'lastName',
            type: 'input',
            message: "What is the employee's last name?",
          },
          {
            name: 'role_id',
            type: 'list',
            message: "What is the employee's role?",
            choices: [
                'Customer Service',
                'Sales',
                'Software Engineer',
                'Account Manager',
                'Accountant',
                'Lawyer',
            ],
          },
          {
            name: 'manager_id',
            type: 'list',
            message: "Who is the employee's manager?",
            choices: [
                'Nancy Jo',
                'Winston Billy',
                'Joe Bo',
                'Betty Boop',
            ],
          },
    
        ])
        .then((answer) => {
            if(answer.role_id == "Customer Service") {
                result = 1;
            }
            if(answer.role_id == "Sales") {
                result = 2;
            }
            if(answer.role_id == "Software Engineer") {
                result = 3;
            }
            if(answer.role_id == "Account Manager") {
                result = 4;
            }
            if(answer.role_id == "Accountant") {
                result = 5;
            }
            if(answer.role_id == "Lawyer") {
                result = 6;
            }
            if(answer.manager_id == "Nancy Jo") {
                result = 1;
            }
            if(answer.manager_id == "Winston Billy") {
                result = 2;
            }
            if(answer.manager_id == "Joe Bo") {
                result = 3;
            }
            if(answer.manager_id == "Betty Boop") {
                result = 4;
            }
        })
        .then((answer) => {
            // var sql = 'INSERT INTO employee SET ?',
            // { firstName: answer, lastName: answer, role_id: answer, manager_id: answer};
            connection.query('INSERT INTO employee SET ?',
            {firstName:answer.firstName, lastName: answer.lastName, role_id: answer.role_id, manager_id: answer.manager_id},
            (error, results) => {
                if(results) {
                    console.log(results);
                } else {
                    throw error;
                    // console.log(results);
                    // console.table(result);
                }
            });
            start();
        })
};
