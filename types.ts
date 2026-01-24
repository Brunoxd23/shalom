
export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  volume: string;
  gender: 'Masculino' | 'Feminino' | 'Unissex';
  image: string;
  intensity?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  stars: number;
}
