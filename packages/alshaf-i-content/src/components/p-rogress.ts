import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {property} from 'lit/decorators/property.js';
import {styleMap} from 'lit/directives/style-map.js';

import {AppElement} from '../app-debt/app-element';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'p-rogress': Progress;
  }
}

/**
 * AlShaf-i Button Components
 * ```html
 * <p-rogress></p-rogress>
 * ```
 */
@customElement('p-rogress')
export class Progress extends AppElement {
  static override styles = css`
    :host {
      display: inline-flex;
      width: 100%;
      box-sizing: border-box;
      padding: var(--gap, 4px 16px 16px);

      --base-color: var(--primary-color);
      --base-color-contrast: var(--primary-color-contrast);
    }

    .progress-box {
      display: flex;
      height: var(--height, 10px);
      width: 100%;
    }

    .progress {
      display: flex;
      width: 100%;
      height: 100%;
      background-color: var(--base-color-contrast);
      position: relative;
      border-radius: var(--border-radius, 100vw);
      overflow: hidden;
    }

    .progress-background {
      display: flex;
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background-color: var(--base-color);
      opacity: var(--base-color-opacity, 0.3);
    }

    .progress-meter {
      display: flex;
      height: 100%;
      background-color: var(--base-color);
      border-radius: var(--border-radius, 100vw);
      transition: width var(--duration, 300ms) ease-in-out;
    }
  `;

  @property({type: Number}) progress = 1;
  @property({type: Number}) min = 0;
  @property({type: Number}) max = 10;

  override render(): TemplateResult {
    const progressMeterStyles = {
      width: `${(100 / this.max) * this.progress}%`,
    };

    return html`
      <div class="progress-box">
        <div class="progress">
          <div class="progress-background"></div>
          <div class="progress-meter" style=${styleMap(progressMeterStyles)}></div>
        </div>
      </div>
    `;
  }
}
