export const NftCard = ({ nft }) => {
    return (
        <div className="flex flex-col w-1/5">
            <div className="rounded-md">
                <img className="object-cover w-full h-64 rounded-t-md" src={nft.media[0].gateway}></img>
            </div>
            <div className="flex flex-col px-4 py-2 y-gap-2 bg-violet-100 rounded-b-md h-110">
                <div className="">
                    <h2 className="text-lg text-grey-800">{nft.title}</h2>
                    <p className="text-sm text-grey-600">{nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
                    <div className="inline-flex">
                        <p className="text-sm text-grey-600 mr-2">{`${nft.contract.address.substr(0, 6)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
                        {/* <button className="width-1/5 bg-red-100" onClick={() => {navigator.clipboard.writeText("test")}}>Boop</button> */}
                        <button onClick={() => {navigator.clipboard.writeText(`${nft.contract.address}`)}} className="bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 text-white text-xs py-0 px-1 rounded inline-flex items-center">
                            <svg className="fill-current w-4 h-4 m-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 460">
                                <path d="M425.934,0H171.662c-18.122,0-32.864,14.743-32.864,32.864v77.134h30V32.864c0-1.579,1.285-2.864,2.864-2.864h254.272
                                c1.579,0,2.864,1.285,2.864,2.864v254.272c0,1.58-1.285,2.865-2.864,2.865h-74.729v30h74.729
                                c18.121,0,32.864-14.743,32.864-32.865V32.864C458.797,14.743,444.055,0,425.934,0z"/>
                                <path d="M288.339,139.998H34.068c-18.122,0-32.865,14.743-32.865,32.865v254.272C1.204,445.257,15.946,460,34.068,460h254.272
                                c18.122,0,32.865-14.743,32.865-32.864V172.863C321.206,154.741,306.461,139.998,288.339,139.998z M288.341,430H34.068
                                c-1.58,0-2.865-1.285-2.865-2.864V172.863c0-1.58,1.285-2.865,2.865-2.865h254.272c1.58,0,2.865,1.285,2.865,2.865v254.273h0.001
                                C291.206,428.715,289.92,430,288.341,430z"/>
                            </svg>
                            {/* <span>Copy address</span> */}
                        </button>
                        {/* <button className="align-middle text-xs bg-red-400 hover:bg-red-600 text-white font-bold py-0 px-2 rounded-m inline-flex items-center"> */}
                        {/* <span>Copy Address</span> */}
                        {/* </button> */}
                        {/* <label>TEST</label> */}
                    </div>
                </div>
                <div className="flex-grow mt-2 mb-2"> 
                    <p className="text-grey-600 text-xs">{`${nft.description?.substr(0, 100)} ...`}</p>
                </div>
                <div className="flex justify-left mb-1">
                    <a className="text-xs py-2 px-4 bg-pink-400 hover:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-300 w-full text-center rounded text-white cursor-pointer" target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`} >View on Etherscan</a>
                </div>
            </div>
        </div>
    )
}