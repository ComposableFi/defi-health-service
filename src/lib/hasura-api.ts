import fetch from "isomorphic-unfetch";

const HasuraRequest = async (relativePath: string) => {
  const url = `${process.env.NEXT_PUBLIC_HASURA_ENDPOINT}/${relativePath}`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_API_KEY || "",
    },
    redirect: "follow",
  };
  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const retrieveAllBridges = async () => {
  const relativePath = `bridges`;
  return HasuraRequest(relativePath);
};
