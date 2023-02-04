import { Col, Container, Row } from 'react-bootstrap';
import { copyrightText } from '../../../appConstants/CopyrightText';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gradient py-5 mt-5">
            <Container>
                <Row>
                    <h5 className="text-dark">{copyrightText.CompanyName}</h5>
                </Row>
                <Row>
                    <Col lg={3}>
                        <Row>
                            <Col>
                                {' '}
                                <Link to="#" className="text-muted">
                                    About Us
                                </Link>
                            </Col>
                            <Col>
                                {' '}
                                <Link to="#" className="text-muted">
                                    Contact
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={3}>
                        <span className="text-muted mt-4 text-center mb-0">{copyrightText.FooterText}</span>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
