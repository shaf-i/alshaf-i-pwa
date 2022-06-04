import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';

import {AppElement} from '../app-debt/app-element';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'test-element': TestElement;
  }
}

/**
 * ```html
 * <test-element></test-element>
 * ```
 */
@customElement('test-element')
export class TestElement extends AppElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }
    .circle {
      width: 100px;
      height: 100px;
      background-color: red;
      border-radius: 50%;
    }
  `;

  override render(): TemplateResult {
    return html`<div class="circle"></div>`;
  }

  protected clicked(): void {
    console.log('fuck you');
  }
}
