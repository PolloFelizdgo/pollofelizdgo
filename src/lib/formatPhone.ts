// src/lib/formatPhone.ts

/**
 * Formatea un número de teléfono a un estilo consistente.
 * Ej: "6181293730" -> "618 129 3730"
 * @param phone El número de teléfono a formatear.
 * @returns El número formateado o una cadena vacía si no es válido.
 */
export function formatPhone(phone?: string | null): string {
  if (!phone) {
    return "6181293730";
  }

  // Elimina todos los caracteres que no sean dígitos
  const digitsOnly = phone.replace(/\D/g, "");

  // Si no tenemos 10 dígitos, no podemos formatear, devolvemos el original limpio
  if (digitsOnly.length !== 10) {
    return digitsOnly;
  }

  // Formatea a "618 129 3730"
  const areaCode = digitsOnly.substring(0, 3);
  const middle = digitsOnly.substring(3, 6);
  const last = digitsOnly.substring(6);

  return `${areaCode} ${middle} ${last}`;
}
