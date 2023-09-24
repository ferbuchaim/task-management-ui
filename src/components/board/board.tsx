import { Component, h } from '@stencil/core';

@Component({
  tag: 'tm-board',
  styleUrl: './board.css',
  shadow: true,
})
export class board {
  render() {
    return (
      <div class="board-view">
        <div class="board-container">
          <tm-list-wrapper class="tm-list" />
          <tm-modal></tm-modal>
        </div>
      </div>
    );
  }
}
