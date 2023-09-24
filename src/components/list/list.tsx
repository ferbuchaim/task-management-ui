import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'tm-list',
  styleUrl: './list.css',
  shadow: true,
})
export class Lists {
  @Prop() listTitle: string;

  render() {
    return (
      <div class="list" draggable={true}>
        <div class="list-header">
          <div class="list-title">{this.listTitle}</div>
        </div>
        <tm-card-wrapper class="tm-card-wrapper" />
      </div>
    );
  }
}
