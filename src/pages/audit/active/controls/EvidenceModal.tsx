import { EvidenceModalProps } from '../common/PropTypes';
import {
	Button,
	ButtonGroup,
	Form,
	FormGroup,
	InputGroup,
	Modal,
	Row,
} from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useEvidence from '../hooks/useEvidence';

const EvidenceModal = ({
	auditId,
	questionId,
	evidence,
	show,
	onClose,
}: EvidenceModalProps) => {
	const { t } = useTranslation('audit');

	const { isOpen, busy, formError, register, error, onDismiss, onSubmit } =
		useEvidence(evidence, show, onClose, auditId, questionId);

	return (
		<>
			<Modal show={isOpen} onHide={onDismiss}>
				<Modal.Header onHide={onDismiss} closeButton>
					{t('audit.evidence.modalTitle')}
				</Modal.Header>
				<Modal.Body>
					{error && (
						<span className="text-danger">{t('audit.evidence.error')}</span>
					)}
					<Form onSubmit={onSubmit}>
						<Row>
							<FormGroup>
								<Form.Label htmlFor="name">
									{t('audit.evidence.nameLabel')}
								</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										{...register('name')}
										type="input"
										id="name"
										isInvalid={formError.name}
										placeholder={t(
											'audit.evidence.nameLabel.placeholder'
										)}></Form.Control>
									<Form.Control.Feedback type="invalid">
										{t('audit.evidence.error.name')}
									</Form.Control.Feedback>
								</InputGroup>
							</FormGroup>
						</Row>
						<Row>
							<FormGroup>
								<Form.Label htmlFor="description">
									{t('audit.evidence.descriptionLabel')}
								</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										{...register('description')}
										type="input"
										id="description"
										isInvalid={formError.description}
										placeholder={t(
											'audit.evidence.descriptionLabel.placeholder'
										)}></Form.Control>
									<Form.Control.Feedback type="invalid">
										{t('audit.evidence.error.description')}
									</Form.Control.Feedback>
								</InputGroup>
							</FormGroup>
						</Row>
						<Row>
							<FormGroup>
								<Form.Label htmlFor="date">
									{t('audit.evidence.dateLabel')}
								</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										{...register('date')}
										type="date"
										id="date"
										isInvalid={formError.date}></Form.Control>
									<Form.Control.Feedback type="invalid">
										{t('audit.evidence.error.date')}
									</Form.Control.Feedback>
								</InputGroup>
							</FormGroup>
						</Row>
						<Row>
							<FormGroup>
								<Form.Label htmlFor="reviewer">
									{t('audit.evidence.reviewerLabel')}
								</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										{...register('reviewer')}
										type="input"
										id="reviewer"
										isInvalid={formError.reviewer}
										placeholder={t(
											'audit.evidence.reviewerLabel.placeholder'
										)}></Form.Control>
									<Form.Control.Feedback type="invalid">
										{t('audit.evidence.error.reviewer')}
									</Form.Control.Feedback>
								</InputGroup>
							</FormGroup>
						</Row>
						<Row>
							<FormGroup>
								<Form.Label htmlFor="comments">
									{t('audit.evidence.commentsLabel')}
								</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										{...register('comments')}
										type="input"
										id="comments"
										isInvalid={formError.comments}
										placeholder={t(
											'audit.evidence.commentsLabel.placeholder'
										)}></Form.Control>
									<Form.Control.Feedback type="invalid">
										{t('audit.evidence.error.comments')}
									</Form.Control.Feedback>
								</InputGroup>
							</FormGroup>
						</Row>
						<Row>
							<FormGroup>
								<Form.Label htmlFor="approver">
									{t('audit.evidence.approverLabel')}
								</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										{...register('approver')}
										type="input"
										id="approver"
										isInvalid={formError.approver}
										placeholder={t(
											'audit.evidence.approverLabel.placeholder'
										)}></Form.Control>
									<Form.Control.Feedback type="invalid">
										{t('audit.evidence.error.description')}
									</Form.Control.Feedback>
								</InputGroup>
							</FormGroup>
						</Row>
						<Row>
							<FormGroup>
								<Form.Label htmlFor="file">
									{t('audit.evidence.fileLabel')}
								</Form.Label>
								<InputGroup hasValidation>
									<Form.Control
										{...register('file')}
										type="file"
										size="sm"
										id="file"
										isInvalid={formError.evidenceFile}></Form.Control>
									<Form.Control.Feedback type="invalid">
										{t('audit.evidence.error.file')}
									</Form.Control.Feedback>
								</InputGroup>
							</FormGroup>
						</Row>

						<Row className="float-end">
							<ButtonGroup>
								<Button onClick={onDismiss} variant="secondary" className="m-1">
									{t('audit.evidence.button.cancel')}
								</Button>
								<Button
									type="submit"
									variant="primary"
									className="m-1"
									disabled={busy}>
									{t('audit.evidence.button.save')}
								</Button>
							</ButtonGroup>
						</Row>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default EvidenceModal;
