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
import { Input } from "@/components/ui/input"; // Importer le composant Input de shadcn
import {
  getCountries,
  getCountryCallingCode,
  CountryCode,
  parsePhoneNumber,
  AsYouType,
} from "libphonenumber-js";
import Flag from "react-world-flags";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "next-i18next";

interface Country {
  code: CountryCode;
  name: string;
  dialCode: string;
}

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  setError?: (error: string) => void;
  icon?: React.ReactNode;
  verified?: boolean;
  onVerify?: () => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  className = "",
  disabled = true,
  verified = false,
  value,
  onChange,
  setError,
  onVerify,
  icon,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>("FR");
  const [number, setNumber] = useState<string>();
  const [dialCode, setDialCode] = useState<string>("+33");
  const formatter = new AsYouType(selectedCountry);
  const { t } = useTranslation("common");

  useEffect(() => {
    const countryCodes = getCountries();
    const countryData = countryCodes.map((code) => ({
      code: code as CountryCode,
      name: new Intl.DisplayNames(["fr"], { type: "region" }).of(code) || code,
      dialCode: `+${getCountryCallingCode(code as CountryCode)}`,
    }));
    setCountries(countryData);
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      const code = value?.match(/\((\+[^)]+)/)?.[1];
      if (code) {
        const selected = countries.find((country) => country.dialCode === code);
        if (selected) {
          setSelectedCountry(selected.code);
          setDialCode(selected.dialCode);
          setNumber(value.split(")")[1]);
        }
      } else setNumber("");
    }
  }, [value, countries]);

  const handleVerifPhone = (countryCode: CountryCode, number: string) => {
    let isValid = false;
    let phoneNumber = number;
    let newDialCode = dialCode;
    try {
      isValid = parsePhoneNumber(number, countryCode).isValid();
      newDialCode = parsePhoneNumber(number, countryCode).countryCallingCode;
      phoneNumber = parsePhoneNumber(number, countryCode)
        .formatNational()
        .replace(/\(|\)/g, "");
    } catch (error) {
      isValid = false;
    }
    if (isValid) setError && setError("");
    else setError && setError("Numéro de téléphone invalide");
    return { phoneNumber, newDialCode: `+${newDialCode}` };
  };

  const handleCountryChange = (value: string) => {
    const selected = countries.find((country) => country.code === value);
    if (selected) {
      const { phoneNumber } = handleVerifPhone(selected.code, number || "");
      setSelectedCountry(selected.code);
      setDialCode(selected.dialCode);
      onChange && onChange(`(${selected.dialCode})` + phoneNumber);
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { phoneNumber, newDialCode } = handleVerifPhone(
      selectedCountry,
      e.target.value,
    );
    setNumber(phoneNumber);
    onChange(`(${newDialCode})` + phoneNumber);
  };
  return number !== undefined ? (
    <div>
      <div className="flex items-center space-x-2">
        <div className="relative w-1/3">
          <Select
            disabled={disabled}
            value={selectedCountry}
            onValueChange={handleCountryChange}
          >
            <SelectTrigger
              className={cn(className, "w-full flex items-center")}
            >
              <div className="absolute left-3">
                <Flag code={selectedCountry} className="w-4" />
              </div>
              <SelectValue>
                <span className="ml-5 pr-2">{dialCode}</span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Choisir un pays</SelectLabel>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center space-x-2">
                      <Flag code={country.code} className="w-6 h-4" />
                      <span>
                        {country.name}{" "}
                        {`(+${getCountryCallingCode(country.code)})`}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <Input
            size={22}
            icon={icon}
            type="tel"
            disabled={disabled}
            value={formatter.input(number)}
            onChange={handleNumberChange}
            placeholder="0656576789"
            className={cn(className, "w-full pl-4")}
          />
        </div>
      </div>
      {value && !verified && disabled && (
        <div
          onClick={onVerify}
          className="ml-[30%] mt-1 underline cursor-pointer opacity-60 hover:opacity-100"
        >
          {t("phone.verify")}
        </div>
      )}
    </div>
  ) : (
    <Skeleton className={cn(className, "w-full")} />
  );
};

export default PhoneNumberInput;
