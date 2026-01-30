import { Product, Testimonial } from "./types";

export const WHATSAPP_NUMBER = "5511979853312";

// 🔒 Hash SHA-256 da senha do painel admin
// A senha real não fica exposta no código, apenas seu hash
// Senha original: Shalom@2026
export const ADMIN_PIN_HASH =
  "122df3f5b415f5218e4836270b0e493f7c2a3039c378b95cce928de2c2bc8a7d";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "victorioso-nero-oficial",
    name: "Victorioso Nero",
    description:
      "Victorioso Nero abre com notas cítricas e frescas, trazendo energia logo de cara. No coração, aparece um toque aromático e especiado, deixando o perfume mais elegante. Já no fundo, ele entrega madeiras, âmbar e musk, formando um rastro intenso, masculino e sedutor.",
    price: "R$ 350,00",
    volume: "100ml",
    gender: "Masculino",
    intensity: "masculino & sedutor",
    image:
      "https://u4auhby5fx.ufs.sh/f/bgTicoNWbjXkVN2mMrRtyxsKbY2X7NwZoehnJAfWmrFEcGBg",
  },
  {
    id: "Club de Nuit Intense Man",
    name: "Club de Nuit Intense Man",
    description:
      "Club de Nuit Intense Man abre com abacaxi, limão, bergamota e maçã, trazendo frescor frutado. No coração, bétula, jasmim e rosa dão o toque marcante e elegante. No fundo, almíscar, âmbar, patchouli e baunilha deixam um rastro amadeirado, intenso e sedutor.",
    price: "R$ 450,00",
    volume: "100ml",
    gender: "Masculino",
    intensity: "intenso & sedutor",
    image:
      " https://u4auhby5fx.ufs.sh/f/bgTicoNWbjXkZkmkX8gIcshifEkRTjry3SOemu69bo8ZQn1P",
  },
  {
    id: "Hawas Black",
    name: "Hawas Black",
    description:
      "Hawas Black abre com bergamota, abacaxi e toranja, trazendo um frescor frutado bem marcante. No coração, aparecem patchouli, cedro e jasmim, deixando o perfume mais elegante e masculino. No fundo, musgo de carvalho, notas amadeiradas e âmbar entregam um rastro intenso, sofisticado e sedutor.",
    price: "R$ 250,00",
    volume: "100ml",
    gender: "Masculino",
    intensity: "sofisticado & sedutor",
    image:
      "https://u4auhby5fx.ufs.sh/f/bgTicoNWbjXk33MOJbLDzSXMugWvbmI6A2t4TVj3hdBpyfxl",
  },
  {
    id: "Galactic Men Z",
    name: "Galactic Men Z",
    description:
      "Galactic Men Z abre com um frescor cítrico e aromático, trazendo energia logo no início. No coração, aparecem notas especiadas e amadeiradas, deixando o perfume mais marcante. No fundo, a combinação de âmbar, musk e madeiras entrega um rastro masculino, elegante e sedutor.",
    price: "R$ 250,00",
    volume: "100ml",
    gender: "Masculino",
    intensity: "selegante e sedutor",
    image:
      "https://u4auhby5fx.ufs.sh/f/bgTicoNWbjXkqN5um5kZfGTw178xy9OuYUDjXFRJLAzegdrK",
  },
  {
    id: "Yara",
    name: "Yara",
    description:
      "Yara abre com frutas doces e um toque cítrico, trazendo leveza e feminilidade. No coração, aparecem flores brancas e notas cremosas, deixando a fragrância suave e envolvente. No fundo, baunilha, musk e notas amadeiradas garantem um rastro doce, elegante e confortável.",
    price: "R$ 250,00",
    volume: "100ml",
    gender: "Feminino",
    intensity: "elegante & confortável",
    image:
      "https://u4auhby5fx.ufs.sh/f/bgTicoNWbjXkLXInBW4HXsF4aCQ8N2wzZYDrJtTkhv9qRdfe",
  },
  {
    id: "Yara Candy",
    name: "Yara Candy",
    description:
      "Yara Candy abre com um toque frutado e docinho, lembrando bala/chiclete. No coração, aparecem flores suaves e notas cremosas, deixando o perfume bem feminino e envolvente. No fundo, baunilha, musk e acordes açucarados garantem um rastro delicioso, marcante e super confortável.",
    price: "R$ 250,00",
    volume: "100ml",
    gender: "Feminino",
    intensity: "marcante & super confortável",
    image:
      "https://u4auhby5fx.ufs.sh/f/bgTicoNWbjXkJs9gQTnBUoiM0cdChWOsj86fm7zqRFZr2uPJ",
  },
  {
    id: "Saher",
    name: "Saher",
    description:
      "As notas de topo são: Açafrão, Lavanda e Mandarina. As notas de coração são: Noz-moscada, Violeta e Osmanthus. As notas de fundo são: Immortelle, Almíscar, Patchouli e Agarwood (Oud).",
    price: "R$ 250,00",
    volume: "100ml",
    gender: "Masculino",
    intensity: "sofisticado & sedutor",
    image:
      "https://u4auhby5fx.ufs.sh/f/bgTicoNWbjXk1vICSpxV8tvm9APyziwlkad7WpGbQeFBqKOV",
  },
  {
    id: "Maahir",
    name: "Maahir",
    description:
      "Maahir é um perfume árabe marcante e sofisticado, com abertura fresca e especiada, seguida de um corpo amadeirado elegante e um fundo quente de âmbar e musk. Intenso, luxuoso e perfeito para quem gosta de presença.",
    price: "R$ 250,00",
    volume: "100ml",
    gender: "Masculino",
    intensity: "luxuoso & perfeito para quem gosta de presença",
    image:
      "https://u4auhby5fx.ufs.sh/f/bgTicoNWbjXk2TrOiryxYfpyJcjMCtFbsVWS0lLDId475HqZ",
  },
  {
    id: "Ameerat Privé Rose",
    name: "Ameerat Privé Rose",
    description:
      "Ameerat Privé Rose abre com um toque frutado e cítrico, trazendo leveza e brilho. No coração, a rosa aparece com elegância junto de um floral delicado. No fundo, baunilha, musk e madeiras suaves deixam um rastro cremoso, feminino e sofisticado.",
    price: "R$ 250,00",
    volume: "100ml",
    gender: "Feminino",
    intensity: "feminino & sofisticado",
    image:
      "https://u4auhby5fx.ufs.sh/f/bgTicoNWbjXkrg3iwOjlnsvNuwohx9SDWfc67pQeYKzZVbtO",
  },
];
