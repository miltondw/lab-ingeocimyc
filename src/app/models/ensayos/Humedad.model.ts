export interface IHumedad{
  id:number
  muestra_id:number
  depth:number[]
  tare_weight:number
  tare_plus_wet_soil_weight:number
  tare_plus_dry_soil:number
  dry_soil_weight:number
  water_weight:number
  humidity:number
  cylinder:number[]
}
export interface IHumedadDto extends Omit<IHumedad,'id'>{

}
