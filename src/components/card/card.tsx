import { Component, State, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'tm-card',
  styleUrl: './card.css',
  shadow: true,
})
export class Card {
  @State() dataContent: HTMLFormElement;
  @State() hideButton = false;

  @Event({ bubbles: true, composed: true }) cardClicked: EventEmitter;

  allCards: HTMLElement[] = [];
  newCard: HTMLElement;
  inputValue: string;

  onAddNewCard() {
    this.setHideButton(true);
    this.setDataContent(true);
  }

  setHideButton(value: boolean) {
    this.hideButton = value;
  }

  onUserInput(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
  }

  onCloseButtonClick() {
    this.inputValue = undefined;
    this.dataContent = null;
    this.setHideButton(false);
  }

  onAddCard(event: Event) {
    event.preventDefault();
    this.setHideButton(false);
    this.dataContent = null;

    if (this.inputValue !== undefined) {
      if (this.inputValue.trim() !== '') {
        const cardTitle = this.inputValue;
        this.newCard = (
          <div class="card-title" onClick={this.onClickedCard.bind(this)}>
            {cardTitle}
          </div>
        );
        this.allCards.push(this.newCard);
      }
    }
    this.inputValue = undefined;
  }

  onClickedCard(event: Event) {
    console.log(event);
    this.cardClicked.emit(true);
    console.log('ARERE');
  }

  setDataContent(hasData?: boolean) {
    if (!hasData) {
      this.dataContent = undefined;
      return;
    }
    this.dataContent = (
      <form onSubmit={this.onAddCard.bind(this)}>
        <textarea class="card-placeholder" placeholder="Type in a card name..." value={this.inputValue} onInput={this.onUserInput.bind(this)} maxlength="100" />
        <div>
          <button id="add-card-button" type="submit">
            Add Card
          </button>
          <button type="button" class="close-button" onClick={this.onCloseButtonClick.bind(this)}>
            X
          </button>
        </div>
      </form>
    );
  }

  render() {
    return [
      <div class="card-container">
        <div class="all-cards">{this.allCards}</div>
        {this.dataContent}
        <button id="add-new-card-button" hidden={this.hideButton} onClick={this.onAddNewCard.bind(this)}>
          + Add a card
        </button>
      </div>,
    ];
  }
}
