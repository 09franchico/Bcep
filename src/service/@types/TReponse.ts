
export type TResponseSea = {
    erro:string,
    data:TCep[]

}

export type TResponse ={
    erro:string
    data:TCep;

}
type TCep = {
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ibge: string,
    gia: string,
    ddd: string,
    siafi: string
}