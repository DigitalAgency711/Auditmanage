import { Card, Col, Form, Row, Container } from 'react-bootstrap';

const Create = () => {

	return (
		<Card>
			<Card.Body>				
				<Container>
					<Form>
						<Row>
							<Col lg={6}>
								<Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
									<Form.Label column sm={4}>
										Security Consultant Name :
									</Form.Label>
									<Col sm={8}>
										<Form.Control type="text" placeholder="First Name" />
									</Col>
								</Form.Group>
							</Col>
							<Col lg={6}>
								<Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">								
									<Col sm={12}>
										<Form.Control type="text" placeholder="Last Name" />
									</Col>
								</Form.Group>
							</Col>
						</Row>		
						<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
							<Form.Label column sm={2}>
								Company :
							</Form.Label>
							<Col sm={10}>
								<Form.Control type="text" placeholder="Company" />
							</Col>
						</Form.Group>	
						<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
							<Form.Label column sm={2}>
								Address :
							</Form.Label>
							<Col sm={10}>
								<Form.Control type="text" placeholder="Address" />
							</Col>
						</Form.Group>	
						<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
							<Form.Label column sm={2}>							
							</Form.Label>
							<Col sm={10}>
								<Form.Control type="text" placeholder="Address" />
							</Col>
						</Form.Group>	
						<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
							<Form.Label column sm={2}>
								Phone :
							</Form.Label>
							<Col sm={10}>
								<Form.Control type="text" placeholder="Phone" />
							</Col>
						</Form.Group>	
						<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
							<Form.Label column sm={2}>
								Email :
							</Form.Label>
							<Col sm={10}>
								<Form.Control type="email" placeholder="Email" />
							</Col>
						</Form.Group>	
					</Form>
				</Container>
			</Card.Body>
		</Card>
	);
};

export default Create;
