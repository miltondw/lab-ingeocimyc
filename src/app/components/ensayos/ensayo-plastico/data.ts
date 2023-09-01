interface PeriodicElement {
  prueba: string;
  primera: string;
  segunda: number;
}


export const ELEMENT_DATA: PeriodicElement[] = [

  {
    prueba: 'Tara N°',
    primera: 'tare_number',
    segunda: 4
  },
  {
    prueba: 'Peso Tara',
    primera: 'tare_weight',
    segunda: 4
  },
  {
    prueba: 'Peso Tara + peso suelo húmedo',
    primera: 'tare_plus_wet_soil_weight',
    segunda: 14
  },
  {
    prueba: 'Peso Tara + Suelo seco',
    primera: 'tare_plus_dry_soil',
    segunda: 6
  },
  {
    prueba: 'Peso del agua',
    primera: 'water_weight',
    segunda: 10,
  },
  {
    prueba: 'Peso del Suelo seco',
    primera: 'dry_soil_weight',
    segunda: 9
  },

  {
    prueba: '% Humedad',
    primera: 'humidity',
    segunda: 12,
  },
];
