export function getBscScanLink(
  data: string | number,
  type: "transaction" | "token" | "address" | "block" | "countdown"
): string {
  switch (type) {
    case "transaction": {
      return `${BASE_BSC_SCAN_URLS}/tx/${data}`;
    }
    case "token": {
      return `${BASE_BSC_SCAN_URLS}/token/${data}`;
    }
    case "block": {
      return `${BASE_BSC_SCAN_URLS}/block/${data}`;
    }
    case "countdown": {
      return `${BASE_BSC_SCAN_URLS}/block/countdown/${data}`;
    }
    default: {
      return `${BASE_BSC_SCAN_URLS}/address/${data}`;
    }
  }
}

export const BASE_BSC_SCAN_URLS = "https://bscscan.com";
