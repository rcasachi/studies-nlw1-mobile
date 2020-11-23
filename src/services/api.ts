import axios from 'axios';

export interface Item {
  id: number;
  title: string;
  image_url: string;
};

export interface Point {
  id: number;
  image: string;
  image_url: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
};

export interface PointsQueryParams {
  city: string;
  state: string;
  items: number[];
}

const api = axios.create({
  baseURL: 'http://192.168.0.109:3333',
});

export default api;

export const getItems = api.get('items');

export const getPoints = (params: PointsQueryParams) => api.get('points', { params });

export const getPoint = (id: number) => api.get(`points/${id}`);