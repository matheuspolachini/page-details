"use client";

import { WhoisInfo } from "@/lib/definitions";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { cn } from "@/lib/utils";

export default function WhoisFull({
  whoisInfoPerProvider,
}: {
  whoisInfoPerProvider: WhoisInfo[];
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const fields = whoisInfoPerProvider[value].rawResponseFields;

  return (
    <>
      <div className="my-3 items-center gap-5 py-2">
        <h3 className="text-sm uppercase">Whois Provider</h3>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-fit justify-between"
            >
              {whoisInfoPerProvider[value].whoisProvider}
              <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0">
            <Command>
              <CommandEmpty>No provider found</CommandEmpty>
              <CommandGroup>
                {whoisInfoPerProvider.map((providerData, index) => (
                  <CommandItem
                    key={index}
                    value={index.toString()}
                    onSelect={(currentValue) => {
                      setValue(Number(currentValue));
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === index ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {providerData.whoisProvider}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {Object.keys(fields).map((field) => (
        <div key={field} className="hover:bg-gray-100">
          <div className="py-2">
            <h3 className="text-sm font-light uppercase">{field}</h3>
            <p className="text-lg">{fields[field].toString()}</p>
          </div>
          <Separator />
        </div>
      ))}
    </>
  );
}
