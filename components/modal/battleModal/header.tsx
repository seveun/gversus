import Filters from "@/components/boxes/filters";
import { Input } from "@/components/ui/input";
import SearchIcon from "@/components/ui/icons/searchIcon";
import { useBattleModal } from "@/hooks/useBattleModal";
import { useTranslation } from "next-i18next";

const CreateModalHeader = () => {
  const { t } = useTranslation("common");
  const { setFilterOrder, setSearch } = useBattleModal();
  return (
    <div className="flex items-center pb-4 max-lg:justify-between max-md:mt-2">
      <div className="w-[50%]">
        <Input
          placeholder={t("search")}
          className="h-8 text-base"
          icon={<SearchIcon width="12" />}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-[20%] ml-2 max-lg:w-[30%] max-lg:ml-6">
        <Filters setFilterOrder={setFilterOrder} colors="bg-background" />
      </div>
    </div>
  );
};

export default CreateModalHeader;
