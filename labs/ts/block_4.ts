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

interface IAccount {
    id: string,
    typeAcc: string,
    currency: string,
    balance: number | {own: number, credit: number},
    isActive: boolean,
    expiryDate: string,
    creditLimit?: number,
}

interface IClient {
    name: string,
    surname: string,
    id: string,
    isActive: boolean,
    registrationDate: string,
    accounts: IAccount[],
}

interface IBank {
    clients: IClient[];
    gendId: number,

    addClient(client: IClient): IClient,

    createClientAccount(id: string, typeAcc: string, currency: string): IClient,

    findClientById(id: string): IClient,

    setExpiryDateClientCard(month: number, year: number): string,

    conversionCurrency(rates: any[], currency: string, amount: number, baseCurrencyBank: string, baseCurrencyCountry: string): number,



}


class Bank {
    #clients;
    #genId; // Temp

    constructor() {
        this.#clients = [];
        this.#genId = 1; // Temp
    }

    addClient(client) {
        client.id = this.#genId; // Temp
        client.isActive = true;
        client.registrationDate = new Date();
        client.accounts = [];

        this.#clients.push(client);
        this.#genId++; // Temp

        return client;
    }

    createClientAccount(id, typeAcc, currency) {
        const client = this.findClientById(id);
        let account = null;

        if (client === undefined) {
            return null;
        }

        account = {
            typeAcc,
            number: this.#genId, // Temp
            balance: null,
            expiryDate: this.setExpiryDateClientCard(1, 3),
            currency,
            isActive: true,
        };

        if (type === 'debit') {
            account.balance = 0;
        }

        if (type === 'credit') {
            account.creditLimit = 10000;
            account.balance = { own: 0, credit: account.creditLimit };
        }

        client.accounts.push(account);
        this.#genId++; // Temp

        return client;
    }

    findClientById(id) {
        return this.#clients.find(client => client.id === id);
    }

    setExpiryDateClientCard(month, year) {
        const date = new Date();

        return `${date.getMonth() + month}/${date.getFullYear() + year}`;
    }

    conversionCurrency(
        rates,
        currency,
        amount,
        baseCurrencyBank,
        baseCurrencyCountry,
    ) {
        let result = null;
        let baseCurrencyRate = rates.find(
            ({ ccy }) => ccy === baseCurrencyBank,
        );

        if (currency === baseCurrencyCountry) {
            result = amount / baseCurrencyRate.sale;

            return Math.round(result * 100) / 100;
        }

        rates.forEach(({ ccy, buy }) => {
            if (currency === ccy) {
                result = (amount * buy) / baseCurrencyRate.sale;

                return result;
            }
        });

        return Math.round(result * 100) / 100;
    }

    async getAmountTotal(baseCurrencyBank, baseCurrencyCountry) {
        const currencyRates = await this.getCurrencyRates();

        return this.#clients.reduce((result, { accounts }) => {
            accounts.forEach(account => {
                let { type, currency, balance } = account;

                if (type === 'debit') {
                    if (currency === baseCurrencyBank) {
                        result += balance;

                        return account;
                    }

                    result += this.conversionCurrency(
                        currencyRates,
                        currency,
                        balance,
                        baseCurrencyBank,
                        baseCurrencyCountry,
                    );

                    return account;
                }

                if (account.type === 'credit') {
                    let { own, credit } = account.balance;
                    let totalAmount = own + credit;

                    if (currency === baseCurrencyBank) {
                        result += totalAmount;

                        return account;
                    }

                    result += this.conversionCurrency(
                        currencyRates,
                        currency,
                        totalAmount,
                        baseCurrencyBank,
                        baseCurrencyCountry,
                    );

                    return account;
                }
            });

            return result;
        }, 0);
    }

    async getAmountClientsOwe(mainCurrencyBank, mainCurrencyCountry, callback) {
        const currencyRates = await this.getCurrencyRates();

        return this.#clients.reduce(
            (accumulator, { isActive, accounts }, index) => {
                if (index === 0) {
                    accumulator.amount = 0;
                    accumulator.numberDebtors = 0;
                }

                if (!callback(isActive)) {
                    return accumulator;
                }

                const totalDebt = accounts.reduce((acc, accounut) => {
                    let { type, currency } = accounut;

                    if (type === 'credit') {
                        let loanAmount =
                            accounut.creditLimit - accounut.balance.credit;

                        if (loanAmount < 0) {
                            return acc;
                        }

                        if (currency === mainCurrencyBank) {
                            acc += loanAmount;

                            return acc;
                        }

                        acc += this.conversionCurrencyToUsd(
                            currencyRates,
                            currency,
                            loanAmount,
                            mainCurrencyBank,
                            mainCurrencyCountry,
                        );

                        return acc;
                    }
                }, 0);

                if (totalDebt > 0) {
                    accumulator.numberDebtors++;
                }
                accumulator.amount += totalDebt;

                return accumulator;
            },
            {},
        );
    }

    async getCurrencyRates(handleError) {
        const url =
            'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

        try {
            const response = await fetch(url);
            const rates = await response.json();

            return rates;
        } catch (error) {
            handleError(error);
        }
    }