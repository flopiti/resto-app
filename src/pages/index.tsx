import RestoList from '@/components/Restolist';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home(){
  return (
    <>
      <RestoList radius={100} location_lat={45.501} location_long={-73.5673} />
    </>
  );
}
