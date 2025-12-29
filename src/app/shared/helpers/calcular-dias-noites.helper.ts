import { parseDateLocal } from './formatar-data.helper';

export function calcularDiasENoites(dataInicio: string, dataFim: string) {
    // Converte as strings de data para objetos Date
    const inicio: any = parseDateLocal(dataInicio);
    const fim: any = parseDateLocal(dataFim);

    // Calcula a diferença em milissegundos
    const diffEmMilissegundos: number = fim - inicio;

    // Converte a diferença para dias
    const dias = Math.ceil(diffEmMilissegundos / (1000 * 60 * 60 * 24)) + 1; // Incluindo o dia inicial

    // As noites são uma unidade a menos que os dias
    const noites = dias - 1;

    // Retorna o formato "X dias e Y noites"
    return `${dias} dias e ${noites} noites`;
}