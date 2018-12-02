import { helper } from '@ember/component/helper';

 import toBcbPrefix from '../utils/to-bcb-prefix';

 export function bcbPrefixHelper([value]) {
  return toBcbPrefix(value);
}

 export default helper(bcbPrefixHelper);