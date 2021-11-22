interface IModal {
    open(): void;
    close(): void;
    deleteMarkup(): void;
}

interface Input {
    [kye: string]: string;
}

interface IForm {
    id?: string;
    formName: string;
    inputs: Input[];
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

interface IPositionsId {
    [key: string]: string;
}

interface IRestaurant {
    wrapper: HTMLElement;
    departments: IDepartment[];
    positionsId: IPositionsId;

    render(): void;

    createMarkupRestaurant(): HTMLElement;

    createMarkupDepartment(): HTMLElement;

    createMarkupForm(props: IForm): HTMLElement;

    handleForm(event: Event): void;

    setDepartmentForm(): void;

    setEmployeeForm(): void;

    createModal(props: IForm): IModal;

    createMarkupModal(props: IForm): HTMLElement;

    deleteDepartment(event: Event): void;

    findDepartment(id: string): IDepartment;

    createEmployee(employee: IEmployee): IEmployee | null;

    getAmountSalaryTotal(callback: Function): { [key: string]: number };

    getAmountSalaryDetail(): { [key: string]: object };

    getNumberEmployees(callback: Function): number;

    findDepartmentWithoutHead(positionId: string): IDepartment[];
}

class Restaurant implements IRestaurant {
    wrapper: HTMLElement;
    departments: IDepartment[];
    positionsId: IPositionsId;

    constructor(
        selector: string,
        positions: IPositionsId,
        departments: IDepartment[],
    ) {
        this.wrapper = document.querySelector(selector) as HTMLElement;
        this.departments = departments || [];
        this.positionsId = positions || {};

        this.render();
    }

    render(): void {
        const restaurant: HTMLElement = this.createMarkupRestaurant();

        this.wrapper.innerHTML = '';
        this.wrapper.appendChild(restaurant);
    }

    createMarkupRestaurant(): HTMLElement {
        const restaurant: HTMLElement = document.createElement('DIV');

        restaurant.innerHTML = `
            <div class="buttons">
                <button type="button" data-action="setDepartmentForm">Add new department</button>
                <button type="button" data-action="setEmployeeForm">Add new employee</button>
            </div>
            <p class="text-title">General info:</p>
            <ul>
                <li>
                    <p>Number of employees: ${this.getNumberEmployees(
                        (employee: IEmployee): IEmployee => employee,
                    )}</p>
                </li>
                <li>
                    <p>Number of fired employees: ${this.getNumberEmployees(
                        ({ isFired }: { isFired: boolean }): boolean =>
                            isFired === true,
                    )}</p>
                </li>
            </ul>
            <p class="text-title">Departments info:</p>
                   
        `;

        restaurant.appendChild(this.createMarkupDepartment());
        restaurant.addEventListener('click', (event: MouseEvent): void => {
            const { action } = (event.target as HTMLElement).dataset;

            this[action](event);
        });

        return restaurant;
    }

    createMarkupDepartment(): HTMLElement {
        const salaryInfo: any = this.getAmountSalaryTotal(
            (salary: number) => salary,
        );
        const departmentsList: HTMLElement = document.createElement('UL');

        departmentsList.classList.add('departments');

        for (let i: number = 0; i < this.departments.length; i++) {
            const { title, id }: { title: string; id: string } =
                this.departments[i];
            const item: HTMLElement = document.createElement('LI');

            item.classList.add('departments-item');
            item.innerHTML = `
                <p>Department title - ${title}</p>
                <p>Department number: ${id}</p>
                <p>Total salary by department: ${salaryInfo[title]}</p>
                <button type="button" data-action="deleteDepartment" data-number=${id}>Delete</button>
            `;

            departmentsList.appendChild(item);
        }

        return departmentsList;
    }

    createMarkupForm(props: IForm): HTMLElement {
        const { formName, inputs } = props;
        const form: HTMLElement = document.createElement('FORM');

        form.classList.add('form');
        form.setAttribute('data-name', formName);

        for (let i: number = 0; i < inputs.length; i++) {
            const input: HTMLElement = document.createElement('INPUT');

            for (let key in inputs[i]) {
                input.setAttribute(key, inputs[i][key]);
            }

            form.appendChild(input);
        }

        form.insertAdjacentHTML(
            'beforeend',
            `
            <button type="submit" data-action="accept">Add</button>
        `,
        );

        form.addEventListener('submit', (event: Event): void => {
            event.preventDefault();

            this.handleForm(event);
        });

        return form;
    }

