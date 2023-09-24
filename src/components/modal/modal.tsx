import { Component, h, State, Listen } from '@stencil/core';

@Component({
  tag: 'tm-modal',
  styleUrl: './modal.css',
  shadow: true,
})
export class Modal {
  @State() opened: boolean;
  modalTitle: string;

  modalElement: HTMLElement;

  @Listen('modal', { target: 'body' })
  onCardClicked(event: CustomEvent) {
    this.openModal(true);
    this.modalTitle = event.detail.outerText;
  }

  componentWillLoad() {
    this.openModal(false);
  }

  openModal(open: boolean) {
    this.opened = open;
  }

  render() {
    if (this.opened) {
      this.modalElement = (
        <div>
          <div class="modalElement">
            <div class="modalHeader">{this.modalTitle}</div>
          </div>
          ,<div class="backdrop" onClick={() => this.openModal(false)}></div>
        </div>
      );
    } else {
      this.modalElement = undefined;
    }
    return this.modalElement;
  }
}
