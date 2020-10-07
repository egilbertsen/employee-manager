var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3040,
  user: "root",
  password: "",
  database: "employees_db"
});

connection.connect(function (err) {
  if (err) throw err;
  runProgram();
});

runApp()

function runApp() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "Add employee",
        "Update employee role",
        "View all roles",
        "Add role",
        "View all departments",
        "Add department",
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all employees":
          viewEmployeesById();
          break;

        case "Add employee":
          addEmployee();
          break;

        case "View all roles":
          viewRoles();
          break;

        case "Add role":
          addRole();
          break;

        case "View all departments":
          viewDepts();
          break;

        case "Add department":
          addDept();
          break;
      }
    });
}

function viewEmployeesById() {
  var query = "SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, employees.manager FROM employees INNER JOIN roles ON employees.role_id=roles.title"
  connection.query(query, function(err, res){
    console.table(res)
  })
}

function viewDepts() {
  var query = "SELECT departments.id, departments.name FROM departments"
  connection.query(query, function(err, res){
    console.table(res)
  })
}

function viewRoles() {
  var query = "SELECT roles.id, roles.title, roles.salary, roles.department_id FROM roles"
  connection.query(query, function(err, res){
    console.table(res)
  })
}

function addDept() {
  inquirer.prompt(
    {
      name: "deptName",
      type: "input",
      message: "What is the department name?"
    }
  ).then(
    function(answer) {
      var query = "INSERT INTO departments VALUES ('" + answer.deptName + "')"
      connection.query(query, function(err, res){
        console.log("Department added!")
      })
    }
  )
}

function addRole() {
  inquirer.prompt(
    {
      name: "roleTitle",
      type: "input",
      message: "What is the role's title?"
    },
    {
      name: "roleSalary",
      type: "input",
      message: "What is the role's salary?"
    },
    {
      name: "roleDept",
      type: "input",
      message: "What is the role's dept?"
    }
  ).then(
    function(answer) {
      var query = "INSERT INTO roles VALUES ('" + answer.roleTitle + "', '" + answer.roleSalary + "', '" + answer.roleDept + "')"
      connection.query(query, function(err, res){
        console.log("Role added!")
      })
    }
  )
}

function addEmployee() {
  inquirer.prompt(
    {
      name: "employeeFirst",
      type: "input",
      message: "What is the employee's first name?"
    },
    {
      name: "employeeLast",
      type: "input",
      message: "What is the employee's last name?"
    },
    {
      name: "employeeRole",
      type: "input",
      message: "What is the employee's role ID?"
    },
    {
      name: "managerID",
      type: "input",
      message: "What is the ID of the employee's manager?"
    }
  ).then(
    function(answer) {
      var query = "INSERT INTO employees VALUES ('" + answer.employeeFirst + "', '" + answer.employeeLast + "', '" + answer.employeeRole + "', '" + answer.managerID + "')"
      connection.query(query, function(err, res){
        console.log("Employee added!")
      })
    }
  )
}