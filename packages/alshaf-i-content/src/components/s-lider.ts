import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {property} from 'lit/decorators/property.js';
import {queryAssignedElements} from 'lit/decorators/query-assigned-elements.js';
import {styleMap} from 'lit/directives/style-map.js';

import {AppElement} from '../app-debt/app-element';

import type {TemplateResult, PropertyValues} from 'lit';
import type {StyleInfo} from 'lit/directives/style-map.js';

declare global {
  type HTMLSliderElement = Slider;
  const HTMLSliderElement: {
    prototype: HTMLSliderElement;
    new (): HTMLSliderElement;
  };
  type HTMLSlideElement = Slide;
  const HTMLSlideElement: {
    prototype: HTMLSliderElement;
    new (): HTMLSliderElement;
  };
  interface HTMLElementTagNameMap {
    's-lider': HTMLSliderElement;
    's-lide': HTMLSlideElement;
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
  @property({type: Boolean}) fullscreen = false;
  @queryAssignedElements({selector: 's-lide'})
  protected slides!: HTMLSlideElement[];

  override render(): TemplateResult {
    return html`
      <div class="slider" style=${styleMap(this._sliderStyles)}>
        <slot></slot>
      </div>
    `;
  }

  protected get _sliderStyles(): Readonly<StyleInfo> {
    const slideWidth = this.fullscreen ? 100 : 90;
    const sliderStyles = {
      transform: `translateX(${slideWidth * (this.activeSlide - 1) - (100 - slideWidth) / 2}%)`,
    };
    return sliderStyles;
  }

  protected override update(changedProperties: PropertyValues): void {
    if (changedProperties.has('fullscreen')) {
      if (this.slides.length) {
        for (const slide of this.slides) {
          slide.fullscreen = this.fullscreen;
        }
      } else {
        this._logger.error('update', 'update_fullscreen', 'The slider must have at least two children');
      }
    }
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
      width: 90%;
      flex-shrink: 0;
      padding: var(--gap, 24px 6px);

      --base-color: var(--primary-color);
      --base-color-contrast: var(--primary-color-contrast);
    }
    :host([fullscreen]) {
      width: 100%;
    }
  `;

  @property({type: Boolean}) fullscreen = false;

  override render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
