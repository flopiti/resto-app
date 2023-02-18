import BaseLayout from '@/components/BaseLayout';
import RestoList from '@/components/Restolist';

export default function Home(){
  return (  
    <BaseLayout>
    <RestoList radius={100} />
    </BaseLayout>
  );
}
