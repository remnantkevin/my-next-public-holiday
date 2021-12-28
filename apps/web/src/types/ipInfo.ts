/**
 * Response from IPInfo service.
 *
 * @example
 * {
 *    ip: "111.111.11.11",
 *    city: "Sydney",
 *    region: "New South Wales",
 *    country: "AU",
 *    loc: "-61.9522,130.8614",
 *    org: "AS4764 Aussie Broadband",
 *    postal: "6801",
 *    timezone: "Australia/Sydney"
 * }
 */
export interface IpInfo {
  /** IPv4 address. */
  ip: string;
  /** Full city name. */
  city: string;
  /** Full region name. */
  region: string;
  /** ISO-2 country code. */
  country: string;
  /** Longitude and latitude coordinates. */
  loc: string;
  /** Internet Service Provider. */
  org: string;
  /** Postal code. */
  postal: string;
  /** Name of timezone in the timezone database. */
  timezone: string;
}
