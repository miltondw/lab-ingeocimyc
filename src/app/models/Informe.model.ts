export interface IInforme{
  granulometria: {
    tamices: {
      inches2: number;
      inches1: number;
      inches34: number;
      inches12: number;
      inches38: number;
      inchesN4: number;
      inchesN10: number;
      inchesN40: number;
      inchesN200: number;
      inchesP200: number;
    };
  };
  header: {
    reference: string;
    date: string;
    tareWeightH: number;
    sampleWeight: number;
    name: string;
    location: string;
    title: string;
    muestra: number;
    probe: number;
  };
  humedad: {
    waterWeightEH: number;
    depth: number[];
    tarePlusWetSoilWeightEH: number;
    tarePlusDrySoilEH: number;
    tareWeightEH: number;
    drySoilWeightEH: number;
    cylinder: number[];
    humidityEH: number;
  };
  plastico?: {
    drySoilWeight: number;
    tarePlusDrySoil: number;
    observation: string | null;
    tareNumber: number;
    tarePlusWetSoilWeight: number;
    waterWeight: number;
    numeroPrueba: number;
    humidity: number;
    tareWeight: number;
  }[];
  liquido?: {
    tareWeightEL: number;
    numeroPruebaEL: number;
    tareNumberEL: number;
    drySoilWeightEL: number;
    waterWeightEL: number;
    tarePlusDrySoilEL: number;
    humidityEL: number;
    numberOfStrokes: number;
    tarePlusWetSoilWeightEL: number;
  }[];
}

