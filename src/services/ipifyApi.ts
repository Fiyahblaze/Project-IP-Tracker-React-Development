import type { IpData } from "../types/ip";

const API_URL = "https://geo.ipify.org/api/v2/country,city";

function isIpAddress(searchTerm: string): boolean {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(searchTerm);
}

export async function fetchIpData(
  searchTerm = "",
  signal?: AbortSignal,
): Promise<IpData> {
  const apiKey = "at_8q7zetpdPKm2t2zyq2vZjfN7VTcNC";

  if (!apiKey) {
    throw new Error(
      "The IPify API key is missing. Check your .env file.",
    );
  }

  const url = new URL(API_URL);

  url.searchParams.set("apiKey", apiKey);

  if (searchTerm) {
    const searchType = isIpAddress(searchTerm)
      ? "ipAddress"
      : "domain";

    url.searchParams.set(searchType, searchTerm);
  }

  let response: Response;

  try {
    response = await fetch(url, { signal });
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      throw error;
    }

    throw new Error(
  "Unable to connect to IPify. Check your internet connection.",
  { cause: error },
);
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        "The IPify API key is missing or invalid.",
      );
    }

    if (response.status === 403) {
      throw new Error(
        "IPify access is restricted. Check your API key and available credits.",
      );
    }

    if (response.status === 422) {
      throw new Error(
        "IPify could not process that IP address or domain.",
      );
    }

    if (response.status === 429) {
      throw new Error(
        "Too many searches. Please wait and try again.",
      );
    }

    if (response.status >= 500) {
      throw new Error(
        "The IPify service is currently unavailable. Please try again later.",
      );
    }

    throw new Error(
      `IPify request failed with status ${response.status}.`,
    );
  }

  return (await response.json()) as IpData;
}