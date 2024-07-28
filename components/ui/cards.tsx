import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import CircleIcon from "@/components/ui/icons/circleIcon";
import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { useTranslation } from "next-i18next";

const Cards = ({
  config,
}: {
  config: {
    title: string;
    stepNumber?: number;
    description: string;
    icon: React.ElementType;
    footer?: React.ReactNode;
  }[];
}) => {
  const { t } = useTranslation("common");
  return (
    <div className="flex justify-center py-16 bg-backgroundDark border-divider">
      <Container className="flex justify-start lg:px-20">
        <div
          className={cn("overflow-x-auto flex justify-start gap-5 flex-nowrap")}
        >
          {config.map((item) => (
            <Card
              className={cn(
                "bg-secondary py-2 min-w-[190px] relative overflow-hidden w-full",
              )}
              key={item.title}
            >
              <CircleIcon
                className="absolute rotate-[45deg] -mt-16 -ml-2"
                height="250"
              />
              <CardHeader>
                <div className="bg-[#1C1D1E] w-fit p-1 rounded-full -ml-3 -mt-3">
                  <div className="bg-white/5 w-fit p-2 rounded-full scale-75">
                    <item.icon opacity={1} color="white" width="22" />
                  </div>
                </div>
              </CardHeader>
              <CardTitle>
                <div className="ml-3">
                  {item?.stepNumber && (
                    <div className="text-white text-base text-opacity-75 font-extralight">
                      {t("step")} n°{item.stepNumber}
                    </div>
                  )}
                  <div className="text-[1.2rem] text-white mt-1">
                    {item.title}
                  </div>
                </div>
              </CardTitle>
              <CardDescription className="text-[0.65rem] leading-4 font-light ml-3 mt-3">
                {item.description}
              </CardDescription>
              {item.footer && (
                <CardFooter className="text-white/70 mt-6 -ml-3">
                  {item.footer}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Cards;
