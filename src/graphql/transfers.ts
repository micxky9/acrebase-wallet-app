import { gql } from "graphql-request";

export const GET_TRANSFERS = gql`
query GetTransfers($wallet: String!) {
combinedTransfers(
  first: 1000
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