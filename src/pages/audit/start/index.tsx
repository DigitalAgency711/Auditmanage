import React, { useState } from 'react';
import {
	Button,
	Card,
	Col,
	Container,
	Form,
	InputGroup,
	Row,
} from 'react-bootstrap';
import { PageTitle, WhiteGrowingSpinner } from 'components';
import { AppRoutes } from 'appConstants';
import useStartAudit from './hooks/useStartAudit';
import { useTranslation } from 'react-i18next';
import { translationNs } from './common/Constants';

const Start = () => {
	const [clientId, setClientId]: any = useState(-1);
	const [quesId, setQuesId]: any = useState(-1);

	const {
		busy,
		clientList,
		questionnaireTypes,
		formError,
		register,
		onSubmit,
	} = useStartAudit(clientId, quesId);

	const { t } = useTranslation(translationNs);

	return (
		<>
			<PageTitle
				breadCrumbItems={[
					{
						label: 'Audit',
						path: AppRoutes.StartAudit.Full(),
					},
					{
						label: t('page.title'),
						path: AppRoutes.StartAudit.Full(),
						active: true,
					},
				]}
				title={t('page.title')}
			/>
			<Container>
				<Card>
					<Card.Body>
						<Form onSubmit={onSubmit}>
							<Row>
								<Col>
									<Form.Group>
										<Form.Label>{t('client.label')}</Form.Label>
										<Form.Select
											name="clientId"
											value={clientId}
											onChange={(e: any) => setClientId(e.currentTarget.value)}>
											<option>{t('select')}</option>
											{clientList.map((x, i) => (
												<option key={i} value={x.value}>
													{x.label}
												</option>
											))}
										</Form.Select>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group>
										<Form.Label htmlFor="respondentName">
											{t('respondent.label')}
										</Form.Label>
										<InputGroup hasValidation>
											<Form.Control
												{...register('respondentName')}
												type="input"
												placeholder={t('respondent.placeholder')}
												size="sm"
												id="respondentName"
												isInvalid={formError.respondentName}
											/>
											<Form.Control.Feedback type="invalid">
												{t('create.error.name')}
											</Form.Control.Feedback>
										</InputGroup>
									</Form.Group>
								</Col>
							</Row>
							<Row className="mt-2">
								<Col>
									<Form.Group>
										<Form.Label htmlFor="reviewerName">
											{t('reviewer.label')}
										</Form.Label>
										<Form.Control
											{...register('reviewerName')}
											type="input"
											placeholder={t('reviewer.placeholder')}
											size="sm"
											id="reviewerName"
										/>
									</Form.Group>
								</Col>
								<Col>
									<Form.Group>
										<Form.Label htmlFor="auditorName">
											{' '}
											{t('auditor.label')}
										</Form.Label>
										<Form.Control
											{...register('auditorName')}
											type="input"
											placeholder={t('auditor.placeholder')}
											size="sm"
											id="auditorName"
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row className="mt-3">
								<Col></Col>
								<Col>
									<Form.Group>
										<Form.Label htmlFor="name">{t('audit.label')}</Form.Label>
										<Form.Control
											{...register('name')}
											type="input"
											placeholder={t('audit.placeholder')}
											size="sm"
											id="name"
										/>
									</Form.Group>
								</Col>
								<Col></Col>
							</Row>
							<Row className="mt-3">
								<Col></Col>
								<Col>
									<Form.Group>
										<Form.Label htmlFor="description">
											{t('audit.description')}
										</Form.Label>
										<Form.Control
											{...register('description')}
											type="input"
											placeholder={t('audit.description.placeholder')}
											size="sm"
											id="description"
										/>
									</Form.Group>
								</Col>
								<Col></Col>
							</Row>

							<Row className="mt-3">
								<Col></Col>
								<Col>
									<Form.Label>Questionnaire</Form.Label>
									<Form.Select
										id="questionnaireId"
										value={quesId}
										onChange={(e: any) => setQuesId(e.currentTarget.value)}>
										<option>{t('select')}</option>
										{questionnaireTypes.map((x, i) => (
											<option key={i} value={x.value}>
												{x.label}
											</option>
										))}
									</Form.Select>
								</Col>
								<Col></Col>
							</Row>
							<div className="d-flex align-items-center justify-content-center m-2 mt-3">
								{busy && <WhiteGrowingSpinner />}
								<Button variant="primary" type="submit" disabled={busy}>
									Start
								</Button>
							</div>
						</Form>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export default Start;
