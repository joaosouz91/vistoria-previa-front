export interface Usuario {
    usuarioId: string;
    web?: boolean;
    idUsuarioPortal?: number;
    dadosPerfil?: {
        idUsuarioPortal?: number;
        codigoInterno?: number;
        siteOrigem?: string;
        tipoSite?: string;
        idParceiroNegocioPrimario?: number;
        codigoParceiroNegocioPrimario?: number;
        nomeParceiroNegocioPrimario?: string;
        tipoParceiroNegocioPrimario?: string;
        indicadorVendaNegocioPrimario?: string;
        idParceiroNegocioSecundario?: number;
        codigoParceiroNegocioSecundario?: number;
        nomeParceiroNegocioSecundario?: string;
        tipoParceiroNegocioSecundario?: string;
        web?: boolean;
    }
}
