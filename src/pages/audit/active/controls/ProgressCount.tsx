import { Card } from 'react-bootstrap';
import { ProgressCountProps } from '../common/PropTypes';
import { Spinner } from 'components';

const bgColor: string[] = ['bg-success', 'bg-info', 'bg-warning', 'bg-primary'];

const getBgColor = (index: number): string => {
	return bgColor[index];
};

const ProgressCount = ({ label, value, colour, busy }: ProgressCountProps) => {
	return (
		<Card className={getBgColor(colour)}>
			<Card.Body>
				<h4 className="border-bottom border-3 border-dark pb-2 text-dark">
					{label}
				</h4>
				{busy && (
					<Spinner
						tag="h4"
						className="spinner-grow-sm me-1"
						color="light"
						type="grow"
					/>
				)}
				{!busy && <h4 className="text-dark">{value}</h4>}
			</Card.Body>
		</Card>
	);
};

export default ProgressCount;
