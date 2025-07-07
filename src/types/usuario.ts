type createAt = {
    type: Date,
    default: Date
}

export type Usuario = {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  cargo: string;
  createAt: createAt;
};
