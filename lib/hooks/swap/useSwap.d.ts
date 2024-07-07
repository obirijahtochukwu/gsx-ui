export interface Token {
  index?: number;
  name?: string;
  address?: string;
  symbol?: string;
  decimals?: number;
  contractAddress?: string;
  Logo?: any;
  cmcid?: number; // Optional property for cmcid
}

export interface Chain {
  index?: number;
  name?: string;
  address?: string;
  symbol?: string;
  decimals?: number;
  contractAddress?: string;
  Logo?: any;
  cmcid?: number; // Optional property for cmcid
}

export interface swapInfos {
  name: string;
  value: string;
}
