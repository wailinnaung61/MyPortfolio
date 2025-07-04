// Analytics helper function to track API success/failure
const trackAPICall = (endpoint, success, error = null) => {
	if (typeof gtag !== 'undefined') {
		gtag('event', 'api_call', {
			endpoint: endpoint,
			success: success,
			error_message: error?.message || null,
			custom_parameter_1: 'portfolio_api'
		});
	}
};

const getInformation = async () => {
	try {
		const res = await fetch(`/api/information.json`);
		const data = await res.json();
		trackAPICall('/api/information.json', true);
		return data;
	} catch (error) {
		trackAPICall('/api/information.json', false, error);
		throw error;
	}
};

const getServices = async () => {
	try {
		const res = await fetch(`/api/services.json`);
		const data = await res.json();
		trackAPICall('/api/services.json', true);
		return data;
	} catch (error) {
		trackAPICall('/api/services.json', false, error);
		throw error;
	}
};

const getTechskills = async () => {
	try {
		const res = await fetch(`/api/techskills.json`);
		const data = await res.json();
		trackAPICall('/api/techskills.json', true);
		return data;
	} catch (error) {
		trackAPICall('/api/techskills.json', false, error);
		throw error;
	}
};

const getLanguageskills = async () => {
	try {
		const res = await fetch(`/api/languageskills.json`);
		const data = await res.json();
		trackAPICall('/api/languageskills.json', true);
		return data;
	} catch (error) {
		trackAPICall('/api/languageskills.json', false, error);
		throw error;
	}
};

const getPortfolioFilters = async () => {
	try {
		const res = await fetch(`/api/portfoliofilters.json`);
		const data = await res.json();
		trackAPICall('/api/portfoliofilters.json', true);
		return data;
	} catch (error) {
		trackAPICall('/api/portfoliofilters.json', false, error);
		throw error;
	}
};

const getPortfolios = async () => {
	try {
		const res = await fetch(`/api/portfolios.json`);
		const data = await res.json();
		trackAPICall('/api/portfolios.json', true);
		return data;
	} catch (error) {
		trackAPICall('/api/portfolios.json', false, error);
		throw error;
	}
};

const getJobExperience = async () => {
	try {
		const res = await fetch(`/api/jobexperience.json`);
		const data = await res.json();
		trackAPICall('/api/jobexperience.json', true);
		return data;
	} catch (error) {
		trackAPICall('/api/jobexperience.json', false, error);
		throw error;
	}
};

const getEducationBackground = async () => {
	try {
		const res = await fetch(`/api/educationbackground.json`);
		const data = await res.json();
		trackAPICall('/api/educationbackground.json', true);
		return data;
	} catch (error) {
		trackAPICall('/api/educationbackground.json', false, error);
		throw error;
	}
};

const getCertificates = async () => {
	try {
		const res = await fetch(`/api/certificates.json`);
		const data = await res.json();
		trackAPICall('/api/certificates.json', true);
		return data;
	} catch (error) {
		trackAPICall('/api/certificates.json', false, error);
		throw error;
	}
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
