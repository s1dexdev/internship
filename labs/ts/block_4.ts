// Restaurant

interface ISalaryTotal {
    [key: string]: number[];
}

interface ISalaryDetail {
    [key: string]: {
        [key: string]: {
            maxSalary: number;
            minSalary: number;
        };
    };
}

interface IEmployee {
    name: string;
    surname: string;
    departmentId: string;
    position: string;
    salary: number;
    isFired: boolean;
}

interface IDepartment {
    title: string;
    id: string;
    employees: IEmployee[];
}

interface IRestaurant {
    departments: IDepartment[];
    positionsId: any;

    findDepartment(id: string): IDepartment | undefined;

    createDepartment(title: string, id: string): IDepartment;

    addEmployee(employee: IEmployee): IEmployee | boolean;

    getAmountSalaryTotal(callback: Function): ISalaryTotal[];

    getAmountSalaryDetail(): ISalaryDetail[];

    getNumberEmployees(callback: Function): number;

    findDepartmentWithoutHead(positionId: string): IDepartment[];
}

class Restaurant implements IRestaurant {
    departments: IDepartment[];
    positionsId: any;

    constructor(positions: any) {
        this.departments = [];
        this.positionsId = positions || {};
    }

    findDepartment(id: string): IDepartment | undefined {
        return this.departments.find(department => department.id === id);
    }

    createDepartment(title: string, id: string): IDepartment {
        const checkDepartment: IDepartment = this.findDepartment(id);

        if (checkDepartment) {
            return checkDepartment;
        }

        const newDepartment: IDepartment = { title, id, employees: [] };

        this.departments.push(newDepartment);

        return newDepartment;
    }

    addEmployee(employee: IEmployee): IEmployee | boolean {
        const checkDepartment: IDepartment = this.findDepartment(
            employee.departmentId,
        );

        if (checkDepartment) {
            employee.position = this.positionsId[employee.position];
            checkDepartment.employees.push(employee);

            return employee;
        }

        return false;
    }

    getAmountSalaryTotal(callback: Function): ISalaryTotal[] {
        return this.departments.reduce((acc, { title, employees }) => {
            let counterPersons: number = 0;
            let salaryInfo: number = employees.reduce(
                (accumulator, { salary, isFired }) => {
                    if (!isFired) {
                        accumulator += salary;
                        counterPersons++;

                        return accumulator;
                    }

                    return accumulator;
                },
                0,
            );

            acc.push({
                [title]: callback(salaryInfo, counterPersons),
            });

            return acc;
        }, []);
    }

    getAmountSalaryDetail(): ISalaryDetail[] {
        return this.departments.reduce((acc, { title, employees }) => {
            let salaryInfo = employees.reduce(
                (accumulator, { position, salary, isFired }) => {
                    if (!isFired) {
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

                        return accumulator;
                    }

                    return accumulator;
                },
                {},
            );

            acc.push({
                [title]: salaryInfo,
            });

            return acc;
        }, []);
    }

    getNumberEmployees(callback: Function): number {
        let counter: number = 0;

        this.departments.forEach(({ employees }) =>
            employees.forEach(employee => {
                if (callback(employee)) {
                    counter++;
                }
            }),
        );

        return counter;
    }

    findDepartmentWithoutHead(positionId: string): IDepartment[] {
        const result: IDepartment[] = this.departments.reduce(
            (acc, department) => {
                let counter: number = 0;

                department.employees.forEach(({ position }) => {
                    if (position === this.positionsId[positionId]) {
                        counter++;
                    }
                });

                if (counter === 0) {
                    acc.push(department);
                }

                return acc;
            },
            [],
        );

        return result;
    }
}

// Bank
