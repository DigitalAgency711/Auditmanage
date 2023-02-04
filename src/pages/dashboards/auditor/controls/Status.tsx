import { Card } from 'react-bootstrap';
import { StatusProps } from '../common/PropTypes';

const bgColor: string[] = ['bg-success', 'bg-info', 'bg-warning'];

const getBgColor = (index: number): string => {
	return bgColor[index];
};

const Status = ({ label, value, colour }: StatusProps) => {
	return (
		<Card className={getBgColor(colour)}>
			<Card.Body>
				<h3 className="border-bottom border-3 border-dark pb-2 text-dark text-center">
					{label}
				</h3>
				<h4 className="text-center">{value}</h4>
			</Card.Body>
		</Card>
	);
};

export default Status;
