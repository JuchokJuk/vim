import ky from 'ky';
import { PUBLIC_API } from '$env/static/public';

export const API = ky.extend({
	prefixUrl: PUBLIC_API,
	retry: {
		limit: 10,
		methods: ['get', 'post', 'put', 'patch', 'delete'],
		statusCodes: [413],
		backoffLimit: 3000
	}
});
