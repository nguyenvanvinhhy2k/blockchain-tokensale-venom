import React, { useState } from 'react';
import { VenomConnect } from 'venom-connect';
import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import { toast } from "react-hot-toast";


import BigNumber from 'bignumber.js';

import tokenSaleAbi from '../abi/Tokensale.abi.json';
import LoadingClaim from './LoadingClaim';

type Props = {
  balance: string | undefined;
  getBalance: (wallet: string) => void;
  venomConnect: VenomConnect | undefined;
  address: string | undefined;
  provider: ProviderRpcClient | undefined;
};

function SaleForm({ balance, venomConnect, address, provider, getBalance }: Props) {
  const [isLoadingClaim, setIsLoadingClaim] = useState<any>(false)
  const [listNfts, setListNft] = useState<any>([
    { id: 1, title: 'VenomChads X Goofies', img: 'https://assets.grinding.today:443/grinding/upload-quest/1000051982png1698732919920.png', amout: 1 },
    { id: 2, title: 'Explore Venom 🤝 Ventory', img: 'https://assets.grinding.today:443/grinding/upload-quest/56b3d9fa-b5e9-465f-bc41-425a92f6b283jpg1698718857938.jpg', amout: 2 },
    { id: 3, title: 'Bear Shop Refill', img: 'https://assets.grinding.today:443/grinding/upload-quest/texto-del-parrafopng1698704776321.png', amout: 4 },
    { id: 4, title: 'GM Scroll! A journey into the Scroll Mainnet with unique quests.', img: 'https://assets.grinding.today:443/grinding/upload-quest/image_2023-10-30_19-45-49png1698669995862.png', amout: 3 },
    { id: 5, title: 'Scroll Origins NFT: Celebrating Scroll Mainnet Launch', img: 'https://assets.grinding.today:443/grinding/upload-quest/366png1698399763913.png', amout: 1 },
    { id: 6, title: 'Sticks & Stones', img: 'https://assets.grinding.today:443/grinding/upload-quest/1000023248jpg1698390368070.jpg', amout: 2 },
    { id: 7, title: 'BASE INTRODUCED NFT Holders.', img: 'https://assets.grinding.today:443/grinding/upload-quest/screenshot-108png1698381711271.png', amout: 4 },
    { id: 8, title: 'VENOMS OF VENOM X MAYHEM', img: 'https://assets.grinding.today:443/grinding/upload-quest/b3c8d250-02ab-4c47-b318-1e07718c4dfewebp1698362991119.webp', amout: 5 }
  ])

  const buyTokens = async ( amout: any) => {
    if (!venomConnect || !address || !amout || !provider) return;
    const userAddress = new Address(address);
    const contractAddress = new Address("0:f7f774822ecae908306caae05c973f743dc0baf1e7529256feb5be93dab0ee2c");
    const deposit = new BigNumber(amout * 10).multipliedBy(10 ** 8).toString();

    const contract = new provider.Contract(tokenSaleAbi, contractAddress);

    const amount = new BigNumber(deposit).plus(new BigNumber(1).multipliedBy(10 ** 9)).toString();
    try {
      setIsLoadingClaim(true)
      const result = await contract.methods
        .buyTokens({
          deposit,
        } as never)
        .send({
          from: userAddress,
          amount,
          bounce: true,
        });
      if (result?.id?.lt && result?.endStatus === 'active') {
        getBalance(address);
        toast.success('Mint success!!');
      } else {
        toast.error('Mint fail!!');
      }
    } catch (e) {
      console.error(e);
      toast.error('Mint fail!!');
      setIsLoadingClaim(false)
    } finally {
      setIsLoadingClaim(false)
    }
  };
  return (
    <>
     <LoadingClaim isLoadingClaim={isLoadingClaim} handleCancel={() => setIsLoadingClaim(false)}/>
      <h1 className='text-[40px] text-red-500 font-semibold'>My Venom Crowdsale</h1>
      <div className="my-[10px]">
        <span>My Token Balance: </span>
        <b className='font-bold'>{balance} VENOM</b>
      </div>
      <div className="grid grid-cols-4 gap-6 w-[60%] m-auto mt-[30px] pb-[50px]">
        {listNfts?.map((item: any) => {
          return (
            <div
              key={item.id}
              className="rounded-[16px] overflow-hidden hover:scale-[1.02] duration-300 bg-bgOpacity opacity-[0.9] text-white relative"
            >
              <div className="w-full h-full absolute unset-0 object-cover opacity-30 blur-xl">
                <img
                  src={item?.img}
                  alt="banner"
                />
              </div>
              <div
                className="rounded-[16px] overflow-hidde text-white cursor-pointer"
              >
                <div className=" overflow-hidden ">
                  <div className="w-full h-[260px] object-cover relative">
                    <img
                      className="w-full h-full object-cover"
                      src={item?.img}
                      alt=""
                    />
                  </div>
                </div>
                <div
                  className="p-[15px] rounded-b-lg bg-filter "
                  style={{ backdropFilter: "blur(10px)" }}
                >
                  <p
                    className="text-[18px] font-bold truncate"
                    title={item?.title}
                  >
                    {item?.title}
                  </p>

                  <div className="flex rounded-[26px] justify-between items-center text-[14px]">
                    <div className="flex">
                      <div className="bg-bgOpacity rounded-[26px] px-[12px] font-bold py-[5px] mr-[8px] flex items-center">
                        Amout: {item.amout} VENOM
                      </div>
                    </div>

                    <div className="flex items-center group-hover:hidden font-bold text-[18px] bg-" onClick={() => buyTokens(item.amout)}>
                      <div className="bg-bgConnect rounded-[15px] py-[8px] text-white text-[16px] font-semibold px-[20px] w-[100px] text-center mr-[8px] cursor-pointer mt-[30px] bg-orange-500 ">
                        BUY
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SaleForm;