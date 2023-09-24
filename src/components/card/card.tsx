import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'tm-card',
  styleUrl: './card.css',
  shadow: true,
})
export class Card {
  @Prop() cardTitle: string;
  @Event({ bubbles: true, composed: true }) modal: EventEmitter;
  @Event({ bubbles: true, composed: true }) moveCard: EventEmitter;

  card: HTMLElement;

  onOpenModal(event: PointerEvent) {
    const card = event.currentTarget;
    this.modal.emit(card);
  }

  onMoveCard(cardRef: HTMLElement) {
    console.log(cardRef);
    this.moveCard.emit(cardRef);
  }

  render() {
    return (
      <div class="container-button" ref={el => (this.card = el)}>
        <div class="card-title" data-card-title={this.cardTitle} onClick={this.onOpenModal.bind(this)}>
          {this.cardTitle}
        </div>
        <button id="move-card-to-list" onClick={() => this.onMoveCard(this.card)}>
          <i>→</i>
        </button>
      </div>
    );
  }
}
