import User from '../../domain/entities/User';
import Employee from '../../domain/entities/Employee';
import EmployeeRepository from "../../domain/repositories/EmployeeRepository";
import Manager from "../../domain/entities/Manger";


export default class EmployeeRepositoryImpl implements EmployeeRepository {

    async getLoginEmployees(): Promise<Employee[]> {
        const user: User = {
            id: 1,
            email: "only@employee.com",
            firstname: "Only",
            lastname: 'Employee',
            username: 'onlyEmployee',
            password: '123',
            status: 'ENABLED',
            enabled: true,

        };
        const onlyEmployee: Employee = {
            id: 1,
            name: 'Only Employee', email: 'only@employee.com',
            deloop_user_id: '123',
            employeeId: '123',
            userDao: user
        };

        const user2: User = {
            id: 2,
            email: "only2@employee.com",
            firstname: "Only2",
            lastname: 'Employee2',
            username: 'onlyEmployee2',
            password: '123',
            status: 'ENABLED',
            enabled: true,
        };
        const onlyEmployee2: Employee = {
            id: 2,
            name: 'Only Employee2', email: 'only@employee2.com',
            deloop_user_id: '123',
            employeeId: '123',
            userDao: user2
        };

        return [onlyEmployee, onlyEmployee2]
    }

    getAdmin(): Manager {

        return {
            countryId: 0,
            id: 1,
            email: 'delcoker+admin@gmail.com',
            userType: "ADMIN"
        };
    }

    getAllManagers(): Manager[] {
        return [{
            countryId: 45,
            id: 1,
            email: 'delcoker+55@gmail.com',
            userType: "MANAGER"
        }, {
            countryId: 55,
            id: 2,
            email: 'another@gmail.com',
            userType: "MANAGER"
        },
            {
                countryId: 1,
                id: 999,
                email: 'another@admin.com',
                userType: "ADMIN"
            }];
    }

    updateAdmin(): Manager {
        return {
            countryId: 434,
            id: 1,
            email: 'delcoker+admin@gmail.com',
            userType: "ADMIN"
        };
    }

    updateManager(employeeDetails: Manager): Manager {
        return {
            id: 1,
            countryId: 5,
            email: 'delcoker+admin@gmail.com',
            userType: "ADMIN"
        };
    }

}