import type { Cities } from "@/features/FormSteps/components/ComboboxCordsControlled";
import { CITIES } from "@/config";

export function findCityOnText(texto: string): Cities | undefined {
  // Normalizar el texto: minúsculas y sin acentos
  const normalizedText = texto
    .toLowerCase()
    .normalize("NFD") // Separar acentos
    .replace(/[\u0300-\u036f]/g, ""); // Eliminar diacríticos
  
  // Buscar cada ciudad en el texto normalizado
  for (const city of CITIES) {
    // Normalizar también el nombre de la ciudad
    const normalizedCity = city
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    
    // Verificar si la ciudad está presente en el texto
    if (normalizedText.includes(normalizedCity)) {
      return city as Cities 
    }
  }
  
  return undefined;
}
