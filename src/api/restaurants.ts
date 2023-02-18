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

export const getRestoClose = async (radius: number): Promise<Restaurant[]> => {
  const response = await axios.get<APIResponse>(`https://api.radar.io/v1/search/places?categories=restaurant&near=45.540748%2C-73.630126&radius=${radius}`,{
    headers: {
      'Authorization' : `prj_live_pk_dcddf31cdba335e899bd19b16367d601d58452b9`
  }
});
  return response.data.places;
};
