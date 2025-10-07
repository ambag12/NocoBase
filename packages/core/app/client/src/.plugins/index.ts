// @ts-nocheck
import packageMap from './packageMap.json';

function devDynamicImport(packageName: string): Promise<any> {
  const fileName = packageMap[packageName];
  if (!fileName) {
    return Promise.resolve(null);
  }
  try {
    return import(`./packages/${fileName}`)
  } catch (error) {
    return Promise.resolve(null);
  }
}
export default devDynamicImport;