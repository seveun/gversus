import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { getCountries, CountryCode } from "libphonenumber-js";
import Flag from "react-world-flags";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface Country {
  code: CountryCode;
  name: string;
}

interface CountrySelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  className = "",
  disabled = false,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>("FR");

  useEffect(() => {
    const countryCodes = getCountries();
    const countryData = countryCodes.map((code) => ({
      code: code as CountryCode,
      name: new Intl.DisplayNames(["fr"], { type: "region" }).of(code) || code,
    }));
    setCountries(countryData);
  }, []);

  useEffect(() => {
    const selected = countries.find((country) => country.code === value);
    if (selected) {
      setSelectedCountry(selected.code);
    }
  }, [value, countries]);

  const handleCountryChange = (value: string) => {
    const selected = countries.find((country) => country.code === value);
    if (selected) {
      setSelectedCountry(selected.code);
      onChange(selected.code);
    }
  };

  return countries.length > 0 ? (
    <div className={cn(className, "relative w-full")}>
      <Select
        disabled={disabled}
        value={selectedCountry}
        onValueChange={handleCountryChange}
      >
        <SelectTrigger className={cn(className, "w-full flex items-center")}>
          <div className="absolute left-3">
            <Flag code={selectedCountry} className="w-4 h-4" />
          </div>
          <SelectValue>
            <span className="ml-8">
              {
                countries.find((country) => country.code === selectedCountry)
                  ?.name
              }
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            <SelectLabel className="bg-gray-100">Choisir un pays</SelectLabel>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <div className="flex items-center space-x-2">
                  <Flag code={country.code} className="w-6" />
                  <span>{country.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ) : (
    <Skeleton className={cn(className, "w-full")} />
  );
};

export default CountrySelect;
