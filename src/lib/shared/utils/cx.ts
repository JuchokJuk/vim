export function cx(...classNames: string[]) {
	return classNames.filter(Boolean).join(' ');
}
