import { DialogDescription } from "@/components/ui/dialog";
import { cdn, numberFormatter, cn } from "@/lib/utils";
import EuroIcon from "@/components/ui/icons/euroIcon";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import RarityTag from "@/components/rarityTag";
import Loader from "@/components/ui/loader";
import { useWonItem } from "@/hooks/useWonItem";

const WonItemModalDescription = () => {
  const { items, isLoading, selectedItems, handleSelectItem, isSoldLoading } =
    useWonItem();
  return (
    <DialogDescription
      className={cn(
        "relative grid grid-cols-4 overflow-auto min-h-80 max-h-80 gap-4 bg-background p-3 rounded-lg",
        isSoldLoading && "pointer-events-none opacity-50",
        "2xl:grid-cols-5 max-md:grid-cols-2",
      )}
    >
      {isLoading && (
        <div className="absolute z-30 w-full h-full flex justify-center items-center">
          <Loader width="30" />
        </div>
      )}
      {items
        ?.sort((a, b) => {
          return (a.type === "item" ? -1 : 1) - (b.type === "item" ? -1 : 1);
        })
        .map((item, idx) => {
          const isSelected = selectedItems.includes(item.id);
          return (
            item.itemData &&
            !isLoading && (
              <Card
                onClick={() => handleSelectItem(item)}
                key={item.id + idx}
                className={cn(
                  "relative w-full h-[8.7rem]  border rounded-lg bg-secondary no-underline",
                  isSelected && "bg-[#212225]",
                  item.type === "item" && "cursor-pointer",
                )}
              >
                <CardContent className="w-full h-[6rem] flex justify-center mt-4">
                  {item.type === "item" && (
                    <Checkbox
                      checked={isSelected}
                      className="absolute top-2 left-2"
                    />
                  )}
                  <div className="relative w-full h-[85%] 2xl:scale-105">
                    <Image
                      src={cdn(item.itemData?.image)}
                      layout="fill"
                      objectFit="contain"
                      objectPosition="top"
                      alt="item-image"
                    />
                  </div>
                </CardContent>
                <div className="-mt-6">
                  {item?.amountEur && (
                    <div className="w-full flex items-end ml-3 text-white mb-2">
                      <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between">
                          <div>{item.itemData?.name.slice(0, 15)}</div>
                          {item.itemData.tag && (
                            <RarityTag
                              className="mr-6 scale-125"
                              onlyPoint
                              rarity={item.itemData.tag}
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-1 opacity-50 -mt-1">
                          {numberFormatter.format(item?.amountEur)}
                          <EuroIcon width="11" />
                          {item.type === "sold" && (
                            <div className="text-primary ml-2">Vendu</div>
                          )}
                          {item.type === "ordered" && (
                            <div className="text-primary ml-2">Commandé</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )
          );
        })}
    </DialogDescription>
  );
};

export default WonItemModalDescription;
