const maxLength = (max: number) => (value: string) =>
	value && value.length > max
		? `Must be ${max} characters or less`
		: undefined;

export const maxLength15 = maxLength(15);
