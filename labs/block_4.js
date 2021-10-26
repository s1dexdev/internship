class Restaurant {
    #departments;
    #positionsId;

    constructor(positions) {
        this.#departments = [];
        this.#positionsId = positions || {};
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

    addEmployee(employee) {
        const checkDepartment = this.findDepartment(employee.departmentId);

        if (checkDepartment) {
            employee.position = this.#positionsId[employee.position];
            checkDepartment.employees.push(employee);

            return checkDepartment;
        }

        return null;
    }

    calcSalary(callback, flag) {
        let numberPersons = null;
        let result = this.#departments.reduce((acc, { title, employees }) => {
            numberPersons = 0;

            let salaryInfo = employees.reduce(
                (accumulator, { position, salary, isFired }) => {
                    if (!isFired) {
                        // Максимальная и минимальная зарплаты
                        if (flag) {
                            if (!accumulator[position]) {
                                accumulator[position] = {
                                    maxSalary: salary,
                                    minSalary: salary,
                                };
                            }

                            let { maxSalary, minSalary } =
                                accumulator[position];

                            maxSalary < salary
                                ? (maxSalary = salary)
                                : maxSalary;

                            minSalary > salary
                                ? (minSalary = salary)
                                : minSalary;

                            // Сумма всех зарплат и средней
                        } else {
                            accumulator += salary;
                            numberPersons++;
                        }
                    }

                    return accumulator;
                },
                flag ? {} : 0,
            );

            acc.push({ [title]: callback(salaryInfo, numberPersons) });

            return acc;
        }, []);

        return result;
    }

    calcFiredEmployees() {
        let result = 0;

        this.#departments.forEach(({ employees }) =>
            employees.forEach(({ isFired }) => (isFired ? ++result : result)),
        );

        return result;
    }

    findDepartmentWithoutHead(positionId) {
        const result = this.#departments.reduce((acc, department) => {
            let counter = 0;

            department.employees.forEach(({ position }) => {
                if (position === this.#positionsId[positionId]) {
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

// const rest = new Restaurant({
//     1: 'manager',
//     2: 'barman',
//     3: 'cook',
//     4: 'waiter',
// });

// rest.createDepartment('bar', 1);
// rest.createDepartment('kitchen', 2);
// rest.createDepartment('hall', 3);

// rest.addEmployee({
//     name: 'Ivan',
//     surname: 'Ivan',
//     departmentId: 1,
//     position: 1,
//     salary: 1000,
//     isFired: false,
// });

// rest.calcSalary(salary => salary); // Сумма всех зарплат по каждому отделу
// rest.calcSalary((salary, numberPersons) => salary / numberPersons); // Средняя зарплата по отделу
// rest.calcSalary(salary => salary, true); // Поиск самой большой и самой маленькой зарплаты в разрезе каждого отдела и должности
