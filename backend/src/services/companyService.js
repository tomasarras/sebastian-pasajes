import { Company } from "../db/index.js";
import { COMPANY_ID } from "../utils/constants.js";

export const update = async (companyParams) => {
    await Company.update(companyParams, { where: { id: COMPANY_ID } })
    const updatedCompany = await Company.findByPk(COMPANY_ID)
    return updatedCompany.get({ plain: true })
};

export const get = async () => {
    const [company] = await Company.findAll()
    return company.get({ plain: true })
};