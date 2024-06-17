DROP schema IF EXISTS branas CASCADE;

CREATE schema branas;

CREATE TABLE branas.lancamento (
  lancamento_id text primary key,
  mes text,
  categoria text,
  tipo text,
  valor numeric
);

insert into branas.lancamento (lancamento_id, mes, categoria, tipo, valor) values ('cjld2cyuq0000t3rmniod1foa', 'Janeiro', 'Salário', 'receita', 3000);
insert into branas.lancamento (lancamento_id, mes, categoria, tipo, valor) values ('cjld2cyuq0000t3rmniod1fob', 'Janeiro', 'Aluguel', 'despesa', 1000);
insert into branas.lancamento (lancamento_id, mes, categoria, tipo, valor) values ('cjld2cyuq0000t3rmniod1foc', 'Janeiro', 'Conta de Luz', 'despesa', 200);
insert into branas.lancamento (lancamento_id, mes, categoria, tipo, valor) values ('cjld2cyuq0000t3rmniod1fod', 'Janeiro', 'Conta de Água', 'despesa', 100);
insert into branas.lancamento (lancamento_id, mes, categoria, tipo, valor) values ('cjld2cyuq0000t3rmniod1foe', 'Janeiro', 'Transporte', 'despesa', 300);

insert into branas.lancamento (lancamento_id, mes, categoria, tipo, valor) values ('cjld2cyuq0000t3rmniod1fof', 'Fevereiro', 'Salário', 'receita', 3000);
insert into branas.lancamento (lancamento_id, mes, categoria, tipo, valor) values ('cjld2cyuq0000t3rmniod1fog', 'Fevereiro', 'Aluguel', 'despesa', 1000);
insert into branas.lancamento (lancamento_id, mes, categoria, tipo, valor) values ('cjld2cyuq0000t3rmniod1foh', 'Fevereiro', 'Conta de Luz', 'despesa', 200);

insert into branas.lancamento (lancamento_id, mes, categoria, tipo, valor) values ('cjld2cyuq0000t3rmniod1foi', 'Março', 'Salário', 'receita', 3000);
insert into branas.lancamento (lancamento_id, mes, categoria, tipo, valor) values ('cjld2cyuq0000t3rmniod1foj', 'Março', 'Aluguel', 'despesa', 1000);