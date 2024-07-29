import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class HomeController extends Controller {
  @service gameInitialData;

  @action restartInfo(square) {
    this.gameInitialData.resetGameInfo();
  }
}
