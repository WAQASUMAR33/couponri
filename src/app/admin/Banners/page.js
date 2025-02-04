'use client';
import { useEffect, useState } from 'react';
import FilterableSliderTable from './filterabletable';
import Loader from '../../../app/Loader';

const SliderPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/banners');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div className="text-center text-2xl"><Loader/></div>
      ) : (
        <FilterableSliderTable initialData={data} fetchBanners={fetchData} />
      )}
    </div>
  );
};

export default SliderPage;
