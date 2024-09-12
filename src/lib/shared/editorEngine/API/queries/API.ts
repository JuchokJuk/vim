import ky from 'ky';
import { PUBLIC_API } from '$env/static/public';

// todo: разхардкодить дефолтного юзера
export const user_id_hardcode = 1;

export const API = ky.extend({
	prefixUrl: PUBLIC_API,
	headers: { 'Access-Control-Allow-Origin': '*' }
});
