import { fromContractFullName } from './naming';

export interface ParsedContractReference {
  proxyAddress: string | undefined;
  contractName: string | undefined;
  packageName: string | undefined;
}

export function parseContractReference(contractReference: string): ParsedContractReference {
  let proxyAddress;
  let contractAlias;
  let packageName;

  if (contractReference && contractReference.startsWith('0x')) {
    proxyAddress = contractReference;
  } else if (contractReference) {
    ({ contract: contractAlias, package: packageName } = fromContractFullName(contractReference));
  }

  return { proxyAddress, contractName: contractAlias, packageName };
}
