import { GraphQLClient } from "graphql-request";

export const subgraph = new GraphQLClient(
  "https://api.studio.thegraph.com/query/1741505/ceo-subgraph-base-sepolia-v1/version/latest"
);