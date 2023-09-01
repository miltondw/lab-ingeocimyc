export interface ILiquido{
  id:number
  muestra_id:number
  number_of_strokes:number
  tare_number:number
  tare_plus_wet_soil_weight:number
  tare_plus_dry_soil:number
  dry_soil_weight:number
  water_weight:number
  humidity:number
  limite_liquido?:number
  tare_weight:number
  numero_prueba:number
}
export interface ILiquidoDto extends Omit<ILiquido,'id'>{

}
