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
			serverName: null,
		};
	}
}

export class Sales {
	list: Array<Sale>;

	constructor() {
		this.list = new Array<Sale>();
	}

	getTotalNumberOrders(): number {
		return this.list.length;
	}

	getTotalEFT(): number {
		const eftList = this.list.filter(
			(sale) => sale.paymentMethod === "eft"
		);
		let eftTotal = 0;
		eftList.forEach((sale) => (eftTotal += sale.paymentTotal));
		return this.roundToTwoDecimalPlaces(eftTotal);
	}

	getTotalCash(): number {
		const cashList = this.list.filter(
			(sale) => sale.paymentMethod === "cash"
		);
		let cashTotal = 0;
		cashList.forEach((sale) => (cashTotal += sale.paymentTotal));
		return this.roundToTwoDecimalPlaces(cashTotal);
	}

	getTotalCard(): number {
		const cardList = this.list.filter(
			(sale) => sale.paymentMethod === "card"
		);
		let cardTotal = 0;
		cardList.forEach((sale) => (cardTotal += sale.paymentTotal));
		return this.roundToTwoDecimalPlaces(cardTotal);
	}

	getFinalTotal(): number {
		let total = 0;
		this.list.forEach((sale) => (total += sale.paymentTotal));
		return this.roundToTwoDecimalPlaces(total);
	}

	getTotalDeliveryFees(): number {
		let fees = 0;
		this.list.forEach((sale) => (fees += sale.deliveryFee));
		return this.roundToTwoDecimalPlaces(fees);
	}

	getTotalTips(): number {
		let tips = 0;
		this.list.forEach(
			(sale) => (tips += sale.paymentTotal - sale.orderTotal)
		);
		return this.roundToTwoDecimalPlaces(tips);
	}

	getSalesByServer(name: string): Sale[] {
		return this.list.filter((sale) => sale.serverName === name);
	}

	getTotalOrdersByServer(name: string): number {
		let total = 0;
		this.list.forEach((sale) => {
			if (sale.serverName === name) total += sale.orderTotal;
		});
		return this.roundToTwoDecimalPlaces(total);
	}

	getTotalDeliveryFeesByServer(name: string): number {
		let fees = 0;
		this.list.forEach((sale) => {
			if (sale.serverName === name) fees += sale.deliveryFee;
		});
		return this.roundToTwoDecimalPlaces(fees);
	}

	getTotalTipsByServer(name: string): number {
		let tips = 0;
		this.list.forEach((sale) => {
			if (sale.serverName === name)
				tips += sale.paymentTotal - sale.orderTotal;
		});
		return this.roundToTwoDecimalPlaces(tips);
	}

	getCommissionByServer(name: string): number {
		const commission =
			0.025 *
			(this.getTotalOrdersByServer(name) -
				this.getTotalDeliveryFeesByServer(name) -
				0.2 *
					(this.getTotalOrdersByServer(name) -
						this.getTotalDeliveryFeesByServer(name)));
		return this.roundToTwoDecimalPlaces(commission);
	}

	getFinalTotalByServer(name: string): number {
		if (name === "Collection")
			return this.roundToTwoDecimalPlaces(
				this.getTotalDeliveryFeesByServer(name) +
					this.getTotalTipsByServer(name)
			);
		else {
			const final =
				this.getCommissionByServer(name) +
				this.getTotalDeliveryFeesByServer(name) +
				this.getTotalTipsByServer(name);
			return this.roundToTwoDecimalPlaces(final);
		}
	}

	getServers(): Array<string> {
		const serverList = new Array<string>();
		this.list.forEach((sale) => serverList.push(sale.serverName));
		return [...new Set(serverList)];
	}

	roundToTwoDecimalPlaces(x: number): number {
		return Math.round(x * 100) / 100;
	}
}
