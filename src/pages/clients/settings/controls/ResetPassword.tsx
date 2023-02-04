import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';

const ResetPassword = () => {

	return (
		<Card>
			<Card.Title className="mt-3">Change Password</Card.Title>
			<Card.Body>
				<Container>
					<Row>
						<Form>
							<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
								<Form.Label column sm={2}>
									Old Password :
								</Form.Label>
								<Col sm={10}>
									<Form.Control type="password" placeholder="Old Password" />
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
								<Form.Label column sm={2}>
									New Password :
								</Form.Label>
								<Col sm={10}>
									<Form.Control type="password" placeholder="New Password" />
								</Col>
							</Form.Group>
							<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
								<Form.Label column sm={2}>
									Retype New Password :
								</Form.Label>
								<Col sm={10}>
									<Form.Control type="password" placeholder="Retype New Password" />
								</Col>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicCheckbox">
								<Form.Check type="checkbox" label="Enable Google 2FA" />
							</Form.Group>
							<Button variant="primary" type="submit">
								Reset Password
							</Button>
						</Form>
					</Row>	
				</Container>
			</Card.Body>
		</Card>
	);
};

export default ResetPassword;
