import React, { useRef } from 'react';

import { ErrorPopup, PageTitle, WhiteGrowingSpinner } from 'components';
import { AppRoutes } from 'appConstants';
import { useParams } from 'react-router-dom';
import useActiveAudit from './hooks/useActiveAudit';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

const Questions = React.lazy(() => import('./controls/Questions'));

const Active = () => {
	const { id } = useParams();
	const linkRef = useRef<HTMLAnchorElement>(null);
	const { busy, error, auditMeta, questionnaire, generatingAudit, onGenerate } =
		useActiveAudit({
			id,
			linkRef,
		});

	return (
		<>
			<PageTitle
				breadCrumbItems={[
					{
						label: 'Audit',
						path: AppRoutes.StartAudit.Full(),
					},
					{
						label: auditMeta.questionnaire,
						path: AppRoutes.StartAudit.Full(),
						active: true,
					},
				]}
				title={auditMeta.questionnaire}
			/>

			{error && (
				<ErrorPopup show={true} text="An error occurred" btnText="Close" />
			)}

			{busy && (
				<Container>
					<Row>
						<Card>
							<Card.Header>
								<h3>Loading...</h3>
							</Card.Header>
						</Card>
					</Row>
				</Container>
			)}
			{!busy && (
				<Container>
					<Row>
						<Card>
							<Card.Body>
								<Row>
									<Col>
										<h4>{`Company name : ${auditMeta.org}`}</h4>
									</Col>
									<Col>
										<h4>{`Last modified : ${auditMeta.lastModified}`}</h4>
									</Col>
								</Row>
								<Row>
									{/*<Col xs={4}>*/}
									{/*	<h3>{areaTitle}</h3>*/}
									{/*</Col>*/}
									{/*<ProgressBadges counts={progressCounts} busy={busy} />*/}
								</Row>
							</Card.Body>
						</Card>
					</Row>

					<Row>
						<Card>
							<Card.Body>
								<Questions
									questionnaire={questionnaire}
									auditId={parseInt(id ?? '0')}
								/>
							</Card.Body>
						</Card>
					</Row>

					<div className="d-flex align-items-center justify-content-center m-2 mt-3">
						<a aria-hidden="true" href="/" ref={linkRef}>
							{' '}
						</a>
						<Button
							variant="primary"
							type="submit"
							disabled={generatingAudit}
							onClick={onGenerate}>
							Generate Audit Report {generatingAudit && <WhiteGrowingSpinner />}
						</Button>
					</div>
				</Container>
			)}
		</>
	);
};

export default Active;
