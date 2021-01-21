import { AgendamentoDomicilio } from '../../model/agendamento-domicilio';
import { Telefone } from '../../model/telefone';

export class VistoriaDomicilio {
    agendamento = new AgendamentoDomicilio();
    isCheckboxSN = false;
    contato: string;
    telefones?: Telefone[];
    emails: string[];
}
