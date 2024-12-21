import { AsyncLocalEmbarquePipe } from './async-local-embarque.pipe';

describe(AsyncLocalEmbarquePipe.name, () => {
  it('create an instance', () => {
    const pipe = new AsyncLocalEmbarquePipe();
    expect(pipe).toBeTruthy();
  });
});
