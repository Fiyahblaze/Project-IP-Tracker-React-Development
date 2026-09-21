export interface IpLocation {
  country: string;
  region: string;
  city: string;
  postalCode: string;
  timezone: string;
  lat: number;
  lng: number;
}

export interface IpData {
  ip: string;
  location: IpLocation;
  isp: string;
}