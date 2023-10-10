import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'tm-card',
  styleUrl: './card.css',
  shadow: true,
})
export class Card {
  @Prop() cardTitle: string;
  @Event({ bubbles: true, composed: true }) modal: EventEmitter;

  onOpenModal(event: PointerEvent) {
    const card = event.currentTarget;
    this.modal.emit(card);
  }

  render() {
    return (
      <div class="card-title" data-card-title={this.cardTitle} draggable={true} onClick={this.onOpenModal.bind(this)}>
        {this.cardTitle}
      </div>
    );
  }
}
