import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'tm-list',
  styleUrl: './list.css',
  shadow: true,
})
export class list {
  @State() dataContent: HTMLFormElement;
  @State() hideButton = false;

  inputValue: string;
  allLists: HTMLElement[] = [];
  newList: HTMLElement;

  onUserInput(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
  }

  setHideButton(value: boolean) {
    this.hideButton = value;
  }

  setDataContent(hasData?: boolean) {
    if (!hasData) {
      this.dataContent = undefined;
      return;
    }
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

  onCloseButtonClick() {
    this.inputValue = undefined;
    this.dataContent = null;
    this.setHideButton(false);
  }

  onClickList() {
    this.setHideButton(true);
    this.setDataContent(true);
  }

  onAddList(event: Event) {
    event.preventDefault();
    this.setHideButton(false);
    this.dataContent = null;

    if (this.inputValue !== undefined) {
      if (this.inputValue.trim() !== '') {
        const listTitle = this.inputValue;
        this.newList = (
          <div class="list">
            <span id="list-title">{listTitle}</span>
          </div>
        );
        this.allLists.push(this.newList);
      }
    }
    this.inputValue = undefined;
  }

  render() {
    return [
      <div>{this.allLists}</div>,
      <div class="add-list">
        {this.dataContent}
        <button id="add-new-list-button" hidden={this.hideButton} onClick={this.onClickList.bind(this)}>
          + Click to add a new list
        </button>
      </div>,
    ];
  }
}
