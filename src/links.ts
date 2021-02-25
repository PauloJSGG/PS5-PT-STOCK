export type Link = {
  name: string;
  url: string;
  dataDefaultAsin?: string;
  type: LinkType;
};

export enum LinkType {
  AMAZON = "AMAZON",
  MEDIAMARKT = "MEDIAMARKT",
  GAMESTOP = "GAMESTOP",
  EURONICS = "EURONICS",
  CYBERPORT = "CYBERPORT",
  MEO = "MEO",
  NOS = "NOS",
  ELCORT = "ELCORT",
  WORTEN = "WORTEN"
}
  
export const links: Link[] = [
  {
    name: "Media Markt DIGITAL",
    url: "https://mediamarkt.pt/products/consola-playstation-5-edicao-digital",
    type: LinkType.MEDIAMARKT,
  },
  {
    name: "Media Markt NORMAL",
    url: "https://mediamarkt.pt/products/consola-playstation-5",
    type: LinkType.MEDIAMARKT,
  },
  // {
  //   name: "MEO DIGITAL",
  //   url:
  //     "https://loja.meo.pt/Equipamentos/gaming/Sony/Playstation-5-Edicao-Digital?cor=Branco&modo-compra=PromptPayment",
  //   type: LinkType.MEO,
  // },
  // {
  //   name: "MEO NORMAL",
  //   url:
  //     "https://loja.meo.pt/Equipamentos/gaming/Sony/Playstation-5?cor=Branco&modo-compra=PromptPayment",
  //   type: LinkType.MEO,
  // },
  {
    name: "NOS NORMAL",
    url:
      "https://www.nos.pt/particulares/loja-equipamentos/pages/details.aspx?p=36001",
    type: LinkType.NOS,
  },
  {
    name: "NOS DIGITAL",
    url:
      "https://www.nos.pt/particulares/loja-equipamentos/pages/details.aspx?p=36002",
    type: LinkType.NOS,
  },
  {
    name: "ELCORT NORMAL",
    url:
      "https://www.elcorteingles.pt/gaming/A37046604-consola-playstation-5/",
    type: LinkType.ELCORT,
  },
  {
    name: "ELCORT DIGITAL",
    url:
      "https://www.elcorteingles.pt/gaming/A37046605-consola-playstation-5-edicao-digital/",
    type: LinkType.ELCORT,
  },
  {
    name: "WORTEN NORMAL",
    url:
      "https://www.worten.pt/gaming/playstation/consolas/ps5/consola-ps5-825gb-7196053",
    type: LinkType.WORTEN,
  },
  {
    name: "WORTEN DIGITAL",
    url:
      "https://www.worten.pt/gaming/playstation/consolas/ps5/consola-ps5-edicao-digital-825-gb-7196054",
    type: LinkType.WORTEN,
  },
];
