import {RippleHandlers} from '@material/mwc-ripple/ripple-handlers.js';
import {css, html, nothing} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {eventOptions} from 'lit/decorators/event-options.js';
import {property} from 'lit/decorators/property.js';
import {queryAsync} from 'lit/decorators/query-async.js';
import {state} from 'lit/decorators/state.js';
import '@material/mwc-ripple';

import {AppElement} from '../app-debt/app-element';

import type {Ripple} from '@material/mwc-ripple';
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
  static override styles = css`
    :host {
      display: inline-flex;
      width: max-content;
      box-sizing: border-box;
      padding: var(--gap, 4px 8px 12px);

      --base-color: var(--primary-color);
      --base-color-contrast: var(--primary-color-contrast);
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      border: none;
      position: relative;
      overflow: hidden;
      user-select: none;
      cursor: pointer;
      gap: 8px;

      background-color: var(--base-color);
      color: var(--base-color-contrast);
      font-size: var(--font-size, 18px);
      font-weight: var(--font-weight, 700);
      padding: var(--padding, 16px);
      border-radius: var(--border-radius, 14px);
    }
  `;

  @property({type: Boolean, reflect: true}) disabled = false;
  @queryAsync('mwc-ripple') ripple!: Promise<Ripple | null>;
  @state() protected shouldRenderRipple = false;

  override render(): TemplateResult {
    return html`
      <button
        @mousedown="${this.handleRippleActivate}"
        @mouseenter="${this.handleRippleMouseEnter}"
        @mouseleave="${this.handleRippleMouseLeave}"
        @touchstart="${this.handleRippleActivate}"
        @touchend="${this.handleRippleDeactivate}"
        @touchcancel="${this.handleRippleDeactivate}"
        type="button"
      >
        ${this.renderRippleTemplate()}
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
      </button>
    `;
  }

  protected rippleHandlers = new RippleHandlers(() => {
    this.shouldRenderRipple = true;
    return this.ripple;
  });

  protected renderRippleTemplate(): TemplateResult | typeof nothing {
    if (!this.shouldRenderRipple) return nothing;

    return html`<mwc-ripple ?disabled="${this.disabled}"></mwc-ripple>`;
  }

  @eventOptions({passive: true})
  protected handleRippleActivate(evt?: Event): void {
    const onUp = (): void => {
      window.removeEventListener('mouseup', onUp);

      this.handleRippleDeactivate();
    };

    window.addEventListener('mouseup', onUp);
    this.rippleHandlers.startPress(evt);
  }

  protected handleRippleDeactivate(): void {
    this.rippleHandlers.endPress();
  }

  protected handleRippleMouseEnter(): void {
    this.rippleHandlers.startHover();
  }

  protected handleRippleMouseLeave(): void {
    this.rippleHandlers.endHover();
  }
}
