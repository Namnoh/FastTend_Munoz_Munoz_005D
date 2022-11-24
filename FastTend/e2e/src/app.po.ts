import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  async getTitleclas1() {
    return element(by.css('app-root .app-name')).getText();
  }

  async getTitleclas2():Promise<string> {
    return element(by.css('app-root .title')).getText();
  }

  async getTitleclas3():Promise<string> {
    return element(by.css('app-root h2')).getText();
  }

  async getTitleclas4():Promise<string> {
    return element(by.css('app-root p')).getText();
  }
}
