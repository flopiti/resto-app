import React, { useEffect, useState } from "react";
import { Restaurant } from "@/pages/api/restaurants";
import Chip from '@mui/material/Chip';
import styles from '../../styles/styles.module.css';
import { motion } from "framer-motion"
import { WalkingBox } from "./WalkingBox";
import { Routes } from "@/pages/api/routes";
import { CarBox } from "./CarBox";
import { BikeBox } from "./BikeBox";

interface Props {
  restaurant: Restaurant;
  orig_lat: number; 
  orig_long: number;
}


const RestaurantCard: React.FC<Props> = ({ restaurant,orig_lat,orig_long }) => {

  const [routes, setRoutes] = useState<Routes>();
  const [showBoxes, setShowBoxes] = useState(false);


  const containerVariants = {
    hidden: { width: '100%' },
    visible: { width: 'calc(100% - 212px)', transition: { duration: 0.5 } },
  };

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
      if(!restaurant || !orig_lat || !orig_long) return;
      loadsModes({orig_lat ,orig_long,restaurant})
        .catch(error => console.error(error));
    }, [restaurant,orig_lat, orig_long]);

  return (
    <motion.div className={styles.card_body_large}
    onHoverStart={e => {
      setShowBoxes(true);
    }}
    onHoverEnd={e => {
      setShowBoxes(false);
    }}  
    >
        <motion.span 
        animate={showBoxes ? 'visible' : 'hidden'}
        variants={containerVariants}
        whileTap={{ scale: 0.9 }} 
        className={styles.card}>
        <div className={styles.card_header}>
          {restaurant.name}
        </div>
        <div className={styles.card_body}>
          {
            restaurant.categories.map((category, index) => {
              return <Chip key={index} label={category} className={styles.cat_item} />
            })
          }
        </div>
        </motion.span>
        <motion.span className={styles.restOfCard}>
            <WalkingBox
              timeInMins={Math.round(routes?.foot.duration.value ?? 0)}
            />
            <CarBox
              timeInMins={Math.round(routes?.car.duration.value ?? 0)}
            />
            <BikeBox timeInMins={Math.round(routes?.bike.duration.value ?? 0)} />
        </motion.span>
    </motion.div>
  );
};

export default RestaurantCard;