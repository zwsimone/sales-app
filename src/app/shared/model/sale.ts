export interface ISale {
    id?: string;
    saleType: string;
    saleDate: number;
    invoiceNumber: number;
    tableNumber?: number;
    mobile?: string;
    orderTotal: number;
    paymentMethod: string;
    paymentTotal: number;
    deliveryFee?: number;
    serverName: string;
}

export class Sale {
    data: ISale;

    constructor() {
        this.data = this.getDefaultSale();
    }

    get id(): string {
        return this.data.id;
    }

    get saleType(): string {
        return this.data.saleType;
    }

    get saleDate(): number {
        return this.data.saleDate;
    }

    get invoiceNumber(): number {
        return this.data.invoiceNumber;
    }

    get tableNumber(): number {
        return this.data.tableNumber;
    }

    get mobile(): string {
        return this.data.mobile;
    }

    get orderTotal(): number {
        return this.data.orderTotal;
    }

    get paymentMethod(): string {
        return this.data.paymentMethod;
    }

    get paymentTotal(): number {
        return this.data.paymentTotal;
    }

    get deliveryFee(): number {
        return this.data.deliveryFee;
    }

    get serverName(): string {
        return this.data.serverName;
    }

    getDefaultSale(): ISale {
        return {
            saleType: "delivery",
            saleDate: Date.now(),
            invoiceNumber: null,
            tableNumber: null,
            mobile: null,
            orderTotal: null,
            paymentMethod: null,
            paymentTotal: null,
            deliveryFee: null,
            serverName: null
        };
    }

    getTips(): number {
        return (this.paymentTotal - this.orderTotal);
    }
}

export class Sales {
    list: Sale[];

    constructor() { }

    getTotalNumberOrders(): number {
        return this.list.length;
    }

    getTotalEFT(): number {
        const eftList = this.list.filter(sale => sale.paymentMethod === "eft");
        let eftTotal = 0;
        eftList.forEach(sale => eftTotal += sale.paymentTotal);
        return eftTotal;
    }

    getTotalCash(): number {
        const cashList = this.list.filter(sale => sale.paymentMethod === "cash");
        let cashTotal = 0;
        cashList.forEach(sale => cashTotal += sale.paymentTotal);
        return cashTotal;
    }

    getTotalCard(): number {
        const cardList = this.list.filter(sale => sale.paymentMethod === "card");
        let cardTotal = 0;
        cardList.forEach(sale => cardTotal += sale.paymentTotal);
        return cardTotal;
    }

    getFinalTotal(): number {
        let total = 0;
        this.list.forEach(sale => total += sale.paymentTotal);
        return total;
    }

    getTotalDeliveryFees(): number {
        let fees = 0;
        this.list.forEach(sale => fees += sale.deliveryFee);
        return fees;
    }

    getTotalTips(): number {
        let tips = 0;
        this.list.forEach(sale => tips += sale.getTips());
        return tips;
    }

    getSalesByServer(name: string): Sale[] {
        return this.list.filter(sale => sale.serverName === name);
    }

    getTotalOrdersByServer(name: string): number {
        let total = 0;
        this.list.forEach(sale => {
            if (sale.serverName === name) total += sale.paymentTotal
        });
        return total;
    }

    getTotalDeliveryFeesByServer(name: string): number {
        let fees = 0;
        this.list.forEach(sale => {
            if (sale.serverName === name) fees += sale.deliveryFee
        });
        return fees;
    }

    getTotalTipsByServer(name: string): number {
        let tips = 0;
        this.list.forEach(sale => {
            if (sale.serverName === name) tips += sale.getTips()
        });
        return tips;
    }

    getCommissionByServer(name: string): number {
        return 0.025 * ((this.getTotalOrdersByServer(name) - this.getTotalDeliveryFeesByServer(name)) - (0.2 * (this.getTotalOrdersByServer(name) - this.getTotalDeliveryFeesByServer(name))));
    }

    getFinalTotalByServer(name: string): number {
        return this.getTotalOrdersByServer(name) + this.getCommissionByServer(name) + this.getTotalDeliveryFeesByServer(name) + this.getTotalTipsByServer(name);
    }

    getServers(): string[] {
        let serverString = "";
        this.list.forEach(sale => serverString += sale.serverName + ",");
        const serverList = serverString.split(',');
        return serverList.filter((v, i, a) => a.indexOf(v) === i);
    }
}