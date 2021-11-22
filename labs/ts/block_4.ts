// Restaurant

interface IPositionsId {
    [key: string]: string;
}

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
    positionsId: IPositionsId;

    findDepartment(id: string): IDepartment;

    createDepartment(title: string, id: string): IDepartment;

    addEmployee(employee: IEmployee): IEmployee | boolean;

    getAmountSalaryTotal(callback: Function): ISalaryTotal[];

    getAmountSalaryDetail(): ISalaryDetail[];

    getNumberEmployees(callback: Function): number;

    findDepartmentWithoutHead(positionId: string): IDepartment[];
}

class Restaurant implements IRestaurant {
    departments: IDepartment[];
    positionsId: IPositionsId;

    constructor(positions: IPositionsId) {
        this.departments = [];
        this.positionsId = positions || {};
    }

    findDepartment(id: string): IDepartment {
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
    id: number;
    typeAcc: string;
    currency: string;
    isActive: boolean;
    expiryDate: string;
}

interface ICreditAcc extends IAccount {
    balance: { own: number; credit: number };
    creditLimit: number;
}

interface IDebitAcc extends IAccount {
    balance: number;
}

type acc = IDebitAcc & ICreditAcc;

interface IClient {
    name: string;
    surname: string;
    id: number;
    isActive: boolean;
    registrationDate: Date;
    accounts: acc[];
}

interface IBank {
    clients: IClient[];
    genId: number;

    addClient(credentials: IClient): IClient;

    createClientAccount(credentials: acc): IClient | null;

    findClientById(id: number): IClient;

    setExpiryDateClientCard(month: number, year: number): string;

    conversionCurrency(
        rates: any[],
        currency: string,
        amount: number,
        baseCurrencyBank: string,
        baseCurrencyCountry: string,
    ): number;

    getAmountTotal(
        baseCurrencyBank: string,
        baseCurrencyCountry: string,
    ): Promise<any>;

    getAmountClientsOwe(
        mainCurrencyBank: string,
        mainCurrencyCountry: string,
        callback: Function,
    ): Promise<any>;

    getCurrencyRates(handleError: Function): Promise<any>;
}

class Bank implements IBank {
    clients: IClient[];
    genId: number;

    constructor() {
        this.clients = [];
        this.genId = 1;
    }

    addClient(client: IClient): IClient {
        client.id = this.genId;
        client.isActive = true;
        client.registrationDate = new Date();
        client.accounts = [];

        this.clients.push(client);
        this.genId++;

        return client;
    }

    createClientAccount(credentials: acc): IClient | null {
        const client: IClient = this.findClientById(credentials.id);

        if (client === undefined) {
            return null;
        }

        client.accounts.push(credentials);
        this.genId++;

        return client;
    }

    findClientById(id: number): IClient {
        return this.clients.find(client => client.id === id);
    }

    setExpiryDateClientCard(month: number, year: number): string {
        const date: Date = new Date();

        return `${date.getMonth() + month}/${date.getFullYear() + year}`;
    }

    conversionCurrency(
        rates: any[],
        currency: string,
        amount: any,
        baseCurrencyBank: string,
        baseCurrencyCountry: string,
    ): number {
        let result: any = null;
        let baseCurrencyRate: any = rates.find(
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

    async getAmountTotal(
        baseCurrencyBank: string,
        baseCurrencyCountry: string,
    ): Promise<any> {
        const currencyRates: any[] = await this.getCurrencyRates(
            (error: Error) => error,
        );

        return this.clients.reduce((result: any, { accounts }) => {
            accounts.forEach((account): any => {
                let { typeAcc, currency, balance }: acc = account;

                if (typeAcc === 'debit') {
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

                if (account.typeAcc === 'credit') {
                    let { own, credit }: any = account.balance;
                    let totalAmount: number = own + credit;

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

    async getAmountClientsOwe(
        mainCurrencyBank: string,
        mainCurrencyCountry: string,
        callback: Function,
    ): Promise<any> {
        const currencyRates = await this.getCurrencyRates(
            (error: Error) => error,
        );

        return this.clients.reduce(
            (accumulator: any, { isActive, accounts }, index) => {
                if (index === 0) {
                    accumulator.amount = 0;
                    accumulator.numberDebtors = 0;
                }

                if (!callback(isActive)) {
                    return accumulator;
                }

                const totalDebt = accounts.reduce((acc: any, account) => {
                    let { typeAcc, currency } = account;

                    if (typeAcc === 'credit') {
                        let loanAmount: number =
                            account.creditLimit - account.balance.credit;

                        if (loanAmount < 0) {
                            return acc;
                        }

                        if (currency === mainCurrencyBank) {
                            acc += loanAmount;

                            return acc;
                        }

                        acc += this.conversionCurrency(
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

    async getCurrencyRates(handleError: Function): Promise<any> {
        const url: string =
            'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

        try {
            const response: Response = await fetch(url);
            const rates: any[] = await response.json();

            return rates;
        } catch (error) {
            handleError(error);
        }
    }
}
