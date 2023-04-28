import Employee from "../entities/Employee";
import Manager from "../entities/Manger";

export default interface EmployeeRepository {
    getLoginEmployees(): Promise<Employee[]>;
    getAdmin(): Manager;

    getAllManagers(): Manager[];

    updateManager(employeeDetails:Manager) : Manager;
    updateAdmin(employeeDetails:Manager): Manager;
}