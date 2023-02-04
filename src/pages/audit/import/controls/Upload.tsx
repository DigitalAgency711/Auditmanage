import {
	Button,
	Card,
	Col,
	Container,
	Form,
	InputGroup,
	Row,
} from 'react-bootstrap';
import { ErrorPopup, WhiteGrowingSpinner } from 'components';
import useUpload from '../hooks/useUpload';
import React from 'react';
import { translationNs } from '../common/constants';
import { useTranslation } from 'react-i18next';
import { UploadProps } from '../common/PropTypes';

const Upload = (e: UploadProps) => {
	const { t } = useTranslation(translationNs);
	const { busy, error, formError, register, onReset, onSubmit } = useUpload(e);

	return (
		<>
			<Container>
				<Card>
					<Card.Body>
						{error && (
							<ErrorPopup
								show={error}
								text={t('import.upload.generalError')}
								btnText={t('import.error.modal.cancelBtn')}
								onToggle={onReset}
							/>
						)}
						{!error && (
							<Form onSubmit={onSubmit}>
								<Row>
									<Col sm={4}>
										<div className="m-2">
											<Form.Group>
												<Form.Label htmlFor="csvFile">
													{t('import.upload.fileSelect')}
												</Form.Label>
												<InputGroup hasValidation>
													<Form.Control
														{...register('csvFile')}
														type="file"
														size="sm"
														id="csvFile"
														isInvalid={formError.csvFile}
													/>
													<Form.Control.Feedback type="invalid">
														{t('import.upload.fileError')}
													</Form.Control.Feedback>
												</InputGroup>
											</Form.Group>
										</div>
									</Col>
									<Col sm={2}>
										<div>
											<div className="m-2">
												<Form.Group>
													<Form.Label htmlFor="name">
														{t('import.upload.name')}
													</Form.Label>
													<InputGroup hasValidation>
														<Form.Control
															{...register('name')}
															type="input"
															placeholder="SIG"
															size="sm"
															id="name"
															isInvalid={formError.name}
														/>
														<Form.Control.Feedback type="invalid">
															{t('import.upload.nameError')}
														</Form.Control.Feedback>
													</InputGroup>
												</Form.Group>
											</div>
										</div>
									</Col>
									<Col sm={2}>
										<div>
											<div className="m-2">
												<Form.Group>
													<Form.Label htmlFor="versionInput">
														{t('import.upload.version')}
													</Form.Label>
													<InputGroup hasValidation>
														<Form.Control
															{...register('version')}
															type="input"
															placeholder="30"
															size="sm"
															id="versionInput"
															isInvalid={formError.version}
														/>
														<Form.Control.Feedback type="invalid">
															{t('import.upload.versionError')}
														</Form.Control.Feedback>
													</InputGroup>
												</Form.Group>
											</div>
										</div>
									</Col>
									<Col sm={2}>
										<div>
											<div className="m-2">
												<Form.Group>
													<Form.Label htmlFor="auditYear">
														{t('import.upload.year')}
													</Form.Label>
													<InputGroup hasValidation>
														<Form.Control
															{...register('auditYear')}
															type="input"
															placeholder="2022"
															size="sm"
															id="auditYear"
															isInvalid={formError.auditYear}
														/>
														<Form.Control.Feedback type="invalid">
															{t('import.upload.yearError')}
														</Form.Control.Feedback>
													</InputGroup>
												</Form.Group>
											</div>
										</div>
									</Col>
									<Col sm={2}>
										<div className="mt-4">
											<div className="m-2">
												<Button variant="primary" type="submit" disabled={busy}>
													{busy && <WhiteGrowingSpinner />}
													{t('import.upload.buttonLabel')}
												</Button>
											</div>
										</div>
									</Col>
								</Row>
							</Form>
						)}
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export default Upload;
