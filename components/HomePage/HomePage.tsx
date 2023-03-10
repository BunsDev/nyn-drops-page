import { Box, Well, Paragraph, SpinnerOG } from '@zoralabs/zord'
import ERC721DropContractProvider from '@providers/ERC721DropProvider'
import { NextPage } from 'next'
import { SubgraphERC721Drop } from 'models/subgraph'
import { MintStatus } from '@components/MintStatus'
import { MintDetails } from '@components/MintDetails'
import SeoHead from '@components/SeoHead'

interface HomePageProps {
  collection: SubgraphERC721Drop
  chainId?: number
}

const HomePage: NextPage<HomePageProps> = ({ collection }) => {
  return (
    <>
      <SeoHead />
      <div
        className="font-body flex grid grid-cols-6 p-5 justify-center align-center "
        style={{ backgroundColor: 'black' }}
      >
        <div className="order-1 flex col-span-6 md:col-span-3 justify-center">
          <img className="lg:max-w-lg" src="/images/album-cover.jpeg" />
        </div>
        <div className="order-2 flex flex-col justify-center text-md text-white md:text-2xl col-span-6 md:col-span-3 gap-5 pb-5">
          <div className="text-4xl font-bold">{process.env.NEXT_PUBLIC_TITLE}</div>
          <p>{process.env.NEXT_PUBLIC_DESCRIPTION_TEXT}</p>
          <p className="pb-5">
            While everyone has roots stretching back to Columbus, Ohio over half a decade
            ago, this project was created over the web, with collaborators in Ohio, DC and
            Argentina. “Not yet, no?” is the group&apos;s genesis music nft built as a
            collaborative EP player, powered by decentralized protocols. This 5-track EP
            features one track from each musician, as well as a closer that features input
            from everyone. It is the first of its kind for all four artists, marking the
            beginning of a new era of merging art and technology for all involved. While
            everyone was able to contribute what they saw fit, there is a cohesive
            underline highlighted by the title: “Not yet, no?”. It&apos;s a hesitation, a
            question of one&apos;s role and timing.
          </p>
        </div>
        <div className="order-3 col-span-3 flex justify-center items-center"></div>
        <div className="order-4 flex flex-col justify-start text-white text-md md:text-2xl col-span-3"></div>
        <div className="order-6 grid justify-items-center text-white	text-center lg:order-5 text-2xl col-span-6 lg:col-span-3">
          <div className="flex flex-col gap-3 text-left">
            <p className="font-bold text-center">{process.env.NEXT_PUBLIC_TITLE}</p>
            <p>Static Res - Dont get too close</p>
            <p>Tobilla - Rebel 2 the bone</p>
            <p>WhoKares - Dreamer 2000</p>
            <p>Kahlil Newton · WhoKares - ReadOnYa (DEMO)</p>
            <p>Tobilla · Kahlil Newton · Static Res · WhoKares - Bus2DC (DEMO)</p>
          </div>
          <img className="lg:max-w-lg" src="/images/tracks.jpeg" />
        </div>
        <div className="my-5 order-5 lg:order-6 flex flex-col justify-start text-xs md:text-lg col-span-6 lg:col-span-3">
          <ERC721DropContractProvider
            erc721DropAddress={process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
            chainId={parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)}
          >
            <Well
              className="rounded-none border-black bg-white"
              p="x6"
              style={{ borderBottom: 0 }}
            >
              <iframe
                className="h-[500px] sm:h-[800px]"
                src="https://cdn.warpsound.ai/ipfs/QmVYW5vHaV322Kvp2So5ErngP1PrDUneYqo4e9TNygAGSn?playlist-url=https://nftstorage.link/ipfs/bafkreiaf6cu4vfnz7kxplde2whapt76laktwrlliuizol76dgcd3zhh2ya"
                frameBorder="0"
              ></iframe>
            </Well>
            <Well className="rounded-none border-black bg-white" p="x6">
              <Box>
                {collection != null ? (
                  <>
                    <MintDetails collection={collection} showPresale={false} />
                    <MintStatus collection={collection} />
                  </>
                ) : (
                  <Paragraph align="center" mt="x8">
                    <SpinnerOG />
                  </Paragraph>
                )}
              </Box>
            </Well>
          </ERC721DropContractProvider>
        </div>
      </div>
    </>
  )
}

export default HomePage
