import {useState, useEffect} from 'react';
import { getRestoClose } from '@/api/restaurants';

interface Restaurant {
    _id: number;
    name: string;
  }
const RestoList: React.FC<{ radius: number }> = ({ radius }) => {
    const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
  
    useEffect(() => {
    getRestoClose(radius)
        .then(res => setRestaurants(res))
        .catch(error => console.error(error));
    }, [radius]);
  
    return (
        <ul>
          {restaurants ? (
            restaurants.map(resto => (
              <li key={resto._id}>
                <h2>{resto.name}</h2>
              </li>
            ))
          ) : (
            <li>Loading...</li>
          )}
        </ul>
      );
    
  };


export default RestoList;