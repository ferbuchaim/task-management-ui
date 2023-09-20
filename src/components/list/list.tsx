import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'tm-list',
  styleUrl: './list.css',
  shadow: true,
})
export class list {
  @State() dataContent: HTMLFormElement;
  @State() hideButton: boolean;

  inputValue: string;
  allLists: HTMLElement[] = [];
  newList: HTMLElement;

  componentWillLoad() {
    this.onClickList();
  }

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
        <input class="list-placeholder" type="text" placeholder="Type in the list title..." value={this.inputValue} onInput={this.onUserInput.bind(this)} maxlength="100" />
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
          <div class="list" draggable={true}>
            <div class="list-header">
              <div class="list-title">{listTitle}</div>
              <button id="edit-actions">...</button>
            </div>
            <tm-card class="tm-card"> </tm-card>
          </div>
        );
        this.allLists.push(this.newList);
      }
    }
    this.inputValue = undefined;
  }

  render() {
    return [
      <div class="list-container">{this.allLists}</div>,
      <div class="add-list">
        {this.dataContent}
        <button id="add-new-list-button" hidden={this.hideButton} onClick={this.onClickList.bind(this)}>
          + Click to add a new list
        </button>
      </div>,
    ];
  }
}