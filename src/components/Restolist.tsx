import {useState, useEffect} from 'react';
import { getRestoClose } from '@/api/restaurants';
import RestaurantCard from '@/components/RestaurantCard';
import { Restaurant } from "@/api/restaurants";


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