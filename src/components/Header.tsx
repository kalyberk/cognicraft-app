import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";

export const Header = ({ showConnectWallet = true }) => {
  return (
    <header>
      <nav>
        <Link href="/">
          <Image
            src="/cognicraft.svg"
            height={52}
            width={52}
            alt="CogniCraft"
          />
        </Link>
      </nav>
      {showConnectWallet && (
        <ConnectWallet
          theme="dark"
          switchToActiveChain={true}
          style={{ height: "36px" }}
        />
      )}
    </header>
  );
};
