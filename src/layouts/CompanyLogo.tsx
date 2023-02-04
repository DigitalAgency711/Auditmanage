import { Link } from 'react-router-dom';
import { AppRoutes, copyrightText } from '../appConstants';
import { useEffect, useState } from 'react';

type CompanyLogoProps = {
	dark: boolean;
	isCondensed: boolean;
	linkClassName: string;
};

const baseCss: string =
	'border border-primary rounded-2 bg-primary p-2 fw-bolder fs-3 text-';
const getCss = (dark: boolean): string => baseCss + (dark ? 'light' : 'dark');

const CompanyLogo = ({
	dark,
	linkClassName,
	isCondensed,
}: CompanyLogoProps) => {
	const [logoCss, setCss] = useState(getCss(dark));
	const [hide, setHide] = useState(isCondensed);

	useEffect(() => {
		setHide(isCondensed);
	}, [isCondensed]);

	useEffect(() => {
		setCss(getCss(dark));
	}, [dark]);

	return (
		<Link to={AppRoutes.Dashboard.Full()} className={linkClassName}>
			<span className={logoCss}>
				{!hide && copyrightText.CompanyName}
				{hide && copyrightText.CompanyInitials}
			</span>
		</Link>
	);
};

export { CompanyLogo };
