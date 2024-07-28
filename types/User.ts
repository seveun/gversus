import { User as UserType } from "@schemas/User.schema";
import { User as FirebaseUser } from "firebase/auth";

type User = {
  accessToken: string;
  firebase: FirebaseUser;
  valid: boolean;
  wallets: { type: string; amount: number }[];
  sessionId: string;
} & UserType;

export default User;
