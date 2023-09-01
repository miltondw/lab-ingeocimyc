interface PeriodicElement {
  pulgada: number | string;
  mm: number | string;
  gr: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [
  {
    pulgada: 2,
    mm: '50,80',
    gr: 'inches2',
  },
  {
    pulgada: 1,
    mm: '25,40',
    gr: 'inches1',
  },
  {
    pulgada: '3/4',
    mm: '19,00',
    gr: 'inches34',
  },
  {
    pulgada: '1/2',
    mm: '12,70',
    gr: 'inches12',
  },
  {
    pulgada: '3/8',
    mm: '9,53',
    gr: 'inches38',
  },
  {
    pulgada: 'No 4',
    mm: '4,75',
    gr: 'inchesN4',
  },
  {
    pulgada: 'No 10',
    mm: '2,00',
    gr: 'inchesN10',
  },
  {
    pulgada: 'No 40',
    mm: '0,425',
    gr: 'inchesN40',
  },
  {
    pulgada: 'No 200',
    mm: '0,075',
    gr: 'inchesN200',
  },
  {
    pulgada: 'P200',
    mm: '<0,075',
    gr: 'inchesP200',
  },
];
