import SteamIcon from "@/components/ui/icons/steamIcon";
import GoogleIcon from "@/components/ui/icons/googleIcon";
import FacebookIcon from "@/components/ui/icons/facebookIcon";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const LoginModalProviders = () => {
  const { handleGoogleLogin, handleFacebookLogin, handleSteamLogin } =
    useAuth();

  return (
    <div className="flex-col">
      <Button
        size="lg"
        variant="outline"
        className="gap-2 w-full mt-3"
        onClick={handleSteamLogin}
      >
        <div className="flex items-center">
          <SteamIcon />
          Connexion avec Steam
        </div>
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="gap-2 w-full mt-2.5"
        onClick={handleGoogleLogin}
      >
        <div className="flex items-center">
          <GoogleIcon />
          Connexion avec Google
        </div>
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="gap-2 w-full mt-2.5"
        onClick={handleFacebookLogin}
      >
        <div className="flex items-center">
          <FacebookIcon />
          Connexion avec Facebook
        </div>
      </Button>
    </div>
  );
};

export default LoginModalProviders;
