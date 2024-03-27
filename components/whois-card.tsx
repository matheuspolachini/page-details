import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { WhoisInfo } from "@/lib/definitions";

export default function WhoisCard({ whoisInfo }: { whoisInfo: WhoisInfo }) {
  const {
    domainName,
    createdDate,
    expiryDate,
    updatedDate,
    nameServers,
    registrar,
    rawResponseFields,
  } = whoisInfo;

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Whois</CardTitle>
        <CardDescription>Whois record details</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div>
          <h3 className="text-sm font-light">Domain name</h3>
          <p className="text-lg">{domainName}</p>
        </div>
        <div>
          <h3 className="text-sm font-light">Registrar</h3>
          <p className="text-lg">{registrar.name}</p>
        </div>
        <div>
          <h3 className="text-sm font-light">Registrar URL</h3>
          <p className="text-lg">{registrar.url}</p>
        </div>
        <div>
          <h3 className="text-sm font-light">Created Date</h3>
          <p className="text-lg">{createdDate.toDateString()}</p>
        </div>
        <div>
          <h3 className="text-sm font-light">Expiry Date</h3>
          <p className="text-lg">{expiryDate.toDateString()}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button>All fields</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Whois Data</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-96 w-full pb-5">
              {Object.keys(rawResponseFields)
                .filter((field) => field != "text")
                .map((field) => (
                  <div key={field}>
                    <p className="font-semibold">{field}: </p>
                    <p className="wrap">
                      {rawResponseFields[field].toString()}
                    </p>
                  </div>
                ))}
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
