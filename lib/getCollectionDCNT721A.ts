import { Contract } from "ethers"
import abi from "@lib/abi/abi-DCNT721A.json"
import abiMetadata from "@lib/abi/abi-DCNTMetadataRenderer.json"
import { ipfsImage } from "./helpers"
import axios from "axios"
import getErc721Drop from "./getErc721Drop"

const getCollectionDCNT721A = async (contractAddress: string, provider: any) => {
    try {
        const contract = new Contract(contractAddress, abi, provider)
        const baseURI = await contract.baseURI();
        let metadata;
        if (baseURI) {
            const metadataURI = ipfsImage(baseURI)
            const { data } = await axios.get(metadataURI)
            metadata = data
        } else {
            const metadataRendererAddress = await contract.metadataRenderer();
            const metadataRenderer = new Contract(metadataRendererAddress, abiMetadata, provider)
            const tokenURITarget = await metadataRenderer.tokenURITarget(0, contractAddress)
            const startIndex = tokenURITarget.indexOf(",") + 1
            const sub = tokenURITarget.substring(startIndex)
            const parse = atob(sub)
            try {
                let s = parse.replace(/\\n/g, "\\n")
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
                // Remove non-printable and other non-valid JSON characters
                s = parse.replace(/[\u0000-\u0019]+/g,"");
                metadata = JSON.parse(s);

            } catch (e) {
                console.error(e)
            }
        }
        const price = await contract.tokenPrice()
        const maxSalePurchasePerAddress = await contract.maxTokenPurchase()
        const totalSupply = await contract.totalSupply()
        const maxSupply = await contract.MAX_TOKENS();
        const publicSaleStart = await contract.saleStart()
        const publicSaleEnd = await contract.saleEnd()

        const dropParams = {
            contractAddress,
            metadata,
            price,
            maxSalePurchasePerAddress,
            totalSupply,
            maxSupply,
            publicSaleStart: publicSaleStart.toString(),
            publicSaleEnd: publicSaleEnd.toString(),
            contractType: "DCNT"
        }
        const erc721Drop = getErc721Drop(dropParams)
        return erc721Drop
    }catch(e) {
        return false
    }
}

export default getCollectionDCNT721A