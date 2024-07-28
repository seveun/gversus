import * as AuthService from "@/services/auth.service";
import * as React from "react";

export async function getStaticProps(props: any) {
  let status = "error";
  try {
    await AuthService.validateMail(props.params.id);
    status = "succcess";
  } catch (error: any) {
    if (error?.response?.data?.error === "Email already verified") {
      status = "Email already verified";
    }
  }
  return {
    props: {
      ...props,
      status,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false,
  };
}

export const ValidateMail = (props: { status: string }) => {
  return (
    <div className="flex w-full justify-center mt-2">
      <div className="py-10 px-10 border">
        <div className="text-[1.7rem]">
          {props.status === "succcess" && "Email validé avec succès !"}
          {props.status === "error" &&
            "Essayez de valider à nouveau votre adresse e-mail"}
          {props.status === "Email already verified" && "Email déjà vérifié"}
        </div>
        <div className="text-[0.9rem] pt-4">
          {props.status === "error" &&
            "Votre demande de validation de l'adresse e-mail a expiré, ou ce lien a déjà été utilisé"}
          {props.status === "Email already verified" &&
            "Votre adresse e-mail a déjà été vérifiée"}
          {props.status === "succcess" &&
            "Vous pouvez maintenant vous connecter"}
        </div>
      </div>
    </div>
  );
};

export default ValidateMail;
