import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Box as BoxType } from "@schemas/Box.schema";
import BoxGrid from "@/components/boxGrid";
import { cn } from "@/lib/utils";
import { useState } from "react";
import moment from "moment";
import User from "@/types/User";
import Buttons from "./Buttons";
import Header from "./Header";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const ConfirmBoxModal = ({
  boxes,
  fastOpening,
  opened,
  setOpened,
  selectedBoxes,
  setSelectedBoxes,
  setFastOpening,
  title,
  user,
  wallet,
}: {
  boxes: BoxType[];
  fastOpening: boolean;
  opened: boolean;
  setOpened: (value: boolean) => void;
  selectedBoxes: { id: string; quantity: number }[];
  setSelectedBoxes?: (value: { id: string; quantity: number }[]) => void;
  setFastOpening?: (value: boolean) => void;
  title: string;
  user: User;
  wallet: string;
}) => {
  const [filterTag, setFilterTag] = useState("");
  const [filterOrder, setFilterOrder] = useState("newest");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { min } = useBreakpoint();

  const filteredBoxes = boxes
    .filter((b) => filterTag === "" || b.tag === filterTag)
    .filter((b) => b?.name?.toLowerCase()?.includes(search.toLowerCase()))
    .sort((a, b) => {
      if (filterOrder === "price-low") return a.price - b.price;
      if (filterOrder === "price-high") return b.price - a.price;
      if (filterOrder === "newest")
        return moment(a.createdAt).unix() - moment(b.createdAt).unix();
      if (filterOrder === "oldest")
        return moment(b.createdAt).unix() - moment(a.createdAt).unix();
      return 0;
    });

  return (
    <Dialog open={opened} onOpenChange={(o) => !isLoading && setOpened(o)}>
      <DialogContent
        className={cn(
          "min-w-[62%] bg-secondary overflow-hidden flex flex-col justify-center",
          "max-md:min-w-[100%] max-lg:min-w-[90%] h-[98%] max-h-[45rem]",
        )}
      >
        <DialogDescription
          className={cn(isLoading && "opacity-50 cursor-not-allowed")}
        >
          <Header
            title={title}
            setSelectedBoxes={setSelectedBoxes}
            setFilterOrder={min("sm") ? setFilterOrder : undefined}
            filterTag={filterTag}
            setFilterTag={min("sm") ? setFilterTag : undefined}
            setSearch={setSearch}
          />
          <div className="relative mt-1.5">
            <div
              className={cn(
                "border bg-background rounded-md overflow-auto min-h-96",
                setSelectedBoxes && "h-96",
              )}
            >
              <BoxGrid
                boxes={filteredBoxes}
                selectedBoxes={selectedBoxes}
                setSelectedBoxes={setSelectedBoxes}
                variant="confirm"
              />
            </div>
            <Buttons
              boxes={boxes}
              selectedBoxes={selectedBoxes}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              user={user}
              setSelectedBoxes={setSelectedBoxes}
              setOpened={setOpened}
              fastOpening={fastOpening}
              setFastOpening={setFastOpening}
              wallet={wallet}
            />
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmBoxModal;
