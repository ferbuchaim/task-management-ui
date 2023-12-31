import { Component, h, Host, State } from '@stencil/core';
import { List } from '../list/list';

@Component({
  tag: 'tm-list-wrapper',
  styleUrl: './list-wrapper.css',
  shadow: true,
})
export class ListWrapper {
  inputValue: string;
  allLists: List[] = [];
  newList: List;

  @State() dataContent: HTMLFormElement;
  @State() hideButton: boolean;

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
        <input class="list-placeholder" type="text" placeholder="Type in the list title..." value={this.inputValue} onInput={this.onUserInput.bind(this)} maxlength="110" />
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
        this.newList = <tm-list listTitle={this.inputValue} />;
        this.allLists.push(this.newList);
      }
    }
    this.inputValue = undefined;
  }

  render() {
    return (
      <Host>
        <div class="list-container">{this.allLists}</div>
        <div class="add-list">
          {this.dataContent}
          <button id="add-new-list-button" hidden={this.hideButton} onClick={this.onClickList.bind(this)}>
            + Click to add a new list
          </button>
        </div>
      </Host>
    );
  }
}
