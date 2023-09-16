import { Component, h } from '@stencil/core';

@Component({
  tag: 'tm-app',
  shadow: true,
})
export class App {
  render() {
    return <tm-board />;
  }
}
