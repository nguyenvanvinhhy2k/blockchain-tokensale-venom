import { useEffect, useState } from 'react';
import { VenomConnect } from 'venom-connect';
import LogOutImg from './style/img/log-out.svg';
import ConnectWallet from './components/ConnectWallet'
import SaleForm from './components/SaleForm';

type Props = {
  venomConnect: VenomConnect | undefined;
};

function Main({ venomConnect }: Props) {
  const [venomProvider, setVenomProvider] = useState<any>();
  const [address, setAddress] = useState<any>();
  const [ provider, setProvider] = useState<any>()
  const [balance, setBalance] = useState<any>(0);

  // Phương pháp này cho phép tạo địa chỉ ví từ nhà cung cấp inpage
  const getAddress = async (provider: any) => {
    const providerState = await provider?.getProviderState?.();
    return providerState?.permissions.accountInteraction?.address?.toString();
  };

  
  // Fomart $$ VENOM
  const formatVenomBalance = (value: any) => {
    return Number(value || 0) / 10 ** 9
  };

  // Mọi tương tác với ví venom (bao gồm tìm nạp địa chỉ) đều cần được xác thực
  const checkAuth = async (_venomConnect: any) => {
    const auth = await _venomConnect?.checkAuth();
    setProvider(auth)
    if (auth) await getAddress(_venomConnect);
  };

  const getBalance = async () => {
    if (!venomConnect) return;
      try {
          const response = await provider?.getBalance(address);
          setBalance(formatVenomBalance(response).toFixed(1))
      } catch (e) {
        console.error(e);
      }
  };

  // Trình xử lý này sẽ được gọi sau hành động VenomConnect.login()
  // Trạng thái connect
  const onConnect = async (provider: any) => {
    setVenomProvider(provider);
    await onProviderReady(provider);
  };
  // Trình xử lý này sẽ được gọi sau hành động VenomConnect.disconnect()
  const onDisconnect = async () => {
    venomProvider?.disconnect();
    setAddress(undefined);
    setBalance(undefined);
  };


  useEffect(() => {
    if (address) getBalance();
  }, [address]);

  // nhận được địa chỉ và số dư từ đó.
  const onProviderReady = async (provider: any) => {
    const venomWalletAddress = provider ? await getAddress(provider) : undefined;
    setAddress(venomWalletAddress);
  };

  useEffect(() => {
    // kết nối xử lý sự kiện
    const off = venomConnect?.on('connect', onConnect);
    if (venomConnect) {
      checkAuth(venomConnect);
    }
    return () => {
      off?.();
    };
  }, [venomConnect]);
  
  return (
    <div className="m-auto text-center text-white bg-[#000000] min-h-[100vh]">
     {address && (
        <div className='flex justify-end pt-[10px] mr-[10px]'>
          <p className='mr-[10px]'>{address}</p>
          <a className="cursor-pointer" onClick={onDisconnect}>
            <img src={LogOutImg} alt="Log out" />
          </a>
        </div>
      )}
       {address ? (
          <SaleForm
            address={address}
            balance={balance}
            venomConnect={venomConnect}
            provider={venomProvider}
            getBalance={getBalance}
          />
        ) : (
          <ConnectWallet venomConnect={venomConnect} />
        )}
     
    </div>
  );
}
export default Main;