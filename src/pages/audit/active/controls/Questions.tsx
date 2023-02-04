import { QuestionsProps } from '../common/PropTypes';
import useQuestions from '../hooks/useQuestions';
import {
	Alert,
	Button,
	ButtonGroup,
	Col,
	Form,
	Placeholder,
	Row,
} from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { translationNs } from '../common/common';
import useResponse from '../hooks/useResponse';
import { Navigation } from '../common/QuestionnaireTypes';

const Sections = React.lazy(() => import('./Sections'));
const EvidenceTable = React.lazy(() => import('./EvidenceTable'));

const Questions = (props: QuestionsProps) => {
	const { t } = useTranslation(translationNs);
	const {
		section,
		question,
		sections,
		questions,
		resultDdlData,
		frequencyDdlData,
		statusDdlData,
		onSetSection,
		setQuestion,
	} = useQuestions(props);

	const {
		saving,
		result,
		description,
		frequency,
		status,
		error,
		onResultChange,
		setDescription,
		onFrequencyChange,
		onStatusChange,
		onDismissError,
		onMove,
	} = useResponse(question, props.auditId, questions, section, setQuestion);

	return (
		<>
			{error && (
				<Alert variant="danger" onClose={onDismissError}>
					<strong>{t('audit.active.response.errorText')}</strong>
				</Alert>
			)}
			<Row>
				<Col sm={2} className="mt-2">
					<Sections
						sections={sections}
						active={section}
						onChange={onSetSection}
					/>
				</Col>
				<Col sm={10}>
					<Row className="m-1">
						<h4 className="p-0">
							<>
								{saving && (
									<Placeholder animation="glow">
										<Placeholder md={10} />
									</Placeholder>
								)}
								{!saving && (
									<>
										<strong>{question?.id}</strong> - {question?.Fields.detail}
									</>
								)}
							</>
						</h4>
					</Row>
					<div className="border rounded-2 border-primary p-2">
						<Form>
							<Row className="m-2">
								<Col xs={4} className="p-0">
									<Form.Group>
										<Form.Label htmlFor="resultDdl">Result</Form.Label>
										<Form.Select
											id="resultDdl"
											value={result}
											disabled={saving}
											onChange={onResultChange}>
											{resultDdlData.map((x, i) => (
												<option key={i} value={x.value}>
													{x.label}
												</option>
											))}
										</Form.Select>
									</Form.Group>
								</Col>
								<Col xs={4}>
									<Form.Group>
										<Form.Label htmlFor="frequencyDdl">Frequency</Form.Label>
										<Form.Select
											id="resultDdl"
											value={frequency}
											disabled={saving}
											onChange={onFrequencyChange}>
											{frequencyDdlData.map((x, i) => (
												<option key={i} value={x.value}>
													{x.label}
												</option>
											))}
										</Form.Select>
									</Form.Group>
								</Col>
								<Col xs={4}>
									<Form.Group>
										<Form.Label htmlFor="impactControl">Impact</Form.Label>
										<Form.Control
											disabled={saving}
											plaintext
											readOnly
											className="rounded-1 border pl-2 ml-1"
											defaultValue={question?.tagDisplay}
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row className="m-2">
								<Col className="p-0">
									<Form.Group>
										<Form.Label htmlFor="descriptionInput">
											Description
										</Form.Label>
										<Form.Control
											disabled={saving}
											as="textarea"
											onChange={e => setDescription(e.target.value)}
											value={description}
											placeholder="Enter a description"
											rows={4}
											style={{ height: '100px' }}
										/>
									</Form.Group>
								</Col>
							</Row>
							<Row className="m-2">
								<Col className="p-0">
									<EvidenceTable
										auditId={props.auditId}
										questionId={question?.id ?? ''}
									/>
								</Col>
							</Row>
							<Row className="m-2">
								<Col xs={4}>
									<div className="mt-3 float-start">
										<ButtonGroup>
											<Button
												color="info"
												onClick={() => onMove(Navigation.First)}
												disabled={saving}>
												First
											</Button>
											<Button
												color="primary"
												onClick={() => onMove(Navigation.Previous)}
												disabled={saving}>
												Previous
											</Button>
										</ButtonGroup>
									</div>
								</Col>
								<Col xs={4} className="p-0">
									<Form.Group>
										<Form.Label htmlFor="statusDdl">Status</Form.Label>
										<Form.Select
											id="statusDdl"
											value={status}
											disabled={saving}
											onChange={onStatusChange}>
											{statusDdlData.map((x, i) => (
												<option key={i} value={x.value}>
													{x.label}
												</option>
											))}
										</Form.Select>
									</Form.Group>
								</Col>
								<Col xs={4}>
									<div className="mt-3 float-end">
										<ButtonGroup>
											<Button
												color="info"
												onClick={() => onMove(Navigation.Next)}
												disabled={saving}>
												Next
											</Button>
											<Button
												color="primary"
												onClick={() => onMove(Navigation.Last)}
												disabled={saving}>
												Last
											</Button>
										</ButtonGroup>
									</div>
								</Col>
							</Row>
						</Form>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default Questions;
