# Alchemy Road to Web3 - Week 4
## NFT gallery using Alchemy API

This week we create a Next.js gallery that displays NFTs from the Ethereum Mainnet. The data are fetched using Alchemy's NFT-Api. Features a (wonky) page navigation implementation, as well a button that copies an NFT's collection contract address to the clipboard.

* https://youtu.be/JzsTfOFjC1o
* https://docs.alchemy.com/alchemy/road-to-web3/weekly-learning-challenges/4.-how-to-create-an-nft-gallery-alchemy-nft-api

## Weirdness
* NFT images do not always load; NFTs without images do not display a placeholder image, leading to inconsistent NFT card sizes.
* NFT cards can vary in size depending on the existence/length of the title and/or description.
* The `Prev` button only works once per `Next` button click due to limited page tracking in the API.
** this could probably be fixed by storing a `pageKey`/`startToken` array.
* Searching by collection leads to inconsistent ordering of the NFTs by token ID.
** searching by the same `pageKey` results in different ordering of the NFTs for a given page.

## Run
Before running to code, rename `.env.tmp` to `.env.local` and set `PUBLIC_NEXT_API_KEY` to your Alchemy Ethereum Mainnet API key.

To run, execute `npm run dev`.
