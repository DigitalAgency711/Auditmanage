import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import { getMenuItems } from 'helpers';
import AppMenu from './Menu/';
import profileImg from 'assets/images/users/avatar-1.jpg';
import { useUser } from '../hooks';
import { CompanyLogo } from './CompanyLogo';

type SideBarContentProps = {
	hideUserProfile: boolean;
};

const SideBarContent = ({ hideUserProfile }: SideBarContentProps) => {
	const { user } = useUser();

	return (
		<>
			{!hideUserProfile && (
				<div className="leftbar-user">
					<Link to="/">
						<img
							src={profileImg}
							alt=""
							height="42"
							className="rounded-circle shadow-sm"
						/>
						<span className="leftbar-user-name">{user.userName}</span>
					</Link>
				</div>
			)}
			<AppMenu menuItems={getMenuItems()} />
			<div className="clearfix" />
		</>
	);
};

type LeftSidebarProps = {
	hideLogo?: boolean;
	hideUserProfile: boolean;
	isLight: boolean;
	isCondensed: boolean;
};

const LeftSidebar = ({
	isCondensed,
	isLight,
	hideUserProfile,
}: LeftSidebarProps) => {
	const menuNodeRef = useRef<HTMLDivElement>(null);

	/**
	 * Handle the click anywhere in doc
	 */
	const handleOtherClick = (e: MouseEvent) => {
		if (
			menuNodeRef &&
			menuNodeRef.current &&
			menuNodeRef.current.contains(e.target as Node)
		)
			return;
		// else hide the menubar
		if (document.body) {
			document.body.classList.remove('sidebar-enable');
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleOtherClick, false);

		return () => {
			document.removeEventListener('mousedown', handleOtherClick, false);
		};
	}, []);

	return (
		<div className="leftside-menu" ref={menuNodeRef}>
			<CompanyLogo
				dark={!isLight}
				isCondensed={isCondensed}
				linkClassName="logo text-center"
			/>

			{!isCondensed && (
				<SimpleBar
					style={{ maxHeight: '100%' }}
					timeout={500}
					scrollbarMaxSize={320}>
					<SideBarContent hideUserProfile={hideUserProfile} />
				</SimpleBar>
			)}
			{isCondensed && <SideBarContent hideUserProfile={hideUserProfile} />}
		</div>
	);
};

export default LeftSidebar;
