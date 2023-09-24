import { Component, State, h, Event, EventEmitter, Listen } from '@stencil/core';
import { Card } from '../card/card';

@Component({
  tag: 'tm-card-wrapper',
  styleUrl: './card-wrapper.css',
  shadow: true,
})
export class CardWrapper {
  @State() dataContent: HTMLFormElement;
  @State() hideButton = false;
  @State() cardSelected: HTMLElement;

  @Event({ bubbles: true, composed: true }) modal: EventEmitter;
  @Event({ bubbles: true, composed: true }) getCard: EventEmitter;

  allCards: Card[] = [];
  cardTitles: string[] = [];
  newCard: Card;
  inputValue: string;

  @Listen('moveCard', { target: 'body' })
  updateList(selectedCard: CustomEvent) {
    const textSelected = selectedCard.detail.outerText;
    const hasCard = this.allCards.find((card: any) => card?.$attrs$?.cardTitle === textSelected);
    // console.log(hasCard);
    this.allCards.push(hasCard);
  }

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

  onOpenModal(event: PointerEvent) {
    const card = event.currentTarget;
    this.modal.emit(card);
  }

  onAddCard(event: Event) {
    event.preventDefault();
    this.setHideButton(false);
    this.dataContent = null;

    if (this.inputValue !== undefined) {
      if (this.inputValue.trim() !== '') {
        // this.cardTitles.push(cardTitle);
        this.newCard = <tm-card class="tm-card" cardTitle={this.inputValue} onMoveCard={() => this.updateList} />;
        // this.newCard = <tm-card class="tm-card" cardTitle={this.inputValue} />;
        this.allCards.push(this.newCard);
      }
    }
    this.inputValue = undefined;
  }

  setDataContent(hasData?: boolean) {
    if (!hasData) {
      this.dataContent = undefined;
      return;
    }
    this.dataContent = (
      <form onSubmit={this.onAddCard.bind(this)}>
        <textarea class="card-placeholder" placeholder="Type in a card name..." value={this.inputValue} onInput={this.onUserInput.bind(this)} maxlength="105" />
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
