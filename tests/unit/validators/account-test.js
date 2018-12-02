import { expect } from 'chai';
import { describe, it } from 'mocha';
import validateAccount from '@bitcoinblack.io/bitcoinblack_wallet/validators/account';

describe('Unit | Validator | account', () => {
  it('passes addresses with xrb_ prefix', () => {
    const validator = validateAccount();
    const account = 'xrb_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4';
    expect(validator('account', account)).to.be.true;
  });

  it('passes addresses with nano_ prefix', () => {
    const validator = validateAccount();
    const account = 'bcb_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4';
    expect(validator('account', account)).to.be.true;
  });

  it('fails invalid addresses', () => {
    const validator = validateAccount();
    const values = [
      'bcq_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4',
      'bcb_4arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4',
      'bcb_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjpsl',
      'bcb_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjpsv',
      'bcb_arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4',
      'bcb_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps44',
    ];

    values.forEach(v => expect(validator('account', v)).to.not.be.true);
  });
});
