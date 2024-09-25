import ky from 'ky';
import { PUBLIC_API } from '$env/static/public';

export const API = ky.extend({
	prefixUrl: PUBLIC_API,
	headers: { 'Access-Control-Allow-Origin': '*' }
});
