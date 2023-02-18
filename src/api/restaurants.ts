import axios from 'axios';

export interface Restaurant {
  _id: number;
  name: string;
  location: object;
  categories: Array<string>;
  
}

interface APIResponse {
  places: Restaurant[];
  otherData: any;
}

export const getRestoClose = async (radius: number,location_lat: number,location_long:number ): Promise<Restaurant[]> => {
  const response = await axios.get<APIResponse>(`https://api.radar.io/v1/search/places?categories=restaurant&near=${location_lat}%2C${location_long}&radius=${radius}`,{
    headers: {
      'Authorization' : ``
  }
});

  return response.data.places;
};

export const getRestodistance = async (id: number): Promise<number> => {
  const response = await axios.get<APIResponse>(`https://api.radar.io/v1/search/places?categories=restaurant&near=45.540748%2C-73.630126&radius=${radius}`,{
    headers: {
      'Authorization' : ''
  }
});
  return 2;
};
