import React from "react";
import { Card } from "react-bootstrap";
import { Restaurant } from "@/api/restaurants";

interface Props {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<Props> = ({ restaurant }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Header>{restaurant.name}</Card.Header>
        <Card.Text>{restaurant.categories}</Card.Text>

      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;
