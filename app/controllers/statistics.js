import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StatisticsController extends Controller {
  @tracked history;
  @action getStats() {
    fetch('http://localhost:3000/games')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.workData(data);
      })
      .catch((e) => alert('No database connected'));
  }
  workData = (data) => {
    this.history = data;
    // const groupedWinners = Object.groupBy(data, ({ winner }) => winner);
    // const groupedLosers = Object.groupBy(data, ({ loser }) => loser);
  };

  dummyDb = () => {
    this.history = [
      { id: 1, winner: 'Carolina', loser: 'Joana', moves: 6, draw: null },
      { id: 2, winner: 'Ricardo', loser: 'Maria', moves: 7, draw: null },
      { id: 3, winner: null, loser: null, moves: 9, draw: 'Ana, Isa' },
      { id: 4, winner: 'Leo', loser: 'João', moves: 7, draw: null },
    ];
  };

  incrementOne = (index) => {
    return index + 1;
  };
}
