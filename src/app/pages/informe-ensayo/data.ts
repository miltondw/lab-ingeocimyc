interface ILiquido {
    prueba: string;
    primera: string|number;
    segunda: number;
    tercera: number;

  }
  export const DATA_LIQUIDO: ILiquido[] = [
    {
      prueba: 'N° De Golpes',
      primera: 'numberOfStrokes',
      segunda: 11.11,
      tercera: 32.32,
    },
    {
      prueba: 'Tara N°',
      primera: 'tareNumberEL',
      segunda: 44.44,
      tercera: 32.32,
    },
    {
      prueba: 'Peso Tara',
      primera: 'tareWeightEL',
      segunda: 44.44,
      tercera: 32.32,
    },
    {
      prueba: 'Peso Tara + peso suelo húmedo',
      primera: 'tarePlusWetSoilWeightEL',
      segunda: 14.14,
      tercera: 32.32,
    },
    {
      prueba: 'Peso Tara + Suelo seco',
      primera: 'tarePlusDrySoilEL',
      segunda: 66.66,
      tercera: 32.32,
    },
    {
      prueba: 'Peso del agua',
      primera: 'waterWeightEL',
      segunda: 10.12,
      tercera: 32.32,
    },
    {
      prueba: 'Peso del Suelo seco',
      primera: 'drySoilWeightEL',
      segunda: 92.12,
      tercera: 32.32,
    },
    {
      prueba: '% Humedad',
      primera: 'humidityEL',
      segunda: 12.12,
      tercera: 32.32,
    },
  ];

  interface IPlastico {
    prueba: string;
    primera: string|number;
    segunda?: number;
  }
  export const DATA_PLASTICO: IPlastico[] = [
    {
      prueba: 'Tara N°',
      primera: 'tareNumber',
      segunda: 1.111
    },
    {
      prueba: 'Peso Tara',
      primera: 'tareWeight',
      segunda: 44.44
    },
    {
      prueba: 'Peso Tara + peso suelo húmedo',
      primera: 'tarePlusWetSoilWeight',
      segunda: 14.12
    },
    {
      prueba: 'Peso Tara + Suelo seco',
      primera: 'tarePlusDrySoil',
      segunda: 61.12
    },
    {
      prueba: 'Peso del agua',
      primera: 'waterWeight',
      segunda: 10.14,
    },
    {
      prueba: 'Peso del Suelo seco',
      primera: 'drySoilWeight',
      segunda: 99.99
    },
    {
      prueba: '% Humedad',
      primera: 'humidity',
      segunda: 12.88,
    }
  ];

  interface IGranulometria {
    pulgada: number | string;
    mm: number | string;
    gr: string | number;
    retenido:number;
    acum:number;
    pasa:number;
  }
  export const DATA_GRANULOMETRIA: IGranulometria[] = [
    {
      pulgada: 2,
      mm: '50,80',
      gr: 'inches2',
      retenido:0,
      acum:0,
      pasa:0,
    },
    {
      pulgada: 1,
      mm: '25,40',
      gr: 'inches1',
    retenido:1,
      acum:1,
      pasa:1,
    },
    {
      pulgada: '3/4',
      mm: '19,00',
      gr: 'inches34',
    retenido:2,
      acum:2,
      pasa:2,
    },
    {
      pulgada: '1/2',
      mm: '12,70',
      gr: 'inches12',
    retenido:3,
      acum:3,
      pasa:3,
    },
    {
      pulgada: '3/8',
      mm: '9,53',
      gr: 'inches38',
    retenido:4,
      acum:4,
      pasa:4,
    },
    {
      pulgada: 'No 4',
      mm: '4,75',
      gr: 'inchesN4',
    retenido:5,
      acum:5,
      pasa:5,
    },
    {
      pulgada: 'No 10',
      mm: '2,00',
      gr: 'inchesN10',
    retenido:6,
      acum:6,
      pasa:6,
    },
    {
      pulgada: 'No 40',
      mm: '0,425',
      gr: 'inchesN40',
    retenido:7,
      acum:7,
      pasa:7,
    },
    {
      pulgada: 'No 200',
      mm: '0,075',
      gr: 'inchesN200',
    retenido:8,
      acum:8,
      pasa:8,
    },
    {
      pulgada: 'P200',
      mm: '<0,075',
      gr: 'inchesP200',
      retenido:9,
      acum:9,
      pasa:9,
    },
  ];

