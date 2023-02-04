const isError = (response: any): boolean => {
	return !response.ok || response.status > 399;
};

const isNotFound = (response: any): boolean => response.status === 404;

const errorResponse = { ok: false, data: undefined };

const emptySuccess = { ok: true, data: undefined };

export { isError, isNotFound, errorResponse, emptySuccess };
