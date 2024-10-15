import { PaymentOrder } from "../db/index.js"

export const getAll = async () => {
	const paymentOrders = await PaymentOrder.findAll()
	return paymentOrders
};