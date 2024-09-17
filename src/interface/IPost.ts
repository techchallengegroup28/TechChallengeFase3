export default interface IPost {
    id: number;
    titulo: string;
    descricao: string;
    datapostagem: string;
    dataatualizacao: string;
    conteudo: string;
    imagem?: string | null;
}