import User from "@/types/User";

const TwoAuthDescription = ({ user }: { user: User | null }) => {
  return (
    <>
      {user?.twoFactor !== "app" && (
        <div className="mt-2">
          Nous venons de vous envoyer un message via {user?.twoFactor}{" "}
          <span className="underline font-bold text-white">
            {user?.twoFactor === "sms"
              ? user?.phoneNumber
              : user?.twoFactor === "email"
                ? user?.email
                : ""}
          </span>{" "}
          avec votre code d'authentification. Entrez le code dans le formulaire
          ci-dessus pour vérifier votre identité.
        </div>
      )}
      {user?.twoFactor === "app" && (
        <div className="mt-2">
          Ouvrez votre application d'authentification et entrez le code
          d'authentification généré pour vérifier votre identité.
        </div>
      )}
    </>
  );
};

export default TwoAuthDescription;
