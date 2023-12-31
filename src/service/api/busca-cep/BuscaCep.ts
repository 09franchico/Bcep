import { TResponse, TResponseSea } from '../../@types/TReponse';
import { Api } from '../axios-config';


/**
 * Buscar CEP por filtro
 * @param rua 
 * @param estado 
 * @param uf 
 * @returns 
 */
const getCepFiltro = async (rua: string, estado: string, uf: string): Promise<TResponseSea | Error> => {
    try {
        const urlRelativa = `${uf}/${estado}/${rua}/json`;
        const { data, headers } = await Api.get(urlRelativa);
        if (data) {
            return {
                erro: data.erro,
                data: data,
            };
        }

        return new Error('Erro ao listar os registros.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
    }
};


/**
 * Buscar CEP 
 * @param cep 
 * @returns 
 */
const getCep = async (cep: string): Promise<TResponse | Error> => {
    try {
        const urlRelativa = `${cep}/json`;
        const { data, headers } = await Api.get(urlRelativa);
        if (data) {
            return {
                erro:data.erro ,
                data:data,
            };
        }
        return new Error('Erro ao listar os registros.');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
    }
};


export const BuscaCepApi = {
   getCepFiltro,
   getCep
  };
