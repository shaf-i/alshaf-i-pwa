import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {property} from 'lit/decorators/property.js';
import {classMap} from 'lit/directives/class-map.js';

import {AppElement} from '../app-debt/app-element';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'b-utton': Button;
  }
}

/**
 * AlShaf-i Button Components
 * ```html
 * <b-utton></b-utton>
 * ```
 */
@customElement('b-utton')
export class Button extends AppElement {
  static override styles = [
    css`
      :host {
        display: inline-flex;
        width: max-content;
        box-sizing: border-box;
        padding: var(--gap, 4px 8px 12px);
        position: relative;
        overflow: hidden;

        --base-color: var(--primary-color);
        --base-color-contrast: var(--primary-color-contrast);
        --base-color-pulse: var(--base-color-contrast);
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        border: none;
        user-select: none;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        gap: 8px;

        color: var(--base-color-contrast);
        font-size: var(--font-size, 18px);
        font-weight: var(--font-weight, 700);
        padding: var(--padding, 16px);
        border-radius: var(--border-radius, 14px);
      }
      button .button-background {
        display: flex;
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        background-color: var(--base-color);
        opacity: var(--base-color-opacity, 1);
      }
      button .button-content {
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
      }

      button.primary {
        color: var(--base-color);

        --base-color-pulse: var(--base-color);
        --base-color-opacity: 0.3;
      }
    `,
    css`
      .r-ipple {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0.3;
        z-index: 3;
        animation: pulsate 1024ms ease;
      }
      @keyframes pulsate {
        0% {
          box-shadow: 0 0 0 var(--base-color-pulse);
        }
        100% {
          box-shadow: 0 0 0 100vmin #0000;
        }
      }
    `,
  ];

  @property({type: Boolean, reflect: true}) disabled = false;
  @property({type: Boolean, reflect: true}) primary = false;

  override render(): TemplateResult {
    return html`
      <button class=${classMap({primary: this.primary})} type="button">
        <div class="button-background"></div>
        <div class="button-content">
          <slot name="start"></slot>
          <slot></slot>
          <slot name="end"></slot>
        </div>
      </button>
    `;
  }
  protected override firstUpdated(): void {
    this.addEventListener('click', (event: MouseEvent) => {
      const rect = this.getBoundingClientRect();
      console.log(rect);

      const positionRipple = {
        y: (100 / rect.height) * (event.y - rect.y),
        x: (100 / rect.width) * (event.x - rect.x),
      };

      const ripple = document.createElement('div');
      ripple.className = 'r-ipple';
      ripple.style.left = positionRipple.x + '%';
      ripple.style.top = positionRipple.y + '%';

      this.renderRoot.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 1024);
    });
  }
}
