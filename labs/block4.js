class Restaurant {
    #departments;
    #positionsId = { 1: 'manager', 2: 'barman', 3: 'cook', 4: 'waiter' };

    constructor() {
        this.#departments = [];
    }

    findDepartment(id) {
        return this.#departments.find(department => department.id === id);
    }

    createDepartment(title, id) {
        try {
            const checkDepartment = this.findDepartment(id);

            if (checkDepartment) {
                throw new Error(
                    'Sorry, but department with such id already exist.',
                );
            }

            const newDepartment = { title, id, employees: [] };

            this.#departments.push(newDepartment);

            return newDepartment;
        } catch (error) {
            return error;
        }
    }

    addEmployee(name, surname, departmentId, positionId, salary, isFired) {
        const employee = {
            name,
            surname,
            departmentId,
            position: this.#positionsId[positionId],
            salary,
            isFired,
        };

        const checkDepartment = this.findDepartment(departmentId);

        if (checkDepartment) {
            checkDepartment.employees.push(employee);

            return checkDepartment;
        }

        return null;
    }

    calcSalary(callback, flag) {
        const result = this.#departments.reduce((acc, { title, employees }) => {
            let numberPersons = 0;

            let salary = employees.reduce(
                (accumulator, { position, salary, isFired }) => {
                    if (!isFired) {
                        if (flag) {
                            // TODO
                        } else {
                            accumulator += salary;
                            numberPersons++;
                        }
                    }

                    return accumulator;
                },
                flag ? {} : 0,
            );

            acc[title] = callback(salary, numberPersons);

            return acc;
        }, {});

        return result;
    }

    calcFiredEmployees() {
        let result = 0;

        this.#departments.forEach(({ employees }) =>
            employees.forEach(({ isFired }) => (isFired ? ++result : result)),
        );

        return result;
    }

    findDepartmentWithoutHead() {
        const result = this.#departments.reduce((acc, department) => {
            let counter = 0;

            department.employees.forEach(({ position }) => {
                if (position === this.#positionsId[1]) {
                    counter++;
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
// rest.createDepartment('kitchen', 2);
// rest.createDepartment('hall', 3);

// rest.addEmployee('Ivan', 'Ivan', 1, 1, 1000, false);
rest.addEmployee('Dan', 'Dan', 1, 2, 600, false);
rest.addEmployee('Petr', 'Petr', 1, 2, 400, false);

// rest.addEmployee('Tony', 'Tony', 2, 1, 700, false);
// rest.addEmployee('Rad', 'Rad', 2, 3, 600, false);
// rest.addEmployee('Bobby', 'Bobby', 2, 3, 300, false);

// rest.addEmployee('Ella', 'Ella', 3, 1, 800, false);
// rest.addEmployee('Rita', 'Rita', 3, 4, 400, true);
// rest.addEmployee('Neva', 'Neva', 3, 4, 400, false);
// rest.addEmployee('Neva', 'Neva', 3, 4, 400, false);

// console.log(rest);

// console.log(rest.calcSalary(salary => salary)); // Сумма всех зарплат по каждому отделу
// console.log(rest.calcSalary((salary, numberPersons) => salary / numberPersons)); // Средняя зарплата по отделу
console.log(rest.calcSalary(salary => salary, {})); // Средняя зарплата по отделу
