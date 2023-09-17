import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'tm-board',
  styleUrl: './board.css',
  shadow: true,
})
export class board {
  @State() dataContent: HTMLFormElement;
  @State() hideButton = false;

  inputValue: string;
  allLists: HTMLElement[] = [];
  newList: HTMLElement;

  onUserInput(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
  }

  onCloseButtonClick() {
    this.inputValue = undefined;
    this.dataContent = null;
    this.hideButton = false;
  }

  onAddNewList() {
    this.hideButton = true;
    this.dataContent = (
      <form onSubmit={this.onAddList.bind(this)}>
        <input class="list-placeholder" type="text" placeholder="Type in the list name..." value={this.inputValue} onInput={this.onUserInput.bind(this)} />
        <div>
          <button id="add-button" type="submit">
            Add list
          </button>
          <button type="button" class="close-button" onClick={this.onCloseButtonClick.bind(this)}>
            X
          </button>
        </div>
      </form>
    );
  }

  onAddList(event: Event) {
    event.preventDefault();
    this.hideButton = false;
    this.dataContent = null;
    console.log('this.inputValue', this.inputValue);
    if (this.inputValue !== undefined) {
      if (this.inputValue.trim() !== '') {
        const listTitle = this.inputValue;
        this.newList = (
          <div class="list">
            <span id="list-title">{listTitle}</span>
            <div></div>
          </div>
        );
        this.allLists.push(this.newList);
      }
    }
    this.inputValue = undefined;
  }

  render() {
    return (
      <div class="board-view">
        <div class="board-container">
          <div>{this.allLists}</div>
          <div class="add-list">
            {this.dataContent}
            <button id="add-new-list-button" hidden={this.hideButton} onClick={this.onAddNewList.bind(this)}>
              + Click to add a new list
            </button>
          </div>
        </div>
      </div>
    );
  }
}
