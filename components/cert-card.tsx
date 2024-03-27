import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TLSCertificate } from "../lib/definitions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function CertCard({
  certificate,
}: {
  certificate: TLSCertificate;
}) {
  const altNamesCount = certificate.subjectAltNames?.length || 0;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Certificate</CardTitle>
        <CardDescription>TLS certificate details</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div>
          <h3 className="text-sm font-light">Subject</h3>
          <p className="text-lg">{certificate.subject}</p>
        </div>
        <div>
          <h3 className="text-sm font-light">Subject alt names</h3>
          <ul>
            <ScrollArea className="">
              {certificate.subjectAltNames?.slice(0, 3).map((altName) => (
                <div key={altName}>
                  <li className="text-lg">{altName.split(":")[1]}</li>
                  <Separator className="my-2" />
                </div>
              ))}
            </ScrollArea>
            {altNamesCount > 3 && (
              <p className="text-sm">+{altNamesCount - 3} more</p>
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-light">Expiry date</h3>
          <p className="text-lg">{certificate.expireDate}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Trust chain</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Certificate Trust Chain</DialogTitle>
            </DialogHeader>
            {certificate.trustChain.map((issuer) => (
              <div key={issuer.name}>
                <p className="font-semibold">{issuer.name}</p>
                <p className="text-sm">{issuer.organization}</p>
                <p className="text-sm">{issuer.country}</p>
              </div>
            ))}
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
