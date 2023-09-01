export function waterSoilHumidity(tare: number, drySoil: number, wetSoil: number) {
    const pesoSuelo: number = Number((drySoil - tare).toFixed(2))
    const pesoAgua: number = Number((wetSoil - drySoil).toFixed(2))
    let humedad: number = Number(((pesoAgua / pesoSuelo)*100).toFixed(2))
    if (humedad == Infinity || Number.isNaN(humedad)) humedad = 0
    return {
      pesoSuelo,
      pesoAgua,
      humedad
    }
  }
