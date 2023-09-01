export interface IPlastico{
    id:number
    muestra_id:number
    tare_number:number
    tare_weight:number
    tare_plus_wet_soil_weight:number
    tare_plus_dry_soil:number
    dry_soil_weight:number
    water_weight:number
    humidity:number
    numero_prueba:number
    observation: string|null,
}
export interface IPlasticoDto extends Omit<IPlastico,'id'>{}
