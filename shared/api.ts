/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

export interface DemoResponse {
  message: string;
}

export interface WalletBalanceResponse {
  address: string;
  chain: "Ethereum" | "BNB Chain" | "Solana" | "Bitcoin" | "Tron";
  balanceBase: string;
  balance: string;
  symbol: string;
}
