import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';

import {AppElement} from '../app-debt/app-element';

import type {TemplateResult} from 'lit';

declare global {
  type HTMLElevationElement = Elevation;
  const HTMLElevationElement: {
    prototype: HTMLElevationElement;
    new (): HTMLElevationElement;
  };
  interface HTMLElementTagNameMap {
    'e-levation': HTMLElevationElement;
  }
}

/**
 * AlShaf-i Elevation Components
 * ```html
 * <e-levation></e-levation>
 * ```
 */
@customElement('e-levation')
export class Elevation extends AppElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      padding: var(--padding, 16px);
    }
    section {
      border-radius: var(--border-radius, 12px);
      box-shadow: var(--box-shadow, 0 0 var(--padding, 16px) 0 #0002);
      padding: var(--padding, 12px);
      background-color: var(--background, #fff);
    }
  `;

  override render(): TemplateResult {
    return html` <section><slot></slot></section> `;
  }
}
