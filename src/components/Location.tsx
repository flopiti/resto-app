import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import styles from '../../styles/styles.module.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { Address } from "@/pages/api/locationApi";
import { useState,useEffect } from 'react';



const AdressSearch: React.FC<{ location_lat: number, location_long: number }> = ({ location_lat,location_long }) =>{

    const [Adresscomplete, setAdresscomplete] = useState<readonly Address[]>([]);
    const [value, setValue] = React.useState<Address | null>(null);
    const [inputValue, setInputValue] = React.useState('');

    async function loadAdress({location_lat ,location_long}:any) {
      const url = `/api/locationApi?search=${decodeURI(inputValue)}&location_lat=${encodeURIComponent(location_lat)}&location_long=${encodeURIComponent(location_long)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }
      const data = await response.json();
      const dataSlice = data.slice(0,5)
      setAdresscomplete(dataSlice);
    }
    useEffect(() => {
      loadAdress({inputValue, location_lat ,location_long})
        .catch(error => console.error(error));
    }, [inputValue, location_lat, location_long]);
    console.log(Adresscomplete)
    return (
      <Autocomplete
        value={value}
        onInputChange={(event, newInputValue) => {
          setInputValue(decodeURI(newInputValue));
        }}
        filterOptions={(x) => x}
        options={Adresscomplete}
        getOptionLabel={(option) => option.formattedAddress}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select an option"
            variant="outlined"
          />
        )}
      />
    );
  
}

export default AdressSearch;