import {getJson} from '@alwatr/fetch';
import {LocalizeController, registerTranslation} from '@shoelace-style/localize/dist/index.js';
import {css, html, nothing} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {styleMap} from 'lit/directives/style-map.js';

import {AppElement} from '../app-debt/app-element';
import {data, sliderData} from '../type';

import '../components/b-utton';
import '../components/e-levation';
import '../components/p-rogress';
import '../components/s-lider';

import type {ListenerInterface} from '@alwatr/signal';
import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-content-cards': PageContentCards;
  }
}

/**
 * APP PWA Home Page Element
 *
 * ```html
 * <page-content-cards></page-content-cards>
 * ```
 */
@customElement('page-content-cards')
export class PageContentCards extends AppElement {
  static override styles = [
    css`
      * {
        box-sizing: border-box;
      }
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
      .card .card__text,
      .card .card__image {
        display: flex;
        height: max-content;
        width: 100%;
      }
      .card .card__text-seprator,
      .card .card__image-seprator {
        display: flex;
      }
      .card .card__text-seprator {
        flex-grow: 4;
      }
      .card .card__text {
        padding: 4px 8px;
        flex-direction: column;
        overflow: auto;
        text-align: center;
        margin-bottom: 6px;
      }
      .card .card__text p {
        margin: 0.35rem 0 0;
        color: #454545;
        font-size: 1.2rem;
        // font-weight: 100;
      }
      .card .card__image-seprator {
        flex-grow: 1;
      }
      .card .card__image {
        padding: 4px;
      }
      .card .card__image img {
        width: 100%;
        border-radius: 12px;
      }
    `,
    css`
      .p-rogress-text {
        padding: 0 12px;
      }
    `,
    css`
      .b-uttons {
        display: flex;
        padding: 0 16px;
      }
      .b-uttons b-utton {
        transition: width 300ms ease-in-out, opacity 300ms ease-in-out, margin-left 300ms ease-in-out;
        --gap: 4px 0 12px;
      }
      .b-uttons b-utton.end {
        --base-color: var(--secondary-color);
      }
    `,
  ];

  protected _data: data = [
    {
      id: 0,
      text: `Loading`
    },
  ];
  protected _activeSlideIndex = 1;
  protected _localize = new LocalizeController(this);
  protected _listenerList: Array<unknown> = [];

  override connectedCallback(): void {
    super.connectedCallback();
    registerTranslation();
    this._getData();
    // this._listenerList.push(router.signal.addListener(() => this.requestUpdate()));
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._listenerList.forEach((listener) => (listener as ListenerInterface<keyof AlwatrSignals>).remove());
  }

  override render(): TemplateResult {
    return html`${this._renderSlider()} ${this._renderProgressBar()} ${this._renderButtons()}`;
  }

  protected async _getData(): Promise<void> {
    try {
      const data = await getJson('/data/ghadir.json');
      this._data = data.content as data;
      this.requestUpdate();
    } catch {
      this._data = [
        {
          id: 0,
          text: `Error in loading data...`
        },
      ];
      this.requestUpdate();
    }
  }

  protected _renderSlider(): TemplateResult {
    const cardsTemplate = this._data.map((card: sliderData) => this._renderCard(card.text, card.imageSource));
    return html` <s-lider activeSlide=${this._activeSlideIndex}>${cardsTemplate}</s-lider> `;
  }
  protected _renderCard(text: string, imageSource: string | undefined): TemplateResult | typeof nothing {
    if (!text) {
      return nothing;
    }

    const textTemplate = text
        .trim()
        .split('\n')
        .map((paragraph) => html`<p>${paragraph}</p>`);

    return html`
      <s-lide>
        <e-levation class="card">
          <div class="card__text-seprator"></div>
          <div class="card__text">${textTemplate}</div>
          <div class="card__image-seprator"></div>
          ${this._renderPhoto(imageSource)}
        </e-levation>
      </s-lide>
    `;
  }
  protected _renderPhoto(imageSource: string | undefined ): TemplateResult | typeof nothing{
    if (imageSource !== undefined) {
      return html`
      <div class="card__image">
        <img src=${imageSource} />
      </div>
      `
    }
    return nothing
  }
  protected _renderProgressBar(): TemplateResult {
    return html`
      <span class="p-rogress-text">
        ${this._localize.number(this._data.length)} / ${this._localize.number(this._activeSlideIndex)}
      </span>
      <p-rogress max=${this._data.length} min="1" progress=${this._activeSlideIndex}></p-rogress>
    `;
  }
  protected _renderButtons(): TemplateResult {
    const styles = {
      next: {
        width: this._activeSlideIndex === 1 ? '100%' : this._activeSlideIndex === this._data.length ? '0%' : '70%',
        opacity: this._activeSlideIndex === this._data.length ? '0' : '1',
      },
      perv: {
        width: this._activeSlideIndex !== 1 ? '30%' : '0%',
        opacity: this._activeSlideIndex !== 1 ? '1' : '0',
        marginLeft: this._activeSlideIndex !== 1 ? '12px' : '0',
      },
      end: {
        width: this._activeSlideIndex === this._data.length ? '70%' : '0%',
        opacity: this._activeSlideIndex === this._data.length ? '1' : '0',
      },
    };
    return html`
      <div class="b-uttons">
        <b-utton style=${styleMap(styles.perv)} class="perv" @click=${this.perv} primary>قبلی</b-utton>
        <b-utton style=${styleMap(styles.next)} class="next" @click=${this.next}>بعدی</b-utton>
        <b-utton style=${styleMap(styles.end)} class="end">پایان</b-utton>
      </div>
    `;
  }

  next(): void {
    if (this._activeSlideIndex < this._data.length) {
      this._activeSlideIndex++;
      this.requestUpdate();
    }
  }
  perv(): void {
    if (this._activeSlideIndex > 1) {
      this._activeSlideIndex--;
      this.requestUpdate();
    }
  }
}
