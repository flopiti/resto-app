import {useState, useEffect} from 'react';
import { getRestoClose } from '@/pages/api/restaurants';
import RestaurantCard from '@/components/RestaurantCard';
import { Restaurant } from "@/pages/api/restaurants";
import styles from '../../styles/styles.module.css';


const RestoList: React.FC<{ radius: number, location_lat: number, location_long: number }> = ({ radius,location_lat,location_long }) => {

    const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);


    async function loadRestaurants({radius, location_lat ,location_long}:any) {
      const url = `/api/restaurants?radius=${encodeURIComponent(radius)}&location_lat=${encodeURIComponent(location_lat)}&location_long=${encodeURIComponent(location_long)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }
      const data = await response.json();
      setRestaurants(data);
    }


    useEffect(() => {
      loadRestaurants({radius, location_lat ,location_long})
        .catch(error => console.error(error));
    }, [radius, location_lat, location_long]);


    return (
      <ul className={styles.list}>
        {restaurants ? (
          restaurants.map((resto, index) => (
            <div key={index}>
              <RestaurantCard key={resto._id} restaurant={resto} orig_lat={location_lat} orig_long={location_long} />
            </div>
          ))
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    );
    
  };


export default RestoList;