import Route from '@ember/routing/route';
import { get } from '@ember/object';

import { hash } from 'ember-concurrency';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

import generateSeed from '../../utils/generate-seed';

export default class SetupBackupRoute extends Route {
  @service rpc = null;

  @service electron = null;

  beforeModel(...args) {
    const electron = this.get('electron');
    const isElectron = get(electron, 'isElectron');
    if (isElectron) {
      const isNodeStarted = get(electron, 'isNodeStarted');
      if (!isNodeStarted) {
        return this.transitionTo('setup.start');
      }
    }
    return super.beforeModel(...args);
  }

  model() {
    this.loadOnlyText();
    const wallet = this.modelFor('setup').save();
    const seed = generateSeed();
    return hash({
      wallet,
      seed,
    });
  }

  afterModel(model) {
    const wallet = get(model, 'wallet.id');
    const seed = get(model, 'seed');
    return this.get('rpc').walletChangeSeed(wallet, seed);
  }

  @action
  cancel() {
    this.loadImgAndText();
    return this.transitionTo('setup');
  }

  @action
  done(wallet) {
    this.loadImgAndText();
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
