class Restaurant {
    #departments;
    #employees;
    #positionNumbers = { 1: 'manager', 2: 'barman', 3: 'cook', 4: 'waiter' };

    constructor() {
        this.#departments = [];
        this.#employees = [];
    }

    addDepartment(title, departmentNumber) {
        const department = { title, departmentNumber };

        this.#departments.push(department);
    }

    addEmployee(
        name,
        surname,
        departmentNumber,
        positionNumber,
        salary,
        isFired,
    ) {
        const employee = {
            name,
            surname,
            departmentNumber,
            position: this.#positionNumbers[positionNumber],
            salary,
            isFired,
        };

        this.#employees.push(employee);
    }

    calcSumSalaries(callback) {}
}

const rest = new Restaurant();

rest.addDepartment('bar', 1);
rest.addDepartment('kitchen', 2);
rest.addDepartment('hall', 3);

rest.addEmployee('Ivan', 'Ivan', 1, 1, 1000, false);
rest.addEmployee('Petr', 'Petr', 1, 2, 500, false);
rest.addEmployee('Dan', 'Dan', 1, 2, 500, true);

rest.addEmployee('Tony', 'Tony', 2, 1, 900, false);
rest.addEmployee('Rad', 'Rad', 2, 3, 600, false);
rest.addEmployee('Bobby', 'Bobby', 2, 3, 600, true);

rest.addEmployee('Ella', 'Ella', 3, 1, 800, false);
rest.addEmployee('Rita', 'Rita', 3, 4, 400, true);
rest.addEmployee('Neva', 'Neva', 3, 4, 400, false);

console.log(rest);
