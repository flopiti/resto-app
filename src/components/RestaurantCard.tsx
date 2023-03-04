import React from "react";
import {useState, useEffect} from 'react';
import { Restaurant } from "@/pages/api/restaurants";
import { Routes } from "@/pages/api/routes";
import Chip from '@mui/material/Chip';
import styles from '../../styles/styles.module.css';

interface Props {
  restaurant: Restaurant;
  orig_lat: number; 
  orig_long: number;
}

const RestaurantCard: React.FC<Props> = ({ restaurant,orig_lat,orig_long }) => {

  const [routes, setRoutes] = useState<Routes>();

    async function loadsModes({orig_lat ,orig_long,restaurant: Restaurant}:any) {
      const url = `/api/routes?orig_lat=${encodeURIComponent(orig_lat)}&orig_long=${encodeURIComponent(orig_long)}&dest_lat=${encodeURIComponent(restaurant.location.coordinates.at(1) ?? 0)}&dest_long=${encodeURIComponent(restaurant.location.coordinates.at(0) ?? 1)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }
      const data = await response.json();
      setRoutes(data);
    }


    useEffect(() => {
      loadsModes({orig_lat ,orig_long,restaurant})
        .catch(error => console.error(error));
    }, [restaurant,orig_lat, orig_long]);

      return (
        <div className={styles.card}>
          <div className={styles.card_header}>{restaurant.name}</div>
          <div className={styles.card_body}>
            {restaurant.categories.map((category, index) => {
              return (
                <Chip
                  key={index}
                  label={category}
                  className={styles.cat_item}
                />
              );
            })}
          </div>
          {routes && (
            <div>
              <div>On foot : {Math.round(routes.foot.duration.value)} minutes</div>
              <div>Bike : {Math.round(routes.bike.duration.value)} minutes</div>
              <div>Car : {Math.round(routes.car.duration.value)} minutes</div>
            </div>
          )}
        </div>
      );
    };

export default RestaurantCard;
