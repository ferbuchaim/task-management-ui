import { Component, h } from '@stencil/core';

@Component({
  tag: 'tm-app',
  // styleUrl: './app.css',
  shadow: true,
})
export class App {
  render() {
    return <tm-board />;
  }
}
