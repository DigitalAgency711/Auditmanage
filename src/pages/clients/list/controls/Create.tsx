import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import useCreate from '../hooks/useCreate';
import { useTranslation } from 'react-i18next';
import { translationNs } from '../../common/Constants';
import { WhiteGrowingSpinner } from 'components';
import { CreateProps } from '../../common/Types';

const Create = (e: CreateProps) => {
	const { t } = useTranslation(translationNs);
	const { busy, error, formError, register, onSubmit } = useCreate(
		e.onAdded,
		e.orgId
	);

	return (
		<Card>
			<Card.Title>{t('Create a new client')}</Card.Title>
			<Card.Body>
				<Row>
					<div>
						{error && (
							<strong className="text-danger">
								{t('create.unknownError')}
							</strong>
						)}
					</div>
				</Row>
				{!error && (
					<Form onSubmit={onSubmit}>
						<Row>
							<Col xs={5}>
								<Form.Group>
									<Form.Label htmlFor="name">
										{t('create.clientName')}
									</Form.Label>
									<InputGroup hasValidation>
										<Form.Control
											{...register('name')}
											type="text"
											name="name"
											isInvalid={formError.name}
										/>
										<Form.Control.Feedback type="invalid">
											{t('create.error.name')}
										</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>
							</Col>{' '}
						</Row>
						<Row>
							<Col xs={5}>
								<Form.Group>
									<Form.Label htmlFor="description">
										{t('create.description')}
									</Form.Label>
									<InputGroup hasValidation>
										<Form.Control
											{...register('description')}
											as="textarea"
											name="description"
											rows={3}
											cols={3}
											isInvalid={formError.description}
										/>
										<Form.Control.Feedback type="invalid">
											{t('create.error.description')}
										</Form.Control.Feedback>
									</InputGroup>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col xs={2}></Col>
							<Col xs={4}>
								<Button
									variant="primary"
									type="submit"
									disabled={busy}
									className="mt-2">
									{busy && <WhiteGrowingSpinner />}
									{t('create.add')}
								</Button>
							</Col>
							<Col xs={2}></Col>
						</Row>
					</Form>
				)}
			</Card.Body>
		</Card>
	);
};

export default Create;
