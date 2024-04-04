import { getTLSCertificate, getWhoisInfo } from "@/lib/actions";
import { WhoisInfo } from "@/lib/definitions";
import CertCard from "@/components/cert-card";
import WhoisCard from "@/components/whois-card";
import { unstable_cache } from "next/cache";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CertFull from "@/components/cert-full";
import WhoisFull from "@/components/whois-full";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const getAndCacheTLSCertificate = unstable_cache(
  async (url) => getTLSCertificate(url, 443),
  ["tls-certificate"],
  {
    revalidate: 3600,
  },
);

function getBaseDomain(url: string): string {
  const parts = url.split(".");
  return [parts[parts.length - 2], parts[parts.length - 1]].join(".");
}

export default async function Page({ params }: { params: { url: string } }) {
  let tlsCertificate;
  let whoisInfo: WhoisInfo[];
  try {
    [tlsCertificate, whoisInfo] = await Promise.all([
      getAndCacheTLSCertificate(params.url),
      getWhoisInfo(getBaseDomain(params.url)),
    ]);
    if (!tlsCertificate) {
      return <p>No TLS certificate found</p>;
    }
  } catch (err) {
    return <p>Error getting TLS certificate or Whois info</p>;
  }

  return (
    <div className="pt-5">
      <div className="flex items-center justify-center gap-5 pb-2 md:justify-start">
        <h1 className="text-3xl font-bold uppercase">{params.url}</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant={"secondary"}
                className="flex cursor-default flex-col gap-1 md:flex-row"
              >
                <span>{new Date().toLocaleDateString()}</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Last updated</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="certificate">Certificate</TabsTrigger>
          <TabsTrigger value="whois">Whois</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="flex flex-col justify-center gap-5 md:flex-row">
            <CertCard certificate={tlsCertificate} />
            <WhoisCard whoisInfo={whoisInfo[0]} />
          </div>
        </TabsContent>
        <TabsContent value="certificate">
          <CertFull certificate={tlsCertificate} />
        </TabsContent>
        <TabsContent value="whois">
          <WhoisFull whoisInfoPerProvider={whoisInfo} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
