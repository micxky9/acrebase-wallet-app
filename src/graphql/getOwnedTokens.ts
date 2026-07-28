import { gql } from "graphql-request";

export const GET_TRANSFERRED_TOKENS = gql`
query GetTransfers($wallet: String!) {
  combinedTransfers(
    where: {
      to: $wallet
    }
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    id
    tokenId
    nftAddress
    from
    to
    blockTimestamp
    transactionHash
  }
}
`;