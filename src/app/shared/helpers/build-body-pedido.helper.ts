import { Excursao } from "../models/excursao.type";

export function buildBodyPedido(excursao: Excursao, tickets: number, participantes: any, opcionais: any) {
    return {
        id: excursao?.id,
        price: excursao?.valor,
        nome: excursao?.nome,
        periodo: {
          dataInicio: excursao?.dataInicio,
          dataFim: excursao?.dataFim,
        },
        tickets,
        participantes,
        opcionais,
    }
}