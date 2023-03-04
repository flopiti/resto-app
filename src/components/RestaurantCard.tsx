import React from "react";
import { Restaurant } from "@/pages/api/restaurants";
import Chip from '@mui/material/Chip';
import styles from '../../styles/styles.module.css';

interface Props {
  restaurant: Restaurant;
}
import { motion } from "framer-motion"
import { WalkingBox } from "./WalkingBox";

const RestaurantCard: React.FC<Props> = ({ restaurant }) => {

  return (
    <div className={styles.card_body_large}>
      <motion.span      
        whileHover={{  width: ["100%",  "60%"], marginLeft: ["0%", "0%"]  }}
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
        <WalkingBox />
    </div>
  );
};

export default RestaurantCard;
