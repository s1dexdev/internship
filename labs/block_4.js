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
                    // Максимальная и минимальная зарплаты
                    if (flag && !isFired) {
                        if (!accumulator[position]) {
                            accumulator[position] = {
                                maxSalary: salary,
                                minSalary: salary,
                            };
                        }

                        if (accumulator[position].maxSalary < salary) {
                            accumulator[position].maxSalary = salary;
                        }

                        if (accumulator[position].minSalary > salary) {
                            accumulator[position].minSalary = salary;
                        }
                    }

                    // Сумма всех зарплат и средней
                    if (!flag && !isFired) {
                        accumulator += salary;
                        numberPersons++;
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
        let counter = 0;

        this.#departments.forEach(({ employees }) =>
            employees.forEach(({ isFired }) => {
                if (isFired) {
                    counter++;
                }
            }),
        );

        return counter;
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

// rest.calcSalary(salary => salary); // Сумма всех зарплат по каждому отделу
// rest.calcSalary((salary, numberPersons) => salary / numberPersons); // Средняя зарплата по отделу
// rest.calcSalary(salary => salary, true); // Поиск самой большой и самой маленькой зарплаты в разрезе каждого отдела и должности
