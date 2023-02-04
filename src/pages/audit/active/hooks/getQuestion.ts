import { Navigation, Question, Questions } from '../common/QuestionnaireTypes';

type navFn = (index: number, questions: Questions) => number;

const next: navFn = (index, questions) => {
	const nextIndex = index + 1;
	const hasMore = nextIndex < questions.length;
	return hasMore ? nextIndex : -1;
};

const first: navFn = (index, questions) => {
	const hasMore = questions && questions.length > 0;
	return hasMore ? 0 : -1;
};

const last: navFn = (index, questions) => {
	const hasMore = questions && questions.length > 0;
	return hasMore ? questions.length - 1 : -1;
};

const previous: navFn = index => {
	const nextIndex = index - 1;
	const hasMore = nextIndex > -1;
	return hasMore ? nextIndex : -1;
};

const none: navFn = () => {
	return -1;
};

type actionsMap = Record<Navigation, navFn>;

const actions: actionsMap = {
	[Navigation.None]: none,
	[Navigation.First]: first,
	[Navigation.Next]: next,
	[Navigation.Last]: last,
	[Navigation.Previous]: previous,
};

const getQuestion = (
	question: Question,
	questions: Questions,
	section: string,
	n: Navigation
): Question | undefined => {
	const questionsInSection = questions.filter(
		x => x.tags.indexOf(section) > -1
	);
	if (!questionsInSection) {
		//this can't really happen, but better safe than sorry
		return undefined;
	}

	const code = question.id;
	const index = questionsInSection.findIndex(q => q.id === code);
	const questionIndex = actions[n](index, questionsInSection);
	return questionIndex > -1 ? questionsInSection[questionIndex] : undefined;
};

export { getQuestion };
