import { RequestHandler } from "express";
import { WalletBalanceResponse } from "@shared/api";

const evmAddressPattern = /^0x[a-fA-F0-9]{40}$/;
const bitcoinAddressPattern = /^[13][a-km-zA-HJ-NP-Z1-9]{25,62}$|^bc1[a-z0-9]{25,90}$/;
const solanaAddressPattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const tronAddressPattern = /^T[1-9A-HJ-NP-Za-km-z]{33}$/;

type Chain = WalletBalanceResponse["chain"];

const formatUnits = (base: bigint, decimals: number) => {
  const raw = base.toString().padStart(decimals + 1, "0");
  const whole = raw.slice(0, -decimals) || "0";
  const fraction = raw.slice(-decimals).slice(0, 6).padEnd(6, "0");
  return `${whole}.${fraction}`;
};

const rpcBalance = async (url: string, method: string, params: unknown[]) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const data = (await response.json()) as { result?: unknown; error?: { message?: string } };
  if (!response.ok || data.result === undefined) {
    throw new Error(data.error?.message ?? "Unable to read wallet balance.");
  }
  return data.result;
};

export const handleWalletBalance: RequestHandler = async (req, res) => {
  const address = typeof req.query.address === "string" ? req.query.address : "";
  const chain = typeof req.query.chain === "string" ? req.query.chain as Chain : "Ethereum";

  try {
    let response: WalletBalanceResponse;

    if (chain === "Ethereum" || chain === "BNB Chain") {
      if (!evmAddressPattern.test(address)) {
        res.status(400).json({ message: "Enter a valid EVM wallet address." });
        return;
      }
      const rpcUrl = chain === "Ethereum" ? "https://ethereum.publicnode.com" : "https://bsc.publicnode.com";
      const balanceBase = BigInt(String(await rpcBalance(rpcUrl, "eth_getBalance", [address, "latest"])));
      response = {
        address,
        chain,
        balanceBase: balanceBase.toString(),
        balance: formatUnits(balanceBase, 18),
        symbol: chain === "Ethereum" ? "ETH" : "BNB",
      };
    } else if (chain === "Solana") {
      if (!solanaAddressPattern.test(address)) {
        res.status(400).json({ message: "Enter a valid Solana wallet address." });
        return;
      }
      const balanceData = (await rpcBalance("https://api.mainnet-beta.solana.com", "getBalance", [address])) as { value?: number };
      const balanceBase = BigInt(balanceData.value ?? 0);
      response = { address, chain, balanceBase: balanceBase.toString(), balance: formatUnits(balanceBase, 9), symbol: "SOL" };
    } else if (chain === "Bitcoin") {
      if (!bitcoinAddressPattern.test(address)) {
        res.status(400).json({ message: "Enter a valid Bitcoin wallet address." });
        return;
      }
      const apiResponse = await fetch(`https://mempool.space/api/address/${encodeURIComponent(address)}`);
      const data = (await apiResponse.json()) as { chain_stats?: { funded_txo_sum?: number; spent_txo_sum?: number } };
      const funded = BigInt(data.chain_stats?.funded_txo_sum ?? 0);
      const spent = BigInt(data.chain_stats?.spent_txo_sum ?? 0);
      const balanceBase = funded - spent;
      response = { address, chain, balanceBase: balanceBase.toString(), balance: formatUnits(balanceBase, 8), symbol: "BTC" };
    } else {
      if (!tronAddressPattern.test(address)) {
        res.status(400).json({ message: "Enter a valid Tron wallet address." });
        return;
      }
      const apiResponse = await fetch(`https://api.trongrid.io/v1/accounts/${encodeURIComponent(address)}`);
      const data = (await apiResponse.json()) as { data?: Array<{ balance?: number }> };
      const balanceBase = BigInt(data.data?.[0]?.balance ?? 0);
      response = { address, chain, balanceBase: balanceBase.toString(), balance: formatUnits(balanceBase, 6), symbol: "TRX" };
    }

    res.json(response);
  } catch {
    res.status(502).json({ message: "Unable to read the balance from this blockchain network." });
  }
};
