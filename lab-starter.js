// ========================
// 🧪 TypeScript HR Lab Starter
// ========================
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// TODO: 1. Define enum Role
var Role;
(function (Role) {
    Role["Employee"] = "Employee";
    Role["Manager"] = "Manager";
})(Role || (Role = {}));
// TODO: 3. Define abstract class User
var User = /** @class */ (function () {
    function User(name, email, password) {
        this.id = HR.generateUserId();
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
    }
    User.prototype.authenticate = function (email, password) {
        return this.email === email && this.password === password;
    };
    return User;
}());
// TODO: 4. Define Department class
var Department = /** @class */ (function () {
    function Department(name) {
        this.employees = [];
        this.name = name;
    }
    Department.prototype.addEmployee = function (emp) {
        this.employees.push(emp);
    };
    Department.prototype.getDepartmentSize = function () {
        return this.employees.length;
    };
    return Department;
}());
// TODO: 5. Define Employee class
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(name, email, password, salary, department) {
        var _this = _super.call(this, name, email, password) || this;
        _this.salary = salary;
        _this.department = department;
        department.addEmployee(_this);
        return _this;
    }
    Employee.prototype.getNetSalary = function () {
        return this.salary - HR.calculateTax(this.salary);
    };
    Employee.prototype.promote = function (percentage) {
        this.salary = this.salary * (1 + percentage / 100);
    };
    Object.defineProperty(Employee.prototype, "Salary", {
        get: function () {
            return this.salary;
        },
        set: function (value) {
            if (value < 3000)
                return;
            this.salary = value;
        },
        enumerable: false,
        configurable: true
    });
    Employee.prototype.getRole = function () {
        return Role.Employee;
    };
    return Employee;
}(User));
// TODO: 6. Define Manager class
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.team = [];
        return _this;
    }
    Manager.prototype.addEmployeeToTeam = function (emp) {
        this.team.push(emp);
    };
    Manager.prototype.removeEmployeeFromTeam = function (empId) {
        this.team = this.team.filter(function (e) { return e.id !== empId; });
    };
    Manager.prototype.getTeamReport = function () {
        return this.team.map(function (e) { return "ID: ".concat(e.id, ", Name: ").concat(e.name, ", Department: ").concat(e["department"].name); });
    };
    Manager.prototype.getRole = function () {
        return Role.Manager;
    };
    return Manager;
}(Employee));
// TODO: 7. Define HR utility class
var HR = /** @class */ (function () {
    function HR() {
    }
    HR.generateUserId = function () {
        return this.currentId++;
    };
    HR.isEmailValid = function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    HR.calculateTax = function (salary) {
        return salary * 0.1;
    };
    HR.generateReport = function (users) {
        return users.map(function (user) { return "".concat(user.name, " - ").concat(user.getRole()); });
    };
    HR.currentId = 1;
    return HR;
}());
// Final test scenario can be written here...
var itDept = new Department("IT");
var marktingDept = new Department("Markting");
var emp1 = new Employee("Mariam", "mariam@gamil.com", "pass123", 10000, itDept);
var emp2 = new Employee("Sara", "sara@gmail.com", "pass456", 5000, marktingDept);
var mgr1 = new Manager("Omar", "omar@gmail.com", "admin123", 15000, itDept);
var mgr2 = new Manager("Nour", "nour@gmail.com", "admin123", 12000, marktingDept);
mgr1.addEmployeeToTeam(emp1);
mgr2.addEmployeeToTeam(emp2);
console.log(mgr1.getTeamReport());
console.log("Net Salary of ".concat(emp1.name, ":"), emp1.getNetSalary());
console.log(HR.generateReport([emp1, mgr1, emp2, mgr2]));
