import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';

export default class SetupImportRoute extends Route {
  @service rpc = null;

  @action
  cancel() {
    this.loadImgAndText();
    return this.transitionTo('setup');
  }

  @action
  changeType(type) {
    return this.transitionTo({ queryParams: { type } });
  }

  @action
  async changeSeed(model, changeset) {
    const wallet = get(model, 'id');
    const seed = get(changeset, 'seed');
    await this.get('rpc').walletChangeSeed(wallet, seed);
    return this.transitionTo('setup.password', wallet);
  }

  @action
  loadImgAndText() {
    var img1 = $('img').get(0);
    var img2 = $('img').get(1);
    var img3 = $('img').get(2);
    img1.classList.remove('show');
    img1.classList.add('hide');
    img2.classList.remove('hide'); 
    img2.classList.add('show');
    img3.classList.remove('hide'); 
    img3.classList.add('show');
  }

  @action
  loadOnlyText() {
    var img1 = $('img').get(0);
    var img2 = $('img').get(1);
    var img3 = $('img').get(2);
    img1.classList.remove('hide');
    img1.classList.add('show');
    img2.classList.remove('show'); 
    img2.classList.add('hide');
    img3.classList.remove('show'); 
    img3.classList.add('hide');
  }
}
