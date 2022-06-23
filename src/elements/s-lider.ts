import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {property} from 'lit/decorators/property.js';
import {queryAssignedElements} from 'lit/decorators/query-assigned-elements.js';
import {styleMap} from 'lit/directives/style-map.js';

import {AppElement} from '../app-debt/app-element';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    's-lider': Slider;
    's-lide': Slide;
  }
}

/**
 * AlShaf-i Slider Components
 * ```html
 * <s-lider></s-lider>
 * ```
 */
@customElement('s-lider')
export class Slider extends AppElement {
  static override styles = css`
    :host {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;

      --base-color: var(--primary-color);
      --base-color-contrast: var(--primary-color-contrast);
    }
    .slider {
      display: flex;
      min-width: 100%;
      width: max-content;
      transition: transform var(--duration, 300ms) ease;
    }
    ::slotted(*) {
      display: none;
    }
    ::slotted(s-lide) {
      display: flex;
    }
  `;

  @property({type: Number, reflect: true}) activeSlide = 1;
  @property({type: Boolean}) mini = false;
  @queryAssignedElements({selector: 's-lide'})
  protected slides!: Slide[];

  override render(): TemplateResult {
    const slideWidth = this.mini ? 90 : 100;
    console.log(slideWidth);

    const sliderStyles = {
      transform: `translateX(${slideWidth * (this.activeSlide - 1) - (100 - slideWidth) / 2}%)`,
    };

    return html`
      <div class="slider" style=${styleMap(sliderStyles)}>
        <slot></slot>
      </div>
    `;
  }
}

/**
 * AlShaf-i Slide Components
 * ```html
 * <s-lider></s-lider>
 * ```
 */
@customElement('s-lide')
export class Slide extends AppElement {
  static override styles = css`
    :host {
      display: flex;
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      flex-shrink: 0;
      padding: var(--gap, 24px 6px);

      --base-color: var(--primary-color);
      --base-color-contrast: var(--primary-color-contrast);
    }
    :host([mini]) {
      width: 90%;
    }
  `;

  override render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
