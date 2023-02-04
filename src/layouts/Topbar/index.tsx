import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { showRightSidebar, changeSidebarType } from 'redux/actions';
import * as layoutConstants from 'appConstants';
import { useRedux, useToggle, useViewport } from 'hooks';
import { profileMenus } from './data';
import ProfileDropdown from './ProfileDropdown';
import { useUser } from 'hooks';
import { CompanyLogo } from '../CompanyLogo';

type TopbarProps = {
	hideLogo?: boolean;
	navCssClasses?: string;
	openLeftMenuCallBack?: () => void;
	topbarDark?: boolean;
};

const Topbar = ({
	hideLogo,
	navCssClasses,
	openLeftMenuCallBack,
	topbarDark,
}: TopbarProps) => {
	const { dispatch, appSelector } = useRedux();
	const { width } = useViewport();
	const [isMenuOpened, toggleMenu] = useToggle();

	const containerCssClasses = !hideLogo ? 'container-fluid' : '';

	const { layoutType, leftSideBarType } = appSelector(state => ({
		layoutType: state.Layout.layoutType,
		leftSideBarType: state.Layout.leftSideBarType,
	}));

	/**
	 * Toggle the leftmenu when having mobile screen
	 */
	const handleLeftMenuCallBack = () => {
		toggleMenu();
		if (openLeftMenuCallBack) openLeftMenuCallBack();

		switch (layoutType) {
			case layoutConstants.LayoutTypes.LAYOUT_VERTICAL:
				if (width >= 768) {
					if (leftSideBarType === 'fixed' || leftSideBarType === 'scrollable')
						dispatch(
							changeSidebarType(
								layoutConstants.SideBarWidth.LEFT_SIDEBAR_TYPE_CONDENSED
							)
						);
					if (leftSideBarType === 'condensed')
						dispatch(
							changeSidebarType(
								layoutConstants.SideBarWidth.LEFT_SIDEBAR_TYPE_FIXED
							)
						);
				}
				break;

			case layoutConstants.LayoutTypes.LAYOUT_FULL:
				if (document.body) {
					document.body.classList.toggle('hide-menu');
				}
				break;
			default:
				break;
		}
	};

	/**
	 * Toggles the right sidebar
	 */
	const handleRightSideBar = () => {
		dispatch(showRightSidebar());
	};

	const { user, getUser } = useUser();

	return (
		<div className={classNames('navbar-custom', navCssClasses)}>
			<div className={containerCssClasses}>
				{!hideLogo && (
					<CompanyLogo
						dark={topbarDark ?? false}
						isCondensed={false}
						linkClassName="topnav-logo"
					/>
				)}

				<ul className="list-unstyled topbar-menu float-end mb-0">
					<li className="notification-list">
						<button
							className="nav-link dropdown-toggle end-bar-toggle arrow-none btn btn-link shadow-none"
							onClick={handleRightSideBar}>
							<i className="dripicons-gear noti-icon"></i>
						</button>
					</li>
					<li className="dropdown notification-list">
						<ProfileDropdown
							menuItems={profileMenus}
							username={(getUser() || user).userName}
							userTitle={user.title}
						/>
					</li>
				</ul>

				{/* toggle for vertical layout */}
				{(layoutType === layoutConstants.LayoutTypes.LAYOUT_VERTICAL ||
					layoutType === layoutConstants.LayoutTypes.LAYOUT_FULL) && (
					<button
						className="button-menu-mobile open-left"
						onClick={handleLeftMenuCallBack}>
						<i className="mdi mdi-menu" />
					</button>
				)}

				{/* toggle for horizontal layout */}
				{layoutType === layoutConstants.LayoutTypes.LAYOUT_HORIZONTAL && (
					<Link
						to="#"
						className={classNames('navbar-toggle', { open: isMenuOpened })}
						onClick={handleLeftMenuCallBack}>
						<div className="lines">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</Link>
				)}

				{/* toggle for detached layout */}
				{layoutType === layoutConstants.LayoutTypes.LAYOUT_DETACHED && (
					<Link
						to="#"
						className="button-menu-mobile disable-btn"
						onClick={handleLeftMenuCallBack}>
						<div className="lines">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</Link>
				)}
			</div>
		</div>
	);
};

export default Topbar;
