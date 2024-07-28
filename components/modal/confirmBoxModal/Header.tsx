import Filters from "@/components/boxes/filters";
import LockCircleIcon from "@/components/ui/icons/lockCircleIcon";
import { Input } from "@/components/ui/input";
import SearchIcon from "@/components/ui/icons/searchIcon";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ConfirmBoxModalHeader = ({
  title,
  setSelectedBoxes,
  setFilterOrder,
  filterTag,
  setFilterTag,
  setSearch,
}: {
  title: string;
  setSelectedBoxes?: (value: { id: string; quantity: number }[]) => void;
  setFilterOrder?: (value: string) => void;
  filterTag: string;
  setFilterTag?: (value: string) => void;
  setSearch: (value: string) => void;
}) => {
  return (
    <>
      <div className="absolute top-0 left-0">
        <LockCircleIcon />
      </div>
      <DialogHeader>
        <DialogTitle className="mt-10 relative">
          <div className="text-[1.3rem] ml-28 pb-16">{title}</div>
          {setSelectedBoxes && (
            <div className="flex items-center justify-between">
              <div className="w-[30%]">
                <Input
                  placeholder="search"
                  className="h-8 text-base"
                  icon={<SearchIcon width="12" />}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              {setFilterOrder && setFilterTag && (
                <div className="w-[45%]">
                  <Filters
                    setFilterOrder={setFilterOrder}
                    filterTag={filterTag}
                    setFilterTag={setFilterTag}
                  />
                </div>
              )}
            </div>
          )}
        </DialogTitle>
      </DialogHeader>
    </>
  );
};

export default ConfirmBoxModalHeader;
