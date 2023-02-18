import {useState, useEffect} from 'react';
import { getRestoClose } from '@/api/restaurants';
import RestaurantCard from '@/components/RestaurantCard';
import { Restaurant } from "@/api/restaurants";


const RestoList: React.FC<{ radius: number, location_lat: number, location_long: number }> = ({ radius,location_lat,location_long }) => {
    const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
    useEffect(() => {
    getRestoClose(radius, location_lat ,location_long)
        .then(res => setRestaurants(res))
        .catch(error => console.error(error));
    }, [radius, location_lat, location_long]);
  
    return (
      <ul>
        {restaurants ? (
          restaurants.map((resto) => (
            <div>
              <RestaurantCard key={resto._id} restaurant={resto} />
            </div>
          ))
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    );
    
  };


export default RestoList;