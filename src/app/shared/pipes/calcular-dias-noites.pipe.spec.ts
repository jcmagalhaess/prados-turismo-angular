import { CalcularDiasNoitesPipe } from './calcular-dias-noites.pipe';

describe(CalcularDiasNoitesPipe.name, () => {
  it('create an instance', () => {
    const pipe = new CalcularDiasNoitesPipe();
    expect(pipe).toBeTruthy();
  });
});
