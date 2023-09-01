export function calcularTendencia(golpes:number[], humedad:number[]) {
    // Calcular la media de los valores de X y Y Golpes=golpes Humedad=humedad
    const n=3
    let golpesSum = 0, humedadSum = 0;
    
    for (let i = 0; i < n; i++) {
      golpesSum += golpes[i];
      humedadSum += humedad[i];
    }
    
    const golpesMedia = golpesSum / n;
    const humedadMedia = humedadSum / n;

    // Calcular los coeficientes de la regresión lineal
    let num = 0, den = 0;
    for (let i = 0; i < n; i++) {
      num += (golpes[i] - golpesMedia) * (humedad[i] - humedadMedia);
      den += Math.pow(golpes[i] - golpesMedia, 2);
    }
    
    const beta1 = num / den;
    const beta0 = humedadMedia - beta1 * golpesMedia;
    const tendencia=beta0+beta1*25
    return tendencia;
}
