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
}