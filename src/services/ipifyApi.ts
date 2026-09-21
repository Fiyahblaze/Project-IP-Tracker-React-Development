import type { IpData } from "../types/ip";

const API_URL = "https://geo.ipify.org/api/v2/country,city";

function isIpAddress(searchTerm: string): boolean {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(searchTerm);
}

export async function fetchIpData(searchTerm = ""): Promise<IpData> {
  const apiKey = import.meta.env.VITE_IPIFY_API_KEY;

  if (!apiKey) {
    throw new Error("The IPify API key is missing.");
  }

  const url = new URL(API_URL);
  url.searchParams.set("apiKey", apiKey);

  if (searchTerm) {
    const searchType = isIpAddress(searchTerm) ? "ipAddress" : "domain";
    url.searchParams.set(searchType, searchTerm);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to find that IP address or domain.");
  }

  return (await response.json()) as IpData;
}