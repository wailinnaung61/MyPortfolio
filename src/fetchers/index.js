const getInformation = async () => {
	const res = await fetch(`/api/information.json`);
	return res.json();
};

const getServices = async () => {
	const res = await fetch(`/api/services.json`);
	return res.json();
};

const getTechskills = async () => {
	const res = await fetch(`/api/techskills.json`);
	return res.json();
};

const getLanguageskills = async () => {
	const res = await fetch(`/api/languageskills.json`);
	return res.json();
};

const getPortfolioFilters = async () => {
	const res = await fetch(`/api/portfoliofilters.json`);
	return res.json();
};

const getPortfolios = async () => {
	const res = await fetch(`/api/portfolios.json`);
	return res.json();
};

const getJobExperience = async () => {
	const res = await fetch(`/api/jobexperience.json`);
	return res.json();
};

const getEducationBackground = async () => {
	const res = await fetch(`/api/educationbackground.json`);
	return res.json();
};

const getCertificates = async () => {
	const res = await fetch(`/api/certificates.json`);
	return res.json();
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
