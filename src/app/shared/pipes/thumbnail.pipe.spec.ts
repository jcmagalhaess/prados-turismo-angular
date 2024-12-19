import { ThumbnailPipe } from './thumbnail.pipe';

describe(ThumbnailPipe.name, () => {
  it('create an instance', () => {
    const pipe = new ThumbnailPipe();
    expect(pipe).toBeTruthy();
  });
});
