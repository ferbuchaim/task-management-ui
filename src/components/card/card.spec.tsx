import { newSpecPage } from '@stencil/core/testing';
import { Card } from './card';

describe('tm-card', () => {
  it('should render card with title', async () => {
    const page = await newSpecPage({
      components: [Card],
      html: `<tm-card card-title="Test Card"></tm-card>`,
    });
    expect(page.root).toEqualHtml(`
      <tm-card card-title="Test Card">
        <mock:shadow-root>
          <div class="card-title" data-card-title="Test Card" draggable="true">
            Test Card
          </div>
        </mock:shadow-root>
      </tm-card>
    `);
  });
});
