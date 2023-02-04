import { Nav, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SectionProps, SectionsProps } from '../common/PropTypes';

const SectionControl = ({ section }: SectionProps) => {
	return (
		<Nav.Item>
			<Nav.Link as={Link} to="#" eventKey={section}>
				<span className="d-none d-md-block">{section}</span>
			</Nav.Link>
		</Nav.Item>
	);
};

const Sections = ({ sections, active, onChange }: SectionsProps) => {
	return (
		<>
			<Tab.Container defaultActiveKey={active} onSelect={onChange}>
				<Nav variant="pills" className="flex-column">
					{sections.map((x, i) => (
						<SectionControl key={`key_${i}`} section={x} />
					))}
				</Nav>
			</Tab.Container>
		</>
	);
};

export default Sections;
