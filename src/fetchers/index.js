import { http } from "./http";

const getInformation = async () => {
	let res = await http.get(`api/information.json`);
	return res.data;
};

const getServices = async () => {
	let res = await http.get(`api/services.json`);
	return res.data;
};

const getTechskills = async () => {
	let res = await http.get(`api/techskills.json`);
	return res.data;
};

const getLanguageskills = async () => {
	let res = await http.get(`api/languageskills.json`);
	return res.data;
};

const getPortfolioFilters = async () => {
	let res = await http.get(`api/portfoliofilters.json`);
	return res.data;
};

const getPortfolios = async () => {
	let res = await http.get(`api/portfolios.json`);
	return res.data;
};

const getJobExperience = async () => {
	let res = await http.get(`api/jobexperience.json`);
	return res.data;
};

const getEducationBackground = async () => {
	let res = await http.get(`api/educationbackground.json`);
	return res.data;
};

const getCertificates = async () => {
	let res = await http.get(`api/certificates.json`);
	return res.data;
};

export {
	getCertificates,
	getEducationBackground,
	getInformation,
	getJobExperience,
	getLanguageskills,
	getPortfolioFilters,
	getPortfolios,
	getServices,
	getTechskills,
};
