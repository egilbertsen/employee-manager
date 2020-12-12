var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "3ttaJam35?!",
  database: "employeesdb"
});

connection.connect(function (err) {
  if (err) throw err;
  runApp();
});

function runApp() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "Add employee",
        "Update employee role",
        "View all roles",
        "Add role",
        "View all departments",
        "Add department",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all employees":
          viewEmployees();
          break;

        case "Add employee":
          addEmployee();
          break;
        
        case "Update employee role":
          updateEmployeeRole();  
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

        case "Exit":
          connection.end();
          break;  
      }
    });
}

function viewEmployees() {
  var query = "SELECT * FROM employees"
  connection.query(query, function(err, res){
    console.table(res);
    runApp();
  })
}

function viewDepts() {
  var query = "SELECT * FROM departments"
  connection.query(query, function(err, res){
    console.table(res);
    runApp();
  })
}

function viewRoles() {
  var query = "SELECT * FROM roles"
  connection.query(query, function(err, res){
    console.table(res);
    runApp();
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
        runApp();
      })
    }
  )
}

function addRole() {
  inquirer.prompt([
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
  ]).then(
    function(answer) {
      var query = "INSERT INTO roles VALUES ('" + answer.roleTitle + "', '" + answer.roleSalary + "', '" + answer.roleDept + "')"
      connection.query(query, function(err, res){
        console.log("Role added!");
        runApp();
      })
    }
  )
}

function updateEmployeeRole() {
  inquirer.prompt([
    {
      name: "employeeId",
      type: "input",
      message: "What is the employee's ID number?"
    },
    {
      name: "newRole",
      type: "input",
      message: "What is the employee's new role ID?"
    }
  ]).then(
    function(answer) {
      var queryString = "UPDATE employees SET role_id  = " 
      queryString += answer.newRole
      queryString += " WHERE employee_id = "
      queryString += answer.employeeID
      var query = queryString
      connection.query(query, function(err, res){
        console.log("Employee role updated!")
        runApp();
      })
    }
  )
}

function addEmployee() {
  inquirer.prompt([
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
  ]).then(
    function(answer) {
      var query = "INSERT INTO employees VALUES ('" + answer.employeeFirst + "', '" + answer.employeeLast + "', '" + answer.employeeRole + "', '" + answer.managerID + "')"
      connection.query(query, function(err, res){
        console.log("Employee added!")
        runApp();
      })
    }
  )
}