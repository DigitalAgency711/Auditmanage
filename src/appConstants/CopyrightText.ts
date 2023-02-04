const copyRightYear = () => new Date().getFullYear();
const companyName = 'TalaAudit';
const applicationName = 'TalaSecure Audit Application';

const copyrightText = {
	CompanyInitials: 'TA',
	CompanyName: companyName,
	ApplicationName: applicationName,
	CopyRightYear: copyRightYear,
	FooterText: `${copyRightYear()} © ${companyName}`,
};

export { copyrightText };
