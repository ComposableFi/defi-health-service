export const SERVICES_QUERY = `#graphql
  query GET_ALL_SERVICES {
    Services {
      id
      name
      chain_id
      updated_at
      webhook_url
      health_status
      contract_address
    }
  }
`;
