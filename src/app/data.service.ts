import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Employee } from './employee';
import { Department } from './department';


@Injectable()
export class DataService {
    private urlEmployee = "https://localhost:5001/api/employee";
    private urlDepartament = "https://localhost:5001/api/department";

    constructor(private http: HttpClient) {
    }

    searchEmp(textSearch: string){
        return this.http.get(this.urlEmployee + '/findemployee/' + textSearch);
    }

    getDepartaments() {
        return this.http.get(this.urlDepartament);
    }
    getDepartament(id: number) {
        return this.http.get(this.urlDepartament  + '/' + id);
    }

    createDepartment(department: Department) {
        return this.http.post(this.urlDepartament, department);
    }

    updateDepartment(department: Department) {
        return this.http.put(this.urlDepartament + '/' + department.departmentID, department);
    }

    deleteDepartment(id: number) {
        return this.http.delete(this.urlDepartament + '/' + id);
    }

    getEmployees(id: number) {
        return this.http.get(this.urlEmployee + "/"  + id);
    }

    createEmployee(employee: Employee) {
        return this.http.post(this.urlEmployee, employee);
    }

    updateEmployee(employee: Employee) {
        return this.http.put(this.urlEmployee + '/' + employee.employeeID, employee);

    }

    deleteEmployee(id: number) {
        console.log(id);
        return this.http.delete(this.urlEmployee + "/" + id);
    }

   
 
}