    handleForm(event: Event): void {
        const { name } = (event.target as HTMLFormElement).dataset;
        const data: FormData = new FormData(event.target as HTMLFormElement);
        const result: any = {};

        for (let item of data.entries()) {
            let key: string = item[0];
            let value: any = item[1];

            if (key === 'salary') {
                value = Number(value);
            }

            result[key] = value;
        }

        this[name](result);
        this.render();
    }

    setDepartmentForm(): void {
        this.createModal({
            formName: 'createDepartment',
            inputs: [
                {
                    name: 'title',
                    type: 'text',
                    placeholder: 'title',
                    class: 'input',
                    pattern: '[a-zA-Z]{5,10}',
                },
                {
                    name: 'departmentId',
                    type: 'number',
                    placeholder: 'department number',
                    class: 'input',
                    pattern: '[0-9]{1,10}',
                },
            ],
        });
    }

    setEmployeeForm(): void {
        this.createModal({
            formName: 'createEmployee',
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: 'name',
                    class: 'input',
                    pattern: '[a-zA-Z]{2,}',
                },
                {
                    name: 'surname',
                    type: 'text',
                    placeholder: 'surname',
                    class: 'input',
                    pattern: '[a-zA-Z]{2,}',
                },
                {
                    name: 'departmentId',
                    type: 'number',
                    placeholder: 'departmentId',
                    class: 'input',
                    pattern: '[0-9]{1,10}',
                },
                {
                    name: 'position',
                    type: 'number',
                    placeholder: 'position number',
                    class: 'input',
                    pattern: '[0-9]{1,10}',
                },
                {
                    name: 'salary',
                    type: 'number',
                    placeholder: 'salary',
                    class: 'input',
                    pattern: '[0-9]{1,10}',
                },
            ],
        }).open();
    }

    createModal(props: IForm): IModal {
        props = props || null;

        let isFlag: boolean = false;
        const modalWindowMarkup: HTMLElement = this.createMarkupModal(props);
        const modal: any = {
            open() {
                if (isFlag) {
                    return;
                }

                modalWindowMarkup.classList.add('open');
            },
            close() {
                modalWindowMarkup.classList.remove('open');
            },
            deleteMarkup() {
                (modalWindowMarkup.parentNode as HTMLElement).removeChild(
                    modalWindowMarkup,
                );
                modalWindowMarkup.removeEventListener('click', listener);
                window.removeEventListener('keydown', listener);

                isFlag = true;
            },
        };

        function listener(event: Event) {
            if (
                (event.target as HTMLElement).dataset.close ||
                (event as KeyboardEvent).code === 'Escape'
            ) {
                modal.close();
                modal.deleteMarkup();
            }
        }

        modalWindowMarkup.addEventListener('click', listener);
        window.addEventListener('keydown', listener);

        return modal;
    }

    createMarkupModal(props: IForm): HTMLElement {
        const container: HTMLElement = document.createElement('div');

        container.classList.add('modal');
        container.insertAdjacentHTML(
            'afterbegin',
            `
                <div class="modal-overlay" data-close="true">
                    <div class="modal-window">
                        <span class="modal-close" data-close="true">&times;</span>

                    </div>
                </div>
                `,
        );

        const modalWindow: HTMLElement = container.querySelector(
            '.modal-window',
        ) as HTMLElement;

        modalWindow.appendChild(this.createMarkupForm(props));
        this.wrapper.appendChild(container);

        return container;
    }

    deleteDepartment(event: Event): void {
        const id: any = (event.target as HTMLElement).dataset.number;

        this.departments = this.departments.filter(
            department => department.id !== id,
        );

        this.render();
    }

    findDepartment(id: string): IDepartment {
        return this.departments.find(department => department.id === id);
    }

    createDepartment(department: IDepartment): IDepartment | boolean {
        const checkDepartment: IDepartment | undefined = this.findDepartment(
            department.id,
        );

        if (checkDepartment) {
            return false;
        }

        department.employees = [];
        this.departments.push(department);

        return department;
    }

    createEmployee(employee: IEmployee): IEmployee | null {
        const checkDepartment: IDepartment | undefined = this.findDepartment(
            employee.departmentId,
        );

        if (checkDepartment) {
            employee.position = this.positionsId[employee.position];
            employee.isFired = false;

            checkDepartment.employees.push(employee);

            return employee;
        }

        return null;
    }

    getAmountSalaryTotal(callback: Function): { [key: string]: number } {
        return this.departments.reduce((acc: any, { title, employees }) => {
            let counterPersons: number = 0;
            let salaryInfo: number = employees.reduce(
                (accumulator, { salary, isFired }) => {
                    if (!isFired) {
                        accumulator += salary;
                        counterPersons++;
                    }

                    return accumulator;
                },
                0,
            );

            acc[title] = callback(salaryInfo, counterPersons);

            return acc;
        }, {});
    }

    getAmountSalaryDetail(): { [key: string]: object } {
        return this.departments.reduce((acc: any, { title, employees }) => {
            let salaryInfo: {} = employees.reduce(
                (accumulator: any, { position, salary, isFired }) => {
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
                    }

                    return accumulator;
                },
                {},
            );

            acc[title] = salaryInfo;

            return acc;
        }, {});
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
        const result: any[] = this.departments.reduce(
            (acc: any[], department) => {
                let counter = 0;

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

// document.addEventListener('DOMContentLoaded', event => {
//     new Restaurant('.app', restPositions, restDepartments);
// });

// Bank

interface IAccount {
    id: string;
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
    id: string;
    isActive: boolean;
    registrationDate: string;
    accounts: acc[];
}

interface IBank {
    wrapper: HTMLElement;
    clients: IClient[];
    genId: number;

    render(): void;

    createMarkupBank(): HTMLElement;

    createMarkupClientCard(): HTMLElement;

    createMarkupClientAccount(account: acc): HTMLElement;

    createModal(props: IForm): IModal;

    createMarkupModal(props: IForm): HTMLElement;

    createMarkupForm(props: IForm): HTMLElement;

    handleForm(event: Event): void;

    addClient(client: IClient): boolean;

    addClientAccount(credentials: acc): IClient | null;

    deleteClient(event: Event): void;

    setClientForm(): void;

    setAccountForm(event: Event): void;

    findClientById(id: string): IClient | undefined;

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
    ): Promise<any>;

    getCurrencyRates(handleError: Function): Promise<any>;
}

class Bank implements IBank {
    wrapper: HTMLElement;
    clients: IClient[];
    genId: number;

    constructor(selector: string, bankClients: IClient[]) {
        this.wrapper = document.querySelector(selector) as HTMLElement;
        this.clients = bankClients || [];
        this.genId = 1;

        this.render();
    }

    render(): void {
        const bank: HTMLElement = this.createMarkupBank();

        this.wrapper.innerHTML = '';
        this.wrapper.appendChild(bank);
    }

    createMarkupBank(): HTMLElement {
        const bank: HTMLElement = document.createElement('DIV');

        bank.classList.add('bank-wrapper');
        bank.insertAdjacentHTML(
            'afterbegin',
            `
            <p>Total amount in the bank: <span class="total-amount"></span></p>
            <p>Owe to the bank: <span class="owe-amount"></span></p>
            <p>Number of debtors: <span class="debtors"></span></p>
            <button class="add-client-btn" type="button" data-action="setClientForm">Add new client</button>
        `,
        );

        bank.appendChild(this.createMarkupClientCard());
        bank.addEventListener('click', (event: MouseEvent): void => {
            const { action } = (event.target as HTMLElement).dataset;

            this[action](event);
        });

        this.getAmountTotal('USD', 'UAH').then(data => {
            (
                this.wrapper.querySelector('.total-amount') as HTMLElement
            ).textContent = `${data}$`;
        });

        this.getAmountClientsOwe('USD', 'UAH').then(
            ({ amount, numberDebtors }) => {
                (
                    this.wrapper.querySelector('.owe-amount') as HTMLElement
                ).textContent = `${amount}$`;
                (
                    this.wrapper.querySelector('.debtors') as HTMLElement
                ).textContent = `${numberDebtors}`;
            },
        );

        return bank;
    }

    createMarkupClientCard(): HTMLElement {
        const clientsList: HTMLElement = document.createElement('UL');

        clientsList.classList.add('clients-list');
        this.clients.forEach(
            ({ name, surname, id, registrationDate, accounts }) => {
                const client: HTMLElement = document.createElement('LI');

                client.classList.add('client-item');
                client.innerHTML = `
                <div class="client-info">
                    <p>Name: ${name} ${surname}</p>
                    <p>Registration date: ${registrationDate}</p>
                </div>
                <button type="button" data-action="setAccountForm">Add new account</button>
                <button type="button" data-action="deleteClient" data-id=${id}>Delete client</button>
                <p>Accounts: </p>
                <ul class="client-accounts"></ul>
            `;

                const clientAccounts: any =
                    client.querySelector('.client-accounts');

                accounts.forEach(account =>
                    clientAccounts.appendChild(
                        this.createMarkupClientAccount(account),
                    ),
                );

                clientsList.appendChild(client);
            },
        );

        return clientsList;
    }

    createMarkupClientAccount(account: acc): HTMLElement {
        const clientAccount: HTMLElement = document.createElement('LI');

        clientAccount.classList.add('client-account');
        clientAccount.innerHTML = `
                        <p>Account number: ${account.id}</p>
                        <p>Type: ${account.typeAcc}</p>
                        <p>Currency: ${account.currency}</p>
                        <p>Expiry date: ${account.expiryDate}</p>
                    `;

        if (account.typeAcc === 'debit') {
            clientAccount.insertAdjacentHTML(
                'beforeend',
                `
                <p>Balance: ${account.balance}</p>
                `,
            );
        }

        if (account.typeAcc === 'credit') {
            clientAccount.insertAdjacentHTML(
                'beforeend',
                `
                <p>Credit limit: ${account.creditLimit}</p>
                <p>Balance: ${account.balance.own + account.balance.credit}</p>
                `,
            );
        }

        return clientAccount;
    }

    createModal(props: IForm): IModal {
        let isFlag: boolean = false;
        const modal: IModal = {
            open() {
                if (isFlag) {
                    return;
                }

                modalWindowMarkup.classList.add('open');
            },
            close() {
                modalWindowMarkup.classList.remove('open');
            },
            deleteMarkup() {
                (modalWindowMarkup.parentNode as HTMLElement).removeChild(
                    modalWindowMarkup,
                );
                modalWindowMarkup.removeEventListener('click', listener);
                window.removeEventListener('keydown', listener);

                isFlag = true;
            },
        };

        const modalWindowMarkup: HTMLElement = this.createMarkupModal(props);

        function listener(event: Event) {
            if (
                (event.target as HTMLElement).dataset.close ||
                (event as KeyboardEvent).code === 'Escape'
            ) {
                modal.close();
                modal.deleteMarkup();
            }
        }

        modalWindowMarkup.addEventListener('click', listener);
        window.addEventListener('keydown', listener);

        return modal;
    }

    createMarkupModal(props: IForm): HTMLElement {
        const container: HTMLElement = document.createElement('div');

        container.classList.add('modal');
        container.insertAdjacentHTML(
            'afterbegin',
            `
                <div class="modal-overlay" data-close="true">
                    <div class="modal-window">
                        <span class="modal-close" data-close="true">&times;</span>

                    </div>
                </div>
                `,
        );

        const modalWindow: any = container.querySelector('.modal-window');

        modalWindow.appendChild(this.createMarkupForm(props));
        this.wrapper.appendChild(container);

        return container;
    }

    createMarkupForm(props: IForm): HTMLElement {
        const form: HTMLElement = document.createElement('FORM');

        form.classList.add('form');
        form.setAttribute('data-action', props.formName);

        for (let i: number = 0; i < props.inputs.length; i++) {
            const input: HTMLElement = document.createElement('INPUT');

            for (let key in props.inputs[i]) {
                input.setAttribute(key, props.inputs[i][key]);
            }

            form.appendChild(input);
        }

        form.insertAdjacentHTML(
            'beforeend',
            `
            <button type="submit" data-action="accept" data-id=${props.id}>Add</button>
        `,
        );

        form.addEventListener('submit', event => {
            event.preventDefault();

            this.handleForm(event);
        });

        return form;
    }

    handleForm(event: Event): void {
        const { action } = (event.target as HTMLElement).dataset;
        const data: FormData = new FormData(event.target as HTMLFormElement);
        const result: any = {};

        for (let item of data.entries()) {
            let key = item[0];
            let value = item[1];

            result[key] = value;
        }

        this[action](result);
        this.render();
    }

    addClient(client: IClient): boolean {
        client.id = String(this.genId);
        client.isActive = true;
        client.registrationDate = new Date().toLocaleDateString();
        client.accounts = [];

        this.clients.push(client);
        this.genId++;

        return true;
    }

    addClientAccount(credentials: acc): IClient | null {
        const client: IClient | undefined = this.findClientById(credentials.id);

        if (client === undefined) {
            return null;
        }

        client.accounts.push(credentials);
        this.genId++;

        return client;
    }

    deleteClient(event: Event): void {
        const clientId = (event.target as HTMLElement).dataset.id;

        this.clients = this.clients.filter(({ id }) => clientId !== id);
        this.render();
    }

    setClientForm(): void {
        this.createModal({
            formName: 'addClient',
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: 'name',
                    class: 'input',
                    pattern: '[a-zA-Z]{2,10}',
                },
                {
                    name: 'surname',
                    type: 'text',
                    placeholder: 'surname',
                    class: 'input',
                    pattern: '[a-zA-Z]{2,10}',
                },
            ],
        }).open();
    }

    setAccountForm(event: Event): void {
        const { id } = (event.target as HTMLElement).dataset;

        this.createModal({
            id,
            formName: 'addClientAccount',
            inputs: [
                {
                    name: 'type',
                    type: 'text',
                    placeholder: 'account type',
                    class: 'input',
                    pattern: '[a-z]{5,6}',
                },
                {
                    name: 'currency',
                    placeholder: 'currency type',
                    type: 'text',
                    class: 'input',
                    pattern: '[a-z]{2,3}',
                },
            ],
        }).open();
    }

    findClientById(id: string): IClient | undefined {
        return this.clients.find(client => client.id === id);
    }

    setExpiryDateClientCard(month: number, year: number): string {
        const date: Date = new Date();

        return `${date.getMonth() + month}/${date.getFullYear() + year}`;
    }

    conversionCurrency(
        rates: any[],
        currency: string,
        amount: number,
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
        const currencyRates: any = await this.getCurrencyRates(
            (error: Error) => error,
        );

        return this.clients.reduce((result: number, { accounts }) => {
            accounts.forEach((account: any) => {
                let { typeAcc, currency, balance } = account;

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

    async getAmountClientsOwe(
        mainCurrencyBank: string,
        mainCurrencyCountry: string,
    ): Promise<any> {
        const currencyRates: any = await this.getCurrencyRates(
            (error: Error) => error,
        );

        return this.clients.reduce((accumulator: any, { accounts }, index) => {
            if (index === 0) {
                accumulator.amount = 0;
                accumulator.numberDebtors = 0;
            }

            const totalDebt = accounts.reduce((acc, account) => {
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

                return acc;
            }, 0);

            if (totalDebt > 0) {
                accumulator.numberDebtors++;
            }

            accumulator.amount += totalDebt;

            return accumulator;
        }, {});
    }

    async getCurrencyRates(handleError: Function): Promise<any> {
        const url: string =
            'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

        try {
            const response: any = await fetch(url);
            const rates: any = await response.json();

            return rates;
        } catch (error) {
            handleError(error);
        }
    }
}

// document.addEventListener('DOMContentLoaded', event => {
//     new Bank('.app', bankClients);
// });
