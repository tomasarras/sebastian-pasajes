import { Provider } from "../db/index.js"
export const getAll = async () => {
	const providers = await Provider.findAll()
	return providers
};
