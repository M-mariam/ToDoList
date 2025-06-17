// ========================
// 🧪 TypeScript HR Lab Starter
// ========================

// TODO: 1. Define enum Role
enum Role {
  Employee = "Employee",
  Manager = "Manager"
}

// TODO: 2. Define Interface Loginable
interface Loginable{
    // email: string,
    // password: string,
    authenticate(email: string, password: string): boolean
}
// TODO: 3. Define abstract class User
abstract class User implements Loginable{
   readonly id: number;
    name: string;
    email: string;
    private password: string;
    createdAt: Date;

    constructor(name:string, email:string, password:string){
        this.id = HR.generateUserId();
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date()
    }
   authenticate(email: string, password: string): boolean{
    return this.email === email && this.password === password
   }

    abstract getRole(): string;

}

// TODO: 4. Define Department class
class Department{
   name: string;
   employees: Employee[] = []

   constructor(name:string){
    this.name = name;
   }
   addEmployee(emp: Employee): void{
    this.employees.push(emp);
   }
   getDepartmentSize() : number {
    return this.employees.length
   }
}

// TODO: 5. Define Employee class
class Employee extends User{
  private salary: number;
  protected department: Department;
  constructor(name: string, email: string, password: string, salary: number, department: Department) {
  super(name, email, password);
    this.salary = salary; 
    this.department = department;
    department.addEmployee(this);
  }
  getNetSalary(): number{
    return this.salary - HR.calculateTax(this.salary);
  }
  promote(percentage:number) : void{
    this.salary = this.salary * (1 + percentage / 100);
  }
  get Salary():number{
    return this.salary;
  }
  set Salary(value:number){
   if(value < 3000)
    return;
    this.salary = value
  }
  
  getRole(): string {
    return Role.Employee
  }
}

// TODO: 6. Define Manager class
class Manager extends Employee{
  team: Employee[] = [];

  addEmployeeToTeam(emp: Employee): void{
    this.team.push(emp);
  }
  removeEmployeeFromTeam(empId: number): void{
    this.team = this.team.filter(e=> e.id !== empId)
  }
  getTeamReport(): string[] {
    return this.team.map(e => `ID: ${e.id}, Name: ${e.name}, Department: ${e["department"].name}`);
  }

  getRole(): string {
    return Role.Manager
  }
}

// TODO: 7. Define HR utility class
class HR{
  
  private static currentId = 1;
  static generateUserId(): number {
    return this.currentId++;
  }

  static isEmailValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static calculateTax(salary: number): number {
    return salary * 0.1;
  }

  static generateReport(users: User[]): string[] {
    return users.map(user => `${user.name} - ${user.getRole()}`);
  }
}
// Final test scenario can be written here...
const itDept = new Department("IT");
const marktingDept = new Department("Markting");
const emp1 = new Employee("Mariam", "mariam@gamil.com", "pass123", 10000, itDept);
const emp2 = new Employee("Sara", "sara@gmail.com", "pass456", 5000, marktingDept);

const mgr1 = new Manager("Omar", "omar@gmail.com", "admin123", 15000, itDept);
const mgr2 = new Manager("Nour", "nour@gmail.com", "admin123", 12000, marktingDept);
mgr1.addEmployeeToTeam(emp1);
mgr2.addEmployeeToTeam(emp2);

console.log(mgr1.getTeamReport());
console.log(`Net Salary of ${emp1.name}:`, emp1.getNetSalary());
console.log(HR.generateReport([emp1, mgr1, emp2, mgr2]));

