import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { initVenomConnect } from './venom-connect/configure';
import VenomConnect from 'venom-connect';
import Main from './Main';

function App() {
  const [venomConnect, setVenomConnect] = useState<VenomConnect | undefined>();
  const init = async () => {
    const _venomConnect = await initVenomConnect();
    setVenomConnect(_venomConnect);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Main venomConnect={venomConnect} />
  );
}

export default App;