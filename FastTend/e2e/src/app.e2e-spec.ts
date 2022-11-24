import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Prueba 1',  () => {
     page.navigateTo();
     expect( page.getTitleclas1()).toContain('');
  });

  it('Prueba 2', async () => {
   onPrepare:async() => {
     page.navigateTo();
     expect( await page.getTitleclas2()).toContain('');
   }
  });

  it('Prueba 3', async () => {
   onPrepare:async() => {
     page.navigateTo();
     expect( await page.getTitleclas3()).toContain('Bienvenido');
   }
  });

  it('Prueba 4', async () => {
   onPrepare:async() => {
     page.navigateTo();
     expect( await page.getTitleclas4()).toContain('Registra Tu Asistencia de Forma Cómoda');
   }
 });


});
