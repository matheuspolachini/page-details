import { TLSCertificate } from "@/lib/definitions";
import { Separator } from "./ui/separator";

export default function CertFull({
  certificate,
}: {
  certificate: TLSCertificate;
}) {
  return (
    <>
      <div>
        <h3 className="text-sm font-light uppercase">Subject</h3>
        <p className="text-lg">{certificate.subject}</p>
      </div>

      <div>
        <h3 className="text-sm font-light uppercase">Expiry date</h3>
        <p className="text-lg">{certificate.expireDate}</p>
      </div>

      <div>
        <h3 className="text-sm font-light uppercase">Subject alt names</h3>
        <ul className="grid list-none grid-cols-1 border md:grid-cols-2 lg:grid-cols-3">
          {certificate.subjectAltNames?.map((altName) => (
            <div key={altName}>
              <li>{altName.split(":")[1]}</li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
