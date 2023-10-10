import { newSpecPage } from '@stencil/core/testing';
import { List } from './list';

describe('tm-list', () => {
  it('renders a list with a title', async () => {
    const page = await newSpecPage({
      components: [List],
      html: `<tm-list list-title="Test List"></tm-list>`,
    });

    expect(page.root).toEqualHtml(`
      <tm-list list-title="Test List">
        <mock:shadow-root>
          <div class="list" draggable="true">
            <div class="list-header">
              <div class="list-title">Test List</div>
            </div>
            <tm-card-wrapper class="tm-card-wrapper"></tm-card-wrapper>
          </div>
        </mock:shadow-root>
      </tm-list>
    `);
  });

  it('displays the list title correctly', async () => {
    const page = await newSpecPage({
      components: [List],
      html: `<tm-list list-title="TestTest"></tm-list>`,
    });

    await page.waitForChanges();

    const component = page.rootInstance as List;
    expect(component.listTitle).toEqual('TestTest');
  });
});
