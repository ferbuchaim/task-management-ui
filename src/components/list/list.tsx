import { Component, h, Prop, Host } from '@stencil/core';

@Component({
  tag: 'tm-list',
  styleUrl: './list.css',
  shadow: true,
})
export class List {
  @Prop() listTitle: string;

  render() {
    return (
      <Host>
        <div class="list" draggable={true}>
          <div class="list-header">
            <div class="list-title">{this.listTitle}</div>
          </div>
          <tm-card-wrapper class="tm-card-wrapper" group="card-wrapper" />
        </div>
      </Host>
    );
  }
}
