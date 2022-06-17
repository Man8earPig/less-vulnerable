import { init as navbar } from './components/navbar/navbar.component.mjs';
import { build as footer } from './components/footer/footer.component.mjs';
import { build as home } from './components/home/home.component.mjs';
import { init as root } from './components/root/root.component.mjs';
import { init as snakeList } from './components/snake-list/snake-list.component.mjs';
import { init as snakeListItem } from './components/snake-list/snake-list-item.component.mjs';
import { init as snakeDetails } from './components/snake-details/snake-details.component.mjs';
import { build as signIn } from './components/sign-in/sign-in.component.mjs';
import { init as register } from './components/register/register.component.mjs';
import { build as latinTranslator } from './components/latin-translator/latin-translator.component.mjs';
import { init as page } from './components/page/page.component.mjs';

import { ElementBuilder } from './element-builder.mjs';
import { Router } from './router.mjs';
import { routes } from './routes.mjs';
import { SnakeService } from './services/snake-service.mjs';
import { TranslationService } from './services/translation-service.mjs';
import { LocalStorageService } from './services/local-storage-service.mjs';
import { AccountService } from './account-service.mjs';
import { fetchTemplate } from './services/template-service.mjs';

const components_old_style = [
  root,
  navbar,
  snakeList,
  snakeListItem,
  snakeDetails,
  page,
];

const builders = [signIn, footer, home, latinTranslator];

const router = new Router(routes);

const apiUrl = 'https://localhost:7232';

const injectables = {
  window,
  router,
  accountService: new AccountService(apiUrl),
  translationService: new TranslationService(),
  localStorageService: new LocalStorageService(),
  snakeService: new SnakeService(apiUrl),
  fetchTemplate, //TODO: get rid of this.
};

const elementBuilder = new ElementBuilder(window.customElements, injectables);

for (let init of components_old_style) {
  await init(injectables);
}

for (let build of builders) {
  await build(elementBuilder);
}

window.navigateTo = path => router.navigateTo(path);

router.startWith(window.location.pathname);
