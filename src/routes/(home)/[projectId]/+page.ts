export const load = ({ params, url }) => {
	return {
		projectId: params.projectId,
		user_id_hardcode: Number(url.searchParams.get('user_id_hardcode'))
	};
};
