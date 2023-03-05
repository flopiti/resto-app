import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
export interface Restaurant {
  _id: number;
  name: string;
  location: {
    type: string;
    coordinates: Array<number>;
  }
  categories: Array<string>;
  
}


 interface APIResponseResto {
  places: Restaurant[];
  otherData: any;
}

const getRestoClose = async (radius: number,location_lat: number,location_long:number ): Promise<Restaurant[] | undefined> => {
  if(process.env.RADAR_API_KEY){
    const response = await axios.get<APIResponseResto>(
      `https://api.radar.io/v1/search/places?categories=restaurant&near=${location_lat}%2C${location_long}&radius=${radius}`,
      {
        headers: {
          Authorization: `${process.env.RADAR_API_KEY}`,
        },
      }
    );
  return response.data.places;
  }
  return [];
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