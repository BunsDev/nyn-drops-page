import { utils } from 'ethers'
import { GetStaticProps } from 'next'
import getDefaultProvider from '@lib/getDefaultProvider'
import { allChains } from 'wagmi'
import HomePage from '@components/HomePage/HomePage'
import getCollectionDCNT721A from '@lib/getCollectionDCNT721A'
import getCollectionChillDrop from '@lib/getCollectionChillDrop'

const MintPage = ({ collection, chainId }) => (
  <HomePage collection={collection} chainId={chainId} />
)
export default MintPage

export const getServerSideProps: GetStaticProps = async (context) => {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  if (!utils.isAddress(contractAddress.toString())) {
    return {
      notFound: true,
    }
  }

  // Create Ethers Contract
  const chain = allChains.find((chain) => chain.id.toString() === chainId)
  const provider = getDefaultProvider(chain.network, chainId)
  const contractAddressString = contractAddress.toString()

  // Get metadata renderer
  try {
    const dcntCollection = await getCollectionDCNT721A(contractAddressString, provider)
    if (dcntCollection) {
      return {
        props: { collection: dcntCollection, chainId: chain.id },
      }
    }
    const chillCollection = await getCollectionChillDrop(contractAddressString, provider)
    return {
      props: { collection: chillCollection, chainId: chain.id },
    }
  } catch (error) {
    console.error(error)
    return {
      props: { collection: {}, chainId: chain.id },
    }
  }
}
