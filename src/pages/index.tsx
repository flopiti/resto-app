import BaseLayout from '@/components/BaseLayout';
import RestoList from '@/components/RestoList';import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export default function Home(){
  const [userLocation, setUserLocation] = useState<Coordinates>({ latitude: 0, longitude: 0 });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <BaseLayout>
      {
        userLocation.latitude === 0 && userLocation.longitude === 0 ? (
          <div>Loading...</div>
        ) : (
          <RestoList radius={400} location_lat={userLocation.latitude} location_long={userLocation.longitude} />
          )
      }
    </BaseLayout >
  );
}
