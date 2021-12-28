import { IpInfo } from "../types/ipInfo";

export async function getIpInfo() {
  const response = await fetch(
    `https://ipinfo.io/json?token=${import.meta.env.VITE_IPINFO_ACCESS_TOKEN}`
  );
  const ipInfo: IpInfo = await response.json();
  return ipInfo;
}
