import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Button, Modal } from 'react-bootstrap';

const useModal = ({ show, onToggle }: any) => {
	const [isOpen, setIsOpen] = useState(show);

	useEffect(() => {
		setIsOpen(show);
	}, [show]);

	const toggleModal = () => {
		const current = !isOpen;
		setIsOpen(current);
		if (onToggle) {
			onToggle(current);
		}
	};

	return { isOpen, toggleModal };
};

export type ErrorPopupType = {
	show: Boolean;
	onToggle?: (val: boolean) => void;
	text: string;
	btnText: string;
};

const ErrorPopup = ({ show, onToggle, text, btnText }: ErrorPopupType) => {
	const { isOpen, toggleModal } = useModal({ show, onToggle });

	return (
		<>
			<Modal show={isOpen} onHide={toggleModal} size="sm">
				<div className={classNames('modal-filled', 'bg-danger')}>
					<Modal.Body className="p-4">
						<div className="text-center">
							<h4 className="mt-2">
								<i className="dripicons-cross h1"></i>
							</h4>
							<p className="mt-3">{text}</p>
							<Button variant="light" className="my-2" onClick={toggleModal}>
								{btnText}
							</Button>
						</div>
					</Modal.Body>
				</div>
			</Modal>
		</>
	);
};

export default ErrorPopup;
