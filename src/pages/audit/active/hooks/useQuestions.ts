import { QuestionsProps } from '../common/PropTypes';
import { useEffect, useState } from 'react';
import {
	FrequencyDdlData,
	Question,
	ResultDdlData,
	StatusDdlData,
	Questions,
} from '../common/QuestionnaireTypes';
import { QuestionData } from 'backend/Models/QuestionnaireApi';

const mapToQuestions = (q: QuestionData[]): Questions =>
	q.map(x => ({
		PrimaryTag: x.primary_tag,
		Fields: {
			detail: x.question_fields.control_detail,
			name: x.question_fields.short_name,
		},
		id: x.question_id,
		section: x.section,
		sectionNumber: x.section_number,
		serialId: x.serial_id,
		tags: x.tags,
		tagDisplay: x.tags.join(', '),
	}));

const getQuestion = (section: string, questions: Questions): Question => {
	let index = questions.findIndex(q => q.PrimaryTag === section);
	if (index > -1) {
		return questions[index];
	}

	return questions[0];
};

const useQuestions = ({ questionnaire }: QuestionsProps) => {
	const [sections, setSections] = useState<string[]>(['']);
	const [section, setSection] = useState<string>('');
	const [questions, setQuestions] = useState<Questions>([]);
	const [question, setQuestion] = useState<Question>();

	useEffect(() => {
		const sections = questionnaire.question_sections;
		const questions = mapToQuestions(questionnaire.question_data);
		setSections(sections);
		setSection(sections[0]);
		setQuestions(questions);

		setQuestion(getQuestion(sections[0], questions));
	}, [questionnaire]);

	const onSetSection = (e: any) => {
		setSection(e);
		const q = getQuestion(e, questions);
		setQuestion(q);
	};

	//const onQuestionChanged =

	return {
		section,
		question,
		sections,
		questions,
		resultDdlData: ResultDdlData,
		frequencyDdlData: FrequencyDdlData,
		statusDdlData: StatusDdlData,
		onSetSection,
		setQuestion,
	};
};

export default useQuestions;
