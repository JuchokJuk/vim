export function load({ url }) {
	return {
		url: url.pathname,
		user_id_hardcode: Number(url.searchParams.get('user_id_hardcode'))
	};
}
