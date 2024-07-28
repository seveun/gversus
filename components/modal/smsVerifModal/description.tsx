import User from "@/types/User";

const SmsDescription = ({ user }: { user: User | null }) => {
  return (
    <div className="mt-2">
      Un SMS sera envoyé sur votre mobile{" "}
      <span className="underline font-bold text-white">
        {user?.phoneNumber?.replace(/\(|\)/g, "")}
      </span>{" "}
      avec votre code de vérification. Entrez le code dans le formulaire
      ci-dessus pour vérifier votre numéro de mobile.
    </div>
  );
};

export default SmsDescription;
