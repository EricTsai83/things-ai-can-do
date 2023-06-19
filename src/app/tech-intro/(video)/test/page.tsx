import dynamic from 'next/dynamic';

const FaceMeshComponent = dynamic(() => import('./FaceMeshComponent'), {
  ssr: false,
});

const HomePage = () => {
  return (
    <div>
      <FaceMeshComponent />
    </div>
  );
};

export default HomePage;
