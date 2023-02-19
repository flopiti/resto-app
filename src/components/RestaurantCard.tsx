import React from "react";
import { Restaurant } from "@/pages/api/restaurants";
import Chip from '@mui/material/Chip';
import styles from '../../styles/styles.module.css';

interface Props {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<Props> = ({ restaurant }) => {

  return (
    <div className={styles.card}>
      <div className={styles.card_header}>
      {restaurant.name}
      </div>
      <div className={styles.card_body}>
        {
          restaurant.categories.map((category) => {
            return <Chip label={category} className={styles.cat_item} />
          })
        }
      </div>
    </div>

  );
};

export default RestaurantCard;
