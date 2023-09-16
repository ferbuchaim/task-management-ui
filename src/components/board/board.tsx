import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'tm-board',
  styleUrl: './board.css',
  shadow: true,
})
export class board {
  @State() dataContent: HTMLFormElement;
  @State() hideButton = false;

  onAddNewList() {
    this.hideButton = true;
    this.dataContent = (
      <form onSubmit={this.onAddList.bind(this)}>
        <input class="list-name" type="text" placeholder="Type in the list name" />
        <div>
          <button type="submit">Add list</button>
        </div>
      </form>
    );
  }

  onAddList(event: Event) {
    event.preventDefault();
    this.hideButton = false;
    this.dataContent = null;
  }

  render() {
    return (
      <div class="board-view">
        <div class="board-container">
          <div class="add-list">
            <button hidden={this.hideButton} onClick={this.onAddNewList.bind(this)}>
              Add a new list
            </button>
            {this.dataContent}
          </div>
        </div>
      </div>
    );
  }
}
