import React, { useState } from 'react';

import { PageTitle } from 'components';
import { AppRoutes } from 'appConstants';

const Upload = React.lazy(() => import('./controls/Upload'));
const ImportDataTable = React.lazy(() => import('./controls/DataTable'));

const pageTitle = 'Import Questionnaire';

const Import = () => {
	const [id, setId] = useState(-1);
	return (
		<>
			<PageTitle
				breadCrumbItems={[
					{
						label: 'Audit',
						path: AppRoutes.ImportQuestionnaire.Full(),
					},
					{
						label: pageTitle,
						path: AppRoutes.ImportQuestionnaire.Full(),
						active: true,
					},
				]}
				title={pageTitle}
			/>
			<Upload orgId={0} onUploaded={setId} />
			<ImportDataTable questionnaireId={id} />
		</>
	);
};

export default Import;
