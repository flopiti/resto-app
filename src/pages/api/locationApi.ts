import axios from 'axios';
import { error } from 'console';
import { NextApiRequest, NextApiResponse } from 'next';

export interface Address {
  formattedAddress: string;
}

export interface APIResponse {
  addresses: Address[];
  otherData: any;
}

export const getAutoComplete = async (search: string,location_lat: number,location_long:number ): Promise<Address[] | undefined> => {
  if(process.env.RADAR_API_KEY){
    console.log(`https://api.radar.io/v1/search/autocomplete?query=${decodeURI(search)}&near=${location_lat}%2C${location_long}`)
    const response = await axios.get<APIResponse>(
      `https://api.radar.io/v1/search/autocomplete?query=${decodeURI(search)}&${location_lat}%2C${location_long}`,
      {
        headers: {
          Authorization: `${process.env.RADAR_API_KEY}`,
        },
      }
    );
    return response.data.addresses;
  }
};


export default async function autoComplete(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const autoCompletes = await getAutoComplete(String(req.query.search),Number(req.query.location_lat),Number(req.query.location_long));
      //console.log(String(req.query.search))
      res.status(200).json(autoCompletes);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  } else {
    res.status(405).send('Method not allowed');
  }
}