import { Component, Method, Prop, h } from '@stencil/core';

@Component({
  tag: 'tm-modal',
  styleUrl: './modal.css',
  shadow: true,
})
export class Modal {
  @Prop({ reflect: true, mutable: true }) opened: boolean;
  @Prop() modalTitle: string;

  @Method()
  open() {
    this.opened = true;
    // this.modalTitle =
  }

  render() {
    return [
      <div class="modalElement">
        <div class="modalHeader">{this.modalTitle}</div>
      </div>,
      <div class="backdrop"></div>,
    ];
  }
}
