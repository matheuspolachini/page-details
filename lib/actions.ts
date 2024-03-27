"use server";

import tls from "node:tls";
import {
  RawHoisResponse,
  RawWhoisResponse,
  TLSCertificate,
  WhoisInfo,
} from "@/lib/definitions";
import whoiser, { WhoisSearchResult } from "whoiser";

export async function getTLSCertificate(
  hostname: string,
  port: number,
): Promise<TLSCertificate | undefined> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(port, hostname, { servername: hostname });
    socket.setTimeout(3000, () => reject(new Error("Connection timed out")));

    socket.once("error", (error) => {
      reject(error);
    });

    socket.once("secureConnect", () => {
      const certificate = socket.getPeerCertificate(true);

      const trustChain = [];
      let issuer = certificate.issuerCertificate;
      while (issuer) {
        trustChain.push({
          country: issuer.subject.C,
          organization: issuer.subject.O,
          name: issuer.subject.CN,
        });

        // Self signed certificates have a circular reference
        if (issuer.issuerCertificate == issuer) {
          break;
        }

        issuer = issuer.issuerCertificate;
      }

      resolve({
        subject: certificate.subject.CN,
        subjectAltNames: certificate.subjectaltname?.split(","),
        trustChain,
        expireDate: certificate.valid_to,
      });

      socket.destroy();
    });
  });
}

export async function getWhoisInfo(domain: string): Promise<WhoisInfo[]> {
  const rawResponse = await whoiser(domain);

  const whoisInfo: WhoisInfo[] = [];

  for (const provider in rawResponse) {
    const rawProviderData = rawResponse[provider];
    const parsedData = RawWhoisResponse.parse(rawProviderData);
    whoisInfo.push({
      whoisProvider: provider,
      domainName: parsedData["Domain Name"],
      createdDate: parsedData["Created Date"],
      expiryDate: parsedData["Expiry Date"],
      updatedDate: parsedData["Updated Date"],
      nameServers: parsedData["Name Server"],
      registrar: {
        name: parsedData["Registrar"],
        abuseContactEmail: parsedData["Registrar Abuse Contact Email"],
        abuseContactPhone: parsedData["Registrar Abuse Contact Phone"],
        ianaID: parsedData["Registrar IANA ID"],
        url: parsedData["Registrar URL"],
      },
      rawResponseFields: parsedData,
    });
  }

  return whoisInfo;
}
