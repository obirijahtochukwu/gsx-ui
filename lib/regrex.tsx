export const onChange = ({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<string>;
}) => {
  if (/^[0-9]*\.?[0-9]*$/.test(value)) {
    setValue(value);
  } else {
  }
};

export const shortenAddress = (address?: string) => {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
};

export const copyText = (address: string) => {
  navigator.clipboard
    .writeText(address)
    .then(() => alert(`${address} copied to clipboard`));
};
