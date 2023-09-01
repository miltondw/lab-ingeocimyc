export interface IGranulometriaEnsayo {
  id: number
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
  } | string
  muestra_id: number
}
export interface IGranulometria extends Omit<IGranulometriaEnsayo, 'id'> {
  total?: number;
  retenido?: number[]
  acum?: number[]
  pasa?: number[]
  grava?: number
  arena?: number
  finos?: number
  sucs_data?: string
}
export interface IEnsayoGranulometriaDTO extends IGranulometria { }
