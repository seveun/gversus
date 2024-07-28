import User from "@/types/User";
import Modal from "./modal";
import { BattleModalProvider } from "@/context/battleModalContext";
import { Game } from "@schemas/Game.schema";

const BattleModal = ({
  opened,
  setOpened,
  user,
  game,
  position,
}: {
  opened: boolean;
  setOpened: (value: boolean) => void;
  user: User;
  game?: Game;
  position?: number;
}) => {
  return (
    <BattleModalProvider
      user={user}
      opened={opened}
      setOpened={setOpened}
      game={game}
      position={position}
    >
      <Modal opened={opened} setOpened={setOpened} game={game} />
    </BattleModalProvider>
  );
};

export default BattleModal;
