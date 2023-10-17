import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'tm-board',
  styleUrl: './board.css',
  shadow: true,
})
export class board {
  render() {
    return (
      <Host>
        <div class="board-view">
          <div class="board-container">
            <tm-list-wrapper class="tm-list" />
            {/* <tm-modal /> */}
          </div>
        </div>
      </Host>
    );
  }
}
