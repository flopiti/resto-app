import BaseLayout from '@/components/BaseLayout';
import RestoList from '@/components/Restolist';

export default function Home(){
  return (  
    <BaseLayout>
      <RestoList radius={100} location_lat={45.501} location_long={-73.5673} />
    </BaseLayout>
  );
}
