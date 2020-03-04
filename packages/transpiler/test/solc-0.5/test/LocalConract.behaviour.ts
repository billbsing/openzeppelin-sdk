import { transpileContracts, OutputFile } from '../../../src/index';
import { artifacts } from './setup';

export function shouldTranspileToValidContract(contract: string, output: Record<string, Partial<OutputFile>>): void {
  it(`is converted to a valid ${contract}Upgradeable contract`, (): void => {
    const files = transpileContracts([contract], artifacts);

    for (const file of files) {
      const key = file.contracts[0];
      expect(file.source).toMatchSnapshot();
      expect(file.fileName).toBe(`${output[key].fileName}.sol`);
      expect(file.path).toBe(`./contracts/__upgradeable__/${output[key].path}Upgradeable.sol`);
      expect(file.contracts).toEqual(output[key].contracts);
    }
  });
}
