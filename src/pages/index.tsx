import BaseLayout from '@/components/BaseLayout';
import RestoList from '@/components/RestoList';import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export default function Home(){
  const [userLocation, setUserLocation] = useState<Coordinates>();
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
    <React.StrictMode>
      <BaseLayout>
      {userLocation ? (
        <RestoList
        radius={900}
        location_lat={userLocation.latitude}
        location_long={userLocation.longitude}
      />
      ): (
        <li>No location acces , please give acces to GeoLocation</li>
      )}
      </BaseLayout>
    </React.StrictMode>
  );
}
