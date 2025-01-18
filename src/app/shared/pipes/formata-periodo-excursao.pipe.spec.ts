import { FormatarPeriodoExcursao } from './formata-periodo-excursao.pipe';

describe(FormatarPeriodoExcursao.name, () => {
  it('create an instance', () => {
    const pipe = new FormatarPeriodoExcursao();
    expect(pipe).toBeTruthy();
  });
});
