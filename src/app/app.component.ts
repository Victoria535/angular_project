import { Component, Input, OnInit } from '@angular/core';

import { Employee } from './employee';
import { Department } from './department';
import { DataService} from './data.service';

@Component({
    selector: 'my-app',
    templateUrl:  './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [DataService]

})
export class AppComponent  implements OnInit{
   
 show() :void {
  document.getElementById('modalDialog').style.display = "block";

 }

 showDepartment() :void {
  document.getElementById('modalDialogDepartment').style.display = "block";

 }
  closeModalDialog() : void{
    document.getElementById('modalDialog').style.display = "none";
    // document.getElementById('modalDialog').reset;

  }

  closeModalDialogDepartment() : void{
    document.getElementById('modalDialogDepartment').style.display = "none";
  }
  
  
  open() : void {
    document.getElementById('menu').style.left="0";
    }
   closeMenu() : void{
    document.getElementById('menu').style.left = "-320px";

  }
    
department: Department = new Department();
departments: Department[];

employee: Employee = new Employee();
employees: Employee[];
tableMode: boolean = true; 

constructor(private dataService: DataService){}

ngOnInit(){
 this.loadEmployeeStart(1);
 this.loadDepartments();
}
 
 loadDepartments(){
   this.dataService.getDepartaments().subscribe((data: Department[]) => this.departments = data);
   this.closeMenu();
 }

 loadDepartment(d: Department){
  this.dataService.getDepartament(d.departmentID).subscribe((data: Department[]) => this.departments = data);
  this.closeMenu();
}

 saveDepartment(){
     if(this.department.departmentID == null){
         this.dataService.createDepartment(this.department)
                        .subscribe((data: Department) => this.departments.push(data));

     } else {
         this.dataService.updateDepartment(this.department)
                    .subscribe(data => this.loadDepartments());
     }
     this.closeModalDialogDepartment();
 }    
 
 editDepartment(d: Department){
    this.showDepartment();
     this.department = d;
     }

 cancel() {
     this.department = new Department();
     this.tableMode = true;
    }

 deleteDepartment(d: Department){
     this.dataService.deleteDepartment(d.departmentID)
        .subscribe(data => this.loadDepartments());
 }

 loadEmployeeStart(id: number){
  this.dataService.getEmployees(id)
      .subscribe((data: Employee[]) => this.employees = data);

}

loadEmployees(d: Department){
  this.dataService.getEmployees(d.departmentID)
      .subscribe((data: Employee[]) => this.employees = data);

}

saveEmployee(){
  if(this.employee.employeeID == null){
      this.dataService.createEmployee(this.employee)
                     .subscribe((data: Employee) => this.employees.push(data));
  } else {
      this.dataService.updateEmployee(this.employee).subscribe(data => console.log("ok"));
  }
  this.closeModalDialog();
  // location.reload();

}    

editEmployee(e: Employee){
  this.show();
  this.employee = e;
}

deleteEmployee(e: Employee){
  var id = e.departmentId;
  this.dataService.deleteEmployee(e.employeeID).subscribe(data => console.log("ok"));
}


searchEmployee() {
  var textSearch = document.getElementById("searchField")['value'];
  console.log(textSearch)
  this.dataService.searchEmp(textSearch).subscribe(data => console.log("ok"));;
}

add() {
  this.show();
  this.tableMode = false;
}

addDepartment() {
  this.showDepartment();
  this.tableMode = false;
}
child(departments :Department){
  for(var i = 0; i < this.departments.length; i++){
  if(departments[i].parentID !== null){
    // console.log(departments[i]);
    return departments[i];
  }
  else{
    return false;
  }
}
}
}
