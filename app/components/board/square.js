import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Square extends Component {
  @action clickSquare(square) {
    if (this.args.squareClick) {
      this.args.squareClick(square);
    }
  }
}
