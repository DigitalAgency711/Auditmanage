import { questionnaireTypes, versions } from 'appConstants';
import { toDdlData } from 'utils';

const defaultLabel = 'Select...';

const toExport = {
	questionnaireTypes: toDdlData(questionnaireTypes, defaultLabel),
	versions: toDdlData(versions, defaultLabel),
};

export default toExport;
