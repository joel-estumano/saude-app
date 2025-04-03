export interface EntidadeValidErrorResponse {
	error: {
		message: Record<string, string[]> | undefined;
	};
	status: number;
}
