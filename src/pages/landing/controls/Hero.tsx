import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

type HeroProps = {
	children?: React.ReactNode;
};

const Hero: React.FunctionComponent<HeroProps> = ({ children }: HeroProps) => {
	const { t } = useTranslation('landing');
	return (
		<section className="hero-section">
			<Container>
				<Row className="align-items-center">
					<Col md={5}>
						<div className="mt-md-4">
							<h2 className="text-white fw-normal mb-4 mt-3 hero-title">
								{t('landing.applicationName')}
							</h2>

							<p className="mb-4 font-16 text-white-50">
								{t('landing.infoText')}
							</p>
						</div>
					</Col>
					<Col md={{ span: 5, offset: 2 }}>
						<div className="mt-3 mt-md-0">{children}</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default Hero;
export type { HeroProps };
