import { Optimism, Sepolia } from "@thirdweb-dev/chains";

export const domainName = "cognicraft.xyz";

export const chain = process.env.NODE_ENV === 'production' ? Optimism : Sepolia;

// Proxy address, not the implementation address
export const contractAddress = process.env.NODE_ENV === 'production' 
    ? ""
    : "0x3638C5eE25209fAeb2bc318D9C61cC3c387076F9";
