export interface Product {
  id: string;
  name: string;
  description: string;
  price: string; // Preço atual (ex: R$ 199,00)
  oldPrice?: string; // Preço antigo (ex: R$ 250,00)
  discountPercent?: number; // Porcentagem de desconto (ex: 10)
  volume: string;
  gender: "Masculino" | "Feminino" | "Unissex";
  image: string;
  intensity?: string;
  installments?: number; // Número de parcelas (ex: 6)
  installmentInterest?: boolean; // true = com juros, false = sem juros
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  stars: number;
}
