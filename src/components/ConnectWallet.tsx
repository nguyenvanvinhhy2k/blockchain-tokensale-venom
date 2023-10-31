import React from 'react';
import { VenomConnect } from 'venom-connect';

type Props = {
  venomConnect: VenomConnect | undefined;
};

function ConnectWallet({ venomConnect }: Props) {
  const login = async () => {
    if (!venomConnect) return;
    await venomConnect.connect();
  };
  return (
    <div className='pt-[40px]'>
        <h1 className='text-[40px] font-semibold'>My Venom Crowdsale</h1>
        <p>Connect Wallet to continue</p>
        <a className="text-orange-600 text-[40px] cursor-pointer" onClick={login}>
          Connect wallet
        </a>
    </div>
  );
}
  
export default ConnectWallet;