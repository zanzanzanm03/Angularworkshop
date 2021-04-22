import { SharedsModule } from './shareds.module';

describe('SharedsModule', () => {
  let sharedsModule: SharedsModule;

  beforeEach(() => {
    sharedsModule = new SharedsModule();
  });

  it('should create an instance', () => {
    expect(sharedsModule).toBeTruthy();
  });
});
