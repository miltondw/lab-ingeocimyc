interface PeriodicElement {
  prueba: string;
  primera?: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [
  {
    prueba: 'Profundidad',
    primera:'depth'
  },
  {
    prueba: 'Peso del tara (P1)',
    primera: 'tare_weight',
  },
  {
    prueba: 'Peso Tara + peso suelo húmedo(P2)',
    primera: 'tare_plus_wet_soil_weight',
  },
  {
    prueba: 'Peso Tara + Suelo seco (P3)',
    primera: 'tare_plus_dry_soil',
  },
  {
    prueba: 'Peso del Suelo seco',
    primera: 'dry_soil_weight',
  },
  {
    prueba: 'Peso del agua (Grs)',
    primera: 'water_weight',
  },
  {
    prueba: 'Contenido de Humedad (%)',
    primera: 'humidity',
  }
];
