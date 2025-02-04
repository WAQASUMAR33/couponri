'use client';
import React, { Suspense } from 'react';
import MainSearchPage from './component/MainPage';
import Loader from '../../../app/Loader';

export default function Home() {
  return (
    <Suspense fallback={<Loader/>}>
      <MainSearchPage />
    </Suspense>
  );
}
