import { data } from 'autoprefixer';
import next from 'next';
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { NftCard } from './components/nftCard';

const Home = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [nftList, setNftList] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [currentTokenId, setCurrentTokenId] = useState("");
  const [prevTokenId, setPrevTokenId] = useState("");
  const [nextTokenId, setNextTokenId] = useState("");
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [currentPageKey, setCurrentPageKey] = useState("")
  const [prevPageKey, setPrevPageKey] = useState("");
  const [nextPageKey, setNextPageKey] = useState("");

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchNfts = async (pageKey) => {
    let response;
    let fetchURL;
    var requestOptions = {
      method: 'GET',
    };
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`;
    if (!collectionAddress.length) {
      console.log(`Fetching NFTs owned by ${walletAddress}...`)
      if (pageKey) {
        fetchURL = `${baseURL}?owner=${walletAddress}&pageKey=${pageKey}`;
      } else {
        fetchURL = `${baseURL}?owner=${walletAddress}`;
      }
      response = await fetch(fetchURL, requestOptions).then(data => data.json());
    } else {
      console.log(`Fetching NFTs in collection ${collectionAddress} owned by ${walletAddress}...`)
      if (pageKey) {
        fetchURL = `${baseURL}?owner=${walletAddress}&pageKey=${pageKey}&contractAddresses%5B%5D=${collectionAddress}`;
      } else {
        fetchURL = `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`;
      }
      response = await fetch(fetchURL, requestOptions).then(data => data.json());
    }
    if (response) {
      console.log("Fetched NFTs:", response);
      if (response.pageKey) {
        console.log(`response pageKey ${response.pageKey}`)
        setNextPageKey(response.pageKey);
        setHasNextPage(true);
      } else {
        setHasNextPage(false);
      }
      setNftList(response.ownedNfts);
    }
  }

  // const callGetNFTsForCollectionOnce = async (startToken = "") => {
  //   var requestOptions = {
  //     method: 'GET',
  //   };
  //   const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection`;
  //   const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&startToken=${startToken}`;
  //   // const response = await fetch(fetchURL, requestOptions).then(data => data.json());
  //   console.log(fetchURL);
  //   const response = await fetch(fetchURL, requestOptions).then(data => data.json());
  //   console.log(`TEST: RESPONSE DATA: ${response}`);
  //   return response;
  // }

  const fetchNftsForCollection = async (startToken) => {
    if (collectionAddress.length) {
      // console.log(`Fetching total number of NFTs in collection ${collectionAddress}...`);
      // let startToken = "";
      // let hasNextPage = true;
      // let totalNftsFound = 0;
      // while (hasNextPage) {
      //   const { nfts, nextToken } = await callGetNFTsForCollectionOnce(
      //     startToken
      //   );
      //   if (!nextToken) {
      //     // When nextToken is not present, then there are no more NFTs to fetch.
      //     hasNextPage = false;
      //   }
      //   startToken = nextToken;
      //   totalNftsFound += nfts.length;
      // }
      // console.log(`${totalNftsFound}`);
      console.log(`Fetching NFTs for collection ${collectionAddress}...`);
      var requestOptions = {
        method: 'GET',
      };
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTsForCollection`;
      const withMetadata = true;
      // const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&startToken=${tokenId}&withMetadata=${withMetadata}`;
      const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&startToken=${startToken}&withMetadata=${withMetadata}`;
      const response = await fetch(fetchURL, requestOptions).then(data => data.json());
      if (response) {
        console.log(`Fetched NFTs in collection ${collectionAddress}:`, response);
        setNextTokenId(response.nextToken);
        // console.log(`Current startTokenID: ${startToken}`);
        console.log(`Next startTokenID: ${nextTokenId}`);
        console.log(`Prev startTokenID: ${prevTokenId}`);
        setNftList(response.nfts);
      } else {
        console.log(`No NFTs found for collection address ${collectionAddress}.`)
      }
      if (response.nextToken) {
        setHasNextPage(true);
      }
    } else {
      console.log("Contract addresss for collection not provided.")
    }

  }

  return (
    <div className="flex flex-col items-center h-full justify-center py-8 gap-y-3">
      <div className='flex flex-col w-full items-center justify-center items-center gap-y-2'>
        <input disabled={fetchForCollection} className='w-2/5 bg-violet-100 py-2 px-2 rounded-lg text-grey-800 focus:outline-violet-300 disabled:bg-slate-50 disabled:text-grey-50' onChange={(e) => { setWalletAddress(e.target.value) }} type="text" placeholder='Add wallet address'></input>
        <input disabled={!walletAddress.length && !fetchForCollection} className='w-2/5 bg-violet-100 py-2 px-2 rounded-lg text-grey-800 focus:outline-violet-300 disabled:bg-slate-50 disabled:text-grey-50' onChange={(e) => { setCollectionAddress(e.target.value) }} type="text" placeholder='Add collection contract address'></input>
        <label className='text-grey-600'><input onChange={(e) => { setFetchForCollection(e.target.checked) }} type="checkbox" className='mr-2'></input>Search for collection</label>
        <button className={'w-1/5 disabled:bg-slate-200 text-white bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 px-4 py-2 mt-3 rounded-sm'} onClick={
          () => {
            if (fetchForCollection) {
              fetchNftsForCollection("");
            } else {
              fetchNfts("");
            }
            setHasPreviousPage(false);
          }
        }>Search</button>
      </div>
      <div className="inline-flex">
        <button disabled={!hasPreviousPage} className="bg-violet-500 disabled:bg-slate-200 hover:bg-violet-600 text-white font-bold py-2 px-4 ml-1 rounded-l" onClick={
          () => {
            if (fetchForCollection) {
              setCurrentTokenId(prevTokenId);
              fetchNftsForCollection(prevTokenId);
              setPrevTokenId("");
            } else {
              setCurrentPageKey(prevPageKey);
              fetchNfts(prevPageKey);
              setPrevPageKey("");
            }
            // Previous button only works 1 time per "Next" click due to API
            // Limitation could be circumvented by storing pageKey's in an array
            setHasPreviousPage(false);
          }
        }>Prev
        </button>
        <button disabled={!hasNextPage} className="bg-violet-500 disabled:bg-slate-200 hover:bg-violet-600 text-white font-bold py-2 px-4 ml-1 rounded-r" onClick={
          () => {

            if (fetchForCollection) {
              setPrevTokenId(currentTokenId);
              setCurrentTokenId(nextTokenId);
              fetchNftsForCollection(nextTokenId);
            } else {
              setPrevPageKey(currentPageKey);
              setCurrentPageKey(nextPageKey);
              fetchNfts(nextPageKey);
            }
            setHasPreviousPage(true);
          }
        }>Next
        </button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-2 w-5/6 gap-x-2 justify-center'>
        {
          nftList.length && nftList.map(nft => {
            return (
              <NftCard nft={nft}></NftCard>
            )
          })
        }
      </div>
      <div className="inline-flex">
        <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 ml-1 rounded-l" onClick={
          () => {
            if (fetchForCollection) {
              setStartTokenId(prevTokenId);
              // callGetNFTsForCollectionOnce();
              fetchNftsForCollection(startTokenId);
            } else {
              fetchNfts();
            }
          }
        }>Prev
        </button>
        <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 ml-1 rounded-r" onClick={
          () => {
            if (fetchForCollection) {
              setPrevTokenId(startTokenId);
              setStartTokenId(nextTokenId);
              // callGetNFTsForCollectionOnce();
              fetchNftsForCollection(startTokenId);
            } else {
              fetchNfts();
            }
          }
        }>Next
        </button>
      </div>
    </div>
  )
}

export default Home
