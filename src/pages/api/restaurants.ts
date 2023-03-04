import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
export interface Restaurant {
  _id: number;
  name: string;
  location: object;
  categories: Array<string>;
  
}

export interface APIResponse {
  places: Restaurant[];
  otherData: any;
}

export const getRestoClose = async (radius: number,location_lat: number,location_long:number ): Promise<Restaurant[]> => {
  if(process.env.RADAR_API_KEY){
    const response = await axios.get<APIResponse>(`https://api.radar.io/v1/search/places?categories=restaurant&near=${location_lat}%2C${location_long}&radius=${radius}`,{
      headers: {
        'Authorization': `${process.env.RADAR_API_KEY}`
      }
  });
  return response.data.places;
  }
  return [];
};

export const getRestodistance = async (id: number): Promise<number> => {
  const response = await axios.get<APIResponse>(`https://api.radar.io/v1/search/places?categories=restaurant&near=45.540748%2C-73.630126&radius=${radius}`,{
    headers: {
      'Authorization': `${process.env.RADAR_API_KEY}`
    }
});
  return 2;
};


export default async function restaurants(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const restaurants = await getRestoClose(Number(req.query.radius),Number(req.query.location_lat),Number(req.query.location_long));
      res.status(200).json(restaurants);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  } else {
    res.status(405).send('Method not allowed');
  }
}