import axios from 'axios';

export const URL = "http://localhost:3001";
export default axios.create({
	baseURL: URL
})