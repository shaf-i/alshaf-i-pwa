import {router} from '@alwatr/router';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';

import {AppElement} from './app-debt/app-element';

import './pages/page-home';
import './pages/page-about';

import type {RoutesConfig} from '@alwatr/router';
import type {ListenerInterface} from '@alwatr/signal';
import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'app-index': AppIndex;
  }
}

/**
 * APP PWA Root Element
 *
 * ```html
 * <app-index></app-index>
 * ```
 */
@customElement('app-index')
export class AppIndex extends AppElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .page-container {
      position: relative;
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 0%;
      height: 100%;
    }
  `;

  constructor() {
    super();
    router.initial();
  }
  protected _activePage = 'home';

  protected _routes: RoutesConfig = {
    // TODO: refactor route, we need to get active page!
    // TODO: ability to redirect!
    map: (route) => (this._activePage = route.sectionList[0]?.toString().trim() || 'home'),
    list: {
      home: {
        render: () => html`<page-home></page-home>`,
      },
      about: {
        render: () => html`<page-about></page-about>`,
      },
    },
  };

  protected _listenerList: Array<unknown> = [];

  override connectedCallback(): void {
    super.connectedCallback();
    this._listenerList.push(
      router.signal.addListener(
        (route) => {
          this._logger.logMethodArgs('routeChanged', {route});
          this._activePage = route.sectionList[0]?.toString().trim() || 'home';
          this.requestUpdate();
        },
        {receivePrevious: true}
      )
    );
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._listenerList.forEach((listener) => (listener as ListenerInterface<keyof AlwatrSignals>).remove());
  }

  override render(): TemplateResult {
    return html` <main class="page-container">${router.outlet(this._routes)}</main> `;
  }
}
