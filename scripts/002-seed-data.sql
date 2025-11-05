-- Insert sample ingredients
INSERT INTO ingredients (name, unit, current_stock, minimum_stock, unit_cost, supplier) VALUES
  ('Amendoim torrado', 'kg', 500, 100, 8.50, 'Fornecedor A'),
  ('Açúcar', 'kg', 300, 50, 3.20, 'Fornecedor B'),
  ('Sal', 'kg', 50, 10, 2.00, 'Fornecedor C'),
  ('Embalagem 100g', 'unidade', 1000, 200, 0.50, 'Fornecedor D'),
  ('Embalagem 500g', 'unidade', 500, 100, 1.20, 'Fornecedor D'),
  ('Caixa de papelão', 'unidade', 200, 50, 2.50, 'Fornecedor E')
ON CONFLICT DO NOTHING;

-- Insert sample customers
INSERT INTO customers (name, email, phone, cpf_cnpj, address, city, state, zip_code) VALUES
  ('Maria Silva', 'maria.silva@email.com', '(11) 98765-4321', '123.456.789-00', 'Rua das Flores, 123', 'São Paulo', 'SP', '01234-567'),
  ('João Santos', 'joao.santos@email.com', '(21) 97654-3210', '987.654.321-00', 'Av. Principal, 456', 'Rio de Janeiro', 'RJ', '20000-000'),
  ('Mercado Central LTDA', 'contato@mercadocentral.com', '(11) 3456-7890', '12.345.678/0001-90', 'Rua Comercial, 789', 'São Paulo', 'SP', '01234-890')
ON CONFLICT DO NOTHING;
