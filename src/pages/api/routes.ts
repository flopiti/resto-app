import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export interface Routes {
  geodesic: Mode;
  bike: Mode;
  foot: Mode;
  car: Mode;
}

interface Mode {
  distance: {
    value: number;
    text: string;
  }
  duration: {
    value: number;
    text: String;
  }
}


interface APIResponseTimeToResto {
  routes: Routes;
  otherData: any;
}

const getTimeToResto = async (orig_lat: number,orig_long:number,dest_lat: number,dest_long:number): Promise<Routes> => {
    console.log(`https://api.radar.io/v1/route/distance?origin=${orig_lat}%2C${orig_long}&destination=${dest_lat}%2C${dest_long}&modes=foot,car`)
  const response = await axios.get<APIResponseTimeToResto>(`https://api.radar.io/v1/route/distance?origin=${orig_lat}%2C${orig_long}&destination=${dest_lat}%2C${dest_long}&modes=bike,foot,car`,{
    headers: {
      'Authorization': `${process.env.RADAR_API_KEY}`
    }
});
  return response.data.routes;
};


export default async function routes(req: NextApiRequest, res: NextApiResponse ) {
  console.log(req.query)
  if (req.method === 'GET') {
    try {
        const modes = await getTimeToResto(Number(req.query.orig_lat),Number(req.query.orig_long),Number(req.query.dest_lat),Number(req.query.dest_long));
        console.log(modes)
        res.status(200).json(modes);
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
  }
}