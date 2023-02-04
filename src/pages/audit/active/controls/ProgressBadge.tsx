import { ProgressCountProps, ProgressCountsProps } from '../common/PropTypes';
import { Col } from 'react-bootstrap';
import React from 'react';
import { Spinner } from 'components';

const bgColor: string[] = ['bg-success', 'bg-info', 'bg-warning', 'bg-primary'];

const ProgressBadge = ({ label, value, colour }: ProgressCountProps) => {
	return (
		<>
			<Col xs={3} className={'border border-1 ' + bgColor[colour]}>
				<h4 className="text-dark border-bottom border-2 border-dark pb-1 text-center">
					{label}
				</h4>
				<h4 className="text-dark text-center">{value}</h4>
			</Col>
		</>
	);
};

const ProgressBadges = ({ counts, busy }: ProgressCountsProps) => {
	return (
		<>
			{!busy &&
				counts.map((x, i) => (
					<ProgressBadge key={`Count_${i}`} {...x} busy={busy} />
				))}
			{busy && (
				<Col>
					<Spinner
						tag="h3"
						className="spinner-grow-sm me-1"
						color="dark"
						type="grow"
					/>
				</Col>
			)}
		</>
	);
};

export default ProgressBadges;
