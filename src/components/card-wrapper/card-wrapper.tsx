import { Component, State, h, Event, EventEmitter, Host, Prop } from '@stencil/core';
import { Card } from '../card/card';
import Sortable from 'sortablejs';

@Component({
  tag: 'tm-card-wrapper',
  styleUrl: './card-wrapper.css',
  shadow: true,
})
export class CardWrapper {
  cardContainer: HTMLElement;
  allCards: Card[] = [];
  cardTitles: string[] = [];
  newCard: Card;
  inputValue: string;

  @State() dataContent: HTMLFormElement;
  @State() hideButton = false;
  @State() cardSelected: HTMLElement;

  @Prop() group: string;

  @Event({ bubbles: true, composed: true }) modal: EventEmitter;

  componentDidLoad() {
    Sortable.create(this.cardContainer, {
      animation: 150,
      group: this.group,
      ghostClass: 'ghost',
    });
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
        this.newCard = <tm-card class="tm-card" cardTitle={this.inputValue} />;
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
    return (
      <Host>
        <div class="card-container" ref={el => (this.cardContainer = el as HTMLElement)}>
          {this.allCards}
        </div>
        <div>
          {this.dataContent}
          <button id="add-new-card-button" hidden={this.hideButton} onClick={this.onAddNewCard.bind(this)}>
            + Add a card
          </button>
        </div>
      </Host>
    );
  }
}
