'use client'
import React, { useState, useRef, useCallback } from "react";
import dynamic from 'next/dynamic';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import { store, persistor } from "@store/store";
import Loader  from '@component/common/Loader';

const HomeComponents = dynamic(() => import('./_app'), {
  loading: () => <Loader />
});

export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HomeComponents />
      </PersistGate>
    </Provider>
  );
}
