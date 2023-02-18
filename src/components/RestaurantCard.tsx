import React from "react";
import { Card } from "react-bootstrap";
import { Restaurant } from "@/api/restaurants";
import Chip from '@mui/material/Chip';
import styles from '../../styles/styles.module.css';

interface Props {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<Props> = ({ restaurant }) => {

  return (
    <Card className={styles.card}>
      <Card.Body>
        <Card.Header>{restaurant.name}</Card.Header>
        {
          restaurant.categories.map((category) => {
            return <Chip label={category} />
          })

        }
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;
