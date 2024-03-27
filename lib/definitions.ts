import { z } from "zod";

export type TLSCertificate = {
  subject: string;
  subjectAltNames?: string[];
  trustChain: TLSCertificateIssuer[];
  expireDate: string;
};

export type TLSCertificateIssuer = {
  country: string;
  organization: string;
  name: string;
};

export const RawWhoisResponse = z
  .object({
    "Domain Name": z.string(),
    "Domain Status": z.array(z.string()),
    "Created Date": z.coerce.date(),
    "Expiry Date": z.coerce.date(),
    "Updated Date": z.coerce.date(),
    "Name Server": z.array(z.string()),
    Registrar: z.string(),
    "Registrar Abuse Contact Email": z.string(),
    "Registrar Abuse Contact Phone": z.string(),
    "Registrar IANA ID": z.coerce.number(),
    "Registrar URL": z.string(),
    text: z.array(z.string()),
  })
  .catchall(z.string());

export type RawHoisResponse = z.infer<typeof RawWhoisResponse>;

export type WhoisInfo = {
  whoisProvider: string;
  domainName: string;
  createdDate: Date;
  expiryDate: Date;
  updatedDate: Date;
  nameServers: string[];
  registrar: {
    name: string;
    abuseContactEmail: string;
    abuseContactPhone: string;
    ianaID: number;
    url: string;
  };
  rawResponseFields: Record<string, string>;
};
