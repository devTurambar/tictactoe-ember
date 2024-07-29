import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

// class Info {
//     @tracked playerX;
//     @tracked playerO;
//     @tracked first;
//     constructor(info) {
//         this.playerX = info.playerX;
//         this.playerO = info.playerO;
//         this.first = info.first;
//       }
// }

export default class GameInitialDataService extends Service {
  @tracked gameInfo = {
    playerX: '',
    playerO: '',
    first: 'X',
  };
  setX = (inputObject) => {
    this.gameInfo.playerX = inputObject?.target?.value;
  };
  setO = (inputObject) => {
    this.gameInfo.playerO = inputObject?.target?.value;
  };
  setFirst = (inputObject) => {
    this.gameInfo.first = inputObject?.target?.value;
  };
  resetGameInfo = () => {
    this.gameInfo = {
      playerX: '',
      playerO: '',
      first: 'X',
    };
  };
}
