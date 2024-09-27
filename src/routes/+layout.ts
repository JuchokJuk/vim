export function load({ url }) {
	return {
		url: url.pathname,
		useId: Number(url.searchParams.get('user_id_hardcode')),
	};
}
