import {
	AuditorDashData,
	StatusColour,
	StatusProps,
	TableData,
} from '../common/PropTypes';
import { useTranslation } from 'react-i18next';
import { translationNs } from '../common/Constants';
import { useEffect, useState } from 'react';
import { getAuditList, getDashboard, loadUser } from 'backend';
import {
	AuditListResponse,
	Status as ApiAuditStatus,
} from 'backend/Models/AuditApi';

const getStatusCounts = (t: any, status?: ApiAuditStatus): StatusProps[] => {
	const customerCount: StatusProps = {
		label: t('status.customerCount'),
		value: status ? status.client_count : 0,
		colour: StatusColour.None,
	};

	const inProgress: StatusProps = {
		label: t('status.inProgress'),
		value: status ? status.dashboard.In_Progress : 0,
		colour: StatusColour.Warning,
	};

	const notStarted: StatusProps = {
		label: t('status.notStarted'),
		value: status ? status.dashboard.New : 0,
		colour: StatusColour.Info,
	};

	const completed: StatusProps = {
		label: t('status.completed'),
		value: status ? status.dashboard.Completed : 0,
		colour: StatusColour.Success,
	};

	return [customerCount, inProgress, notStarted, completed];
};

const mapAuditListData = (e: AuditListResponse): TableData[] => {
	if (!e.success || e.recordsTotal < 1) return [];

	return e.data.map(x => ({
		id: x.id,
		customer: x.Client.name,
		questionnaire: x.Questionnaire.name,
		status: x.status,
		respondent: x.data.respondent,
		reviewer: x.data.reviewer,
		auditor: x.data.auditor,
		auditDate: new Date(x.updatedAt).toLocaleString(),
	}));
};

const useAuditor = (): AuditorDashData => {
	const { t } = useTranslation(translationNs);

	const [busy, setBusy] = useState(false);
	const [error, setError] = useState(false);
	const [tableData, setTableData] = useState<TableData[]>([]);

	const [dashData, setDashData] = useState<StatusProps[]>(
		getStatusCounts(t, undefined)
	);

	useEffect(() => {
		setBusy(true);

		const loadDashboard = async () => {
			getDashboard(NaN, NaN).then(result => {
				if (result.ok && result.data) {
					setDashData(getStatusCounts(t, result.data));
				} else {
					setError(true);
				}
			});

			getAuditList().then(result => {
				if (result.ok && result.data) {
					const auditList = mapAuditListData(result.data);
					setTableData(auditList);
				}
			});

			await loadUser();
		};

		loadDashboard().then(() => {
			setBusy(false);
		});
	}, [t]);

	return {
		status: dashData,
		tableData,
		busy,
		error,
	};
};

export default useAuditor;
