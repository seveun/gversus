import LoginModal from "@/components/modal/loginModal";
import EmailVerifModal from "@/components/modal/emailVerifModal";
import TwoAuthModal from "@/components/modal/twoAuthModal";
import VipModal from "@/components/modal/vipModal";
import { Toaster } from "@/components/ui/sonner";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Layout = ({
  children,
  authRequired = false,
}: {
  children: React.ReactNode;
  authRequired?: boolean;
  footerClassName?: string;
  socials?: boolean;
}) => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const authorized = authRequired ? !!user?.valid : true;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authorized && !isLoading) {
      router.push("/?auth=required");
    } else if (!isLoading) setTimeout(() => setLoading(false), 300);
  }, [authorized, isLoading]);

  return (
    <div className="w-full">
      <Toaster />
      <LoginModal />
      <EmailVerifModal />
      <TwoAuthModal />
      <div className="flex justify-center w-full">
        <div className="flex flex-col w-full">
          <div
            className={cn(
              "relative flex flex-col flex-grow items-center",
              "min-h-screen max-md:mt-[5.2rem] md:ml-56 2xl:ml-64",
            )}
          >
            {authorized && (
              <motion.main
                className="w-full"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: loading ? "none" : "block",
                }}
              >
                {children}
              </motion.main>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
