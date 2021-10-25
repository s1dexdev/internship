class Restaurant {
    #departments;
    #employees;
    #departmentNumbers = {};
    #positionNumbers = { 1: 'manager', 2: 'barman', 3: 'cook', 4: 'waiter' };

    constructor() {
        this.#departments = [];
        this.#employees = [];
    }

    createDepartment(title, departmentNumber) {
        try {
            if (departmentNumber in this.#departmentNumbers) {
                throw new Error(
                    'Sorry, but department with such number already exist.',
                );
            }

            this.#departmentNumbers[departmentNumber] = title;
            this.#departments.push({ title, departmentNumber });
        } catch (error) {
            return error;
        }
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

    calcSalary(callback) {
        const result = {};
        let departName = null;
        let numberPersons = null;
        let salary = null;

        for (let key in this.#departmentNumbers) {
            departName = this.#departmentNumbers[key];
            numberPersons = 0;

            salary = this.#employees.reduce(
                (acc, { departmentNumber, salary, isFired }) => {
                    if (Number(key) === departmentNumber && !isFired) {
                        acc += salary;
                        numberPersons++;
                    }

                    return acc;
                },
                0,
            );

            result[departName] = callback(salary, numberPersons);
        }

        return result;
    }

    calcSalaryByPositions() {
        const result = {};
        let salary = null;

        for (let key in this.#departmentNumbers) {
            departName = this.#departmentNumbers[key];
            salary = { maxSalary: 0, minSalary: 0 };

            result[departName] = this.#employees.reduce(
                (
                    acc,
                    { departmentNumber, position, salary, isFired },
                    index,
                ) => {
                    if (Number(key) === departmentNumber && !isFired) {
                        acc[position] = {
                            maxSalary: salary,
                            minSalary: salary,
                        };
                    }
                },
                {},
            );
        }
    }

    calcFiredEmployees() {
        const result = this.#employees.reduce(
            (acc, { isFired }) => (isFired ? ++acc : acc),
            0,
        );

        return result;
    }

    findDepartmentWithoutHead() {
        const result = this.#departments.reduce((acc, department) => {
            let counter = 0;

            this.#employees.forEach(({ departmentNumber, position }) => {
                if (department.departmentNumber === departmentNumber) {
                    if (position === this.#positionNumbers[1]) {
                        counter++;
                    }
                }
            });

            if (counter === 0) {
                acc.push(department);
            }

            return acc;
        }, []);

        return result;
    }
}

const rest = new Restaurant();

rest.createDepartment('bar', 1);
rest.createDepartment('kitchen', 2);
rest.createDepartment('hall', 3);

rest.addEmployee('Ivan', 'Ivan', 1, 1, 1000, false);
rest.addEmployee('Petr', 'Petr', 1, 2, 500, false);
rest.addEmployee('Dan', 'Dan', 1, 2, 500, true);

rest.addEmployee('Tony', 'Tony', 2, 1, 700, false);
rest.addEmployee('Rad', 'Rad', 2, 3, 600, false);
rest.addEmployee('Bobby', 'Bobby', 2, 3, 600, true);

rest.addEmployee('Ella', 'Ella', 3, 1, 800, false);
rest.addEmployee('Rita', 'Rita', 3, 4, 400, true);
rest.addEmployee('Neva', 'Neva', 3, 4, 400, false);
rest.addEmployee('Neva', 'Neva', 3, 4, 400, false);

// console.log(rest);

rest.calcSalary(salary => salary); // Сумма всех зарплат по каждому отделу
rest.calcSalary((salary, numberPersons) => salary / numberPersons); // Средняя зарплата по отделу

// console.log(rest.findDepartmentWithoutHead());
