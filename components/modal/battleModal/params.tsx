import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import LockIcon from "@/components/ui/icons/lockIcon";
import { useBattleModal } from "@/hooks/useBattleModal";
import { useTranslation } from "next-i18next";

const gameModeChoice = [
  { value: "classic", label: "Classic" },
  { value: "crazy", label: "Crazy" },
];

const modeChoice = [
  { value: "1v1", label: "1 vs. 1" },
  { value: "1v1v1", label: "1 vs. 1 vs. 1" },
  { value: "1v1v1v1", label: "1 vs. 1 vs. 1 vs. 1" },
  { value: "2v2", label: "2 vs. 2" },
];

const CreateModalParams = ({ disabled }: { disabled: boolean }) => {
  const { t } = useTranslation(["modals", "common"]);

  const statusChoice = [
    { value: "public", label: t("modal.battle.public") },
    { value: "private", label: t("modal.battle.private") },
  ];
  const { form } = useBattleModal();
  let maxBotLength = 3;
  if (form.getValues("battleMode") === "1v1") maxBotLength = 1;
  else if (form.getValues("battleMode") === "1v1v1") maxBotLength = 2;
  return (
    <div className="mt-5">
      <Form {...form}>
        <form>
          <div className="bg-background p-4 rounded-md grid grid-cols-2 gap-4 text-[0.7rem]">
            <div>
              <span className="ml-1">{t("modal.battle.status")}</span>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        disabled={disabled}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full mr-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {statusChoice.map((s) => (
                              <SelectItem key={s.value} value={s.value}>
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <span className="ml-1">{t("modal.battle.mode")}</span>
              <FormField
                control={form.control}
                name="battleMode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        disabled={disabled}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full mr-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {modeChoice.map((s) => (
                              <SelectItem key={s.value} value={s.value}>
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <span className="ml-1">{t("modal.battle.game.mode")}</span>
              <FormField
                control={form.control}
                name="battleType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        disabled={disabled}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full mr-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {gameModeChoice.map((s) => (
                              <SelectItem key={s.value} value={s.value}>
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <span className="ml-1">{t("modal.battle.bot")}</span>
              <FormField
                control={form.control}
                name="bot"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        disabled={disabled}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full mr-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="0">
                              {t("disabled", { ns: "common" })}
                            </SelectItem>
                            {Array.from(
                              { length: maxBotLength },
                              (_, i) => i + 1,
                            ).map((s) => (
                              <SelectItem key={s} value={s.toString()}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          {form.getValues("status") === "private" && (
            <div className="flex items-center mt-6 text-[0.7rem]">
              <div className="text-nowrap">{t("modal.battle.password")}</div>
              <div className="w-full ml-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          icon={<LockIcon width="14" />}
                          className="h-8"
                          placeholder="*********"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CreateModalParams;
