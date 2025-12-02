/**
 * Utilidades para procesar y limpiar texto de medicamentos extraído por OCR
 * Usa NLP, regex y fuzzy matching para extraer información relevante
 */

// Lista de medicamentos comunes en español (puedes expandir esta lista)
const MEDICAMENTOS_CONOCIDOS = [
  'paracetamol', 'ibuprofeno', 'aspirina', 'amoxicilina', 'omeprazol',
  'losartan', 'metformina', 'atorvastatina', 'simvastatina', 'enalapril',
  'captopril', 'diclofenaco', 'naproxeno', 'cetirizina', 'loratadina',
  'salbutamol', 'insulina', 'levotiroxina', 'prednisona', 'dexametasona',
  'ranitidina', 'clonazepam', 'diazepam', 'fluoxetina', 'sertralina',
  'amlodipino', 'carvedilol', 'furosemida', 'hidroclorotiazida', 'tramadol',
  'ketorolaco', 'acetaminofen', 'dipirona', 'metamizol', 'ciprofloxacino',
  'azitromicina', 'claritromicina', 'doxiciclina', 'levofloxacino',
  'pantoprazol', 'esomeprazol', 'lansoprazol', 'sucralfato', 'domperidona',
  'metoclopramida', 'ondansetron', 'loperamida', 'betametasona', 'hidrocortisona',
  'mometasona', 'budesonida', 'montelukast', 'formoterol', 'tiotropio',
  'acetilsalicilico', 'clopidogrel', 'warfarina', 'apixaban', 'rivaroxaban',
  'heparina', 'insulina_glargina', 'insulina_lispro', 'gabapentina',
  'pregabalina', 'lamotrigina', 'valproato', 'carbamazepina', 'quetiapina',
  'risperidona', 'olanzapina', 'aripiprazol', 'haloperidol', 'mirtazapina',
  'venlafaxina', 'duloxetina', 'bupropion', 'tamsulosina', 'finasterida',
  'dutasterida', 'sildenafil', 'tadalafil', 'alopurinol', 'colchicina',
  'ferro_fumarato', 'ferro_gluconato', 'hierro_sulfato', 'acido_folico',
  'vitamina_b12', 'vitamina_d', 'calcitriol', 'alendronato', 'ibandronato',
  'ketoconazol', 'fluconazol', 'itraconazol', 'amoxicilina_clavulanico',
  'ceftriaxona', 'cefalexina', 'cefuroxima', 'meropenem', 'piperacilina_tazobactam',
  'aciclovir', 'valaciclovir', 'oseltamivir', 'clotrimazol', 'nistatina',
  'lorazepam', 'alprazolam', 'midazolam', 'propranolol', 'atenolol',
  'bisoprolol', 'ivermectina', 'nitrofurantoina'
];



// Patrones regex para extraer información
const PATTERNS = {
  // Dosis: 500mg, 20 mg, 10mg/ml, etc.
  dosis: /(\d+(?:\.\d+)?)\s*(mg|g|ml|mcg|UI|u|µg)(?:\/(\d+(?:\.\d+)?)\s*(mg|g|ml|mcg|µg))?/gi,
  
  // Frecuencia: cada 8 horas, 3 veces al día, c/12h, etc.
  frecuencia: /(?:cada|c\/)\s*(\d+)\s*(?:horas?|h|hrs?)|(\d+)\s*(?:veces?|vez)\s*(?:al|por)\s*(?:día|dia)/gi,
  
  // Duración: por 7 días, durante 10 días, etc.
  duracion: /(?:por|durante)\s*(\d+)\s*(?:días?|dia|dias|semanas?)/gi,
  
  // Vía de administración
  via: /(?:vía|via)\s*(oral|intravenosa|intramuscular|subcutánea|tópica|oftálmica|ótica)/gi,
  
  // Cantidad: 30 tabletas, 20 cápsulas, etc.
  cantidad: /(\d+)\s*(tabletas?|cápsulas?|capsulas?|comprimidos?|ampolletas?|ml|sobres?)/gi,
  
  // Palabras comunes en recetas que no son medicamentos
  stopWords: /(?:dr\.|dra\.|doctor|doctora|paciente|nombre|fecha|receta|médica|medica|prescripción|prescripcion|tratamiento|indicaciones|posología|posologia)/gi
};

/**
 * Limpia el texto eliminando caracteres no deseados y normalizando espacios
 */
export function cleanText(text) {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/[^\w\s\dáéíóúñü.,:\-\/]/gi, ' ') // Mantener solo caracteres útiles
    .replace(/\s+/g, ' ') // Normalizar espacios múltiples
    .trim();
}

/**
 * Extrae dosis del texto
 */
export function extractDosis(text) {
  const matches = [...text.matchAll(PATTERNS.dosis)];
  return matches.map(match => ({
    valor: parseFloat(match[1]),
    unidad: match[2].toLowerCase(),
    texto: match[0]
  }));
}

/**
 * Extrae frecuencia de administración
 */
export function extractFrecuencia(text) {
  const matches = [...text.matchAll(PATTERNS.frecuencia)];
  const frecuencias = [];
  
  matches.forEach(match => {
    if (match[1]) {
      // Formato "cada X horas"
      frecuencias.push({
        tipo: 'horas',
        valor: parseInt(match[1]),
        texto: match[0],
        intervalo: parseInt(match[1]) // Para usar directamente en el calendario
      });
    } else if (match[2]) {
      // Formato "X veces al día"
      const vecesAlDia = parseInt(match[2]);
      frecuencias.push({
        tipo: 'veces_dia',
        valor: vecesAlDia,
        texto: match[0],
        intervalo: Math.round(24 / vecesAlDia) // Convertir a horas
      });
    }
  });
  
  return frecuencias;
}

/**
 * Extrae duración del tratamiento
 */
export function extractDuracion(text) {
  const matches = [...text.matchAll(PATTERNS.duracion)];
  return matches.map(match => ({
    valor: parseInt(match[1]),
    texto: match[0]
  }));
}

/**
 * Extrae cantidad de medicamento
 */
export function extractCantidad(text) {
  const matches = [...text.matchAll(PATTERNS.cantidad)];
  return matches.map(match => ({
    valor: parseInt(match[1]),
    unidad: match[2],
    texto: match[0]
  }));
}

/**
 * Implementación simple de fuzzy matching (similar a rapidfuzz)
 * Calcula la distancia de Levenshtein entre dos strings
 */
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitución
          matrix[i][j - 1] + 1,     // inserción
          matrix[i - 1][j] + 1      // eliminación
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Calcula similitud entre dos strings (0-100)
 */
function similarityScore(str1, str2) {
  const distance = levenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);
  return ((maxLength - distance) / maxLength) * 100;
}

/**
 * Encuentra el medicamento más similar en la lista de conocidos
 * usando fuzzy matching
 */
export function findBestMatch(word, threshold = 70) {
  let bestMatch = null;
  let bestScore = 0;
  
  for (const medicamento of MEDICAMENTOS_CONOCIDOS) {
    const score = similarityScore(word.toLowerCase(), medicamento);
    if (score > bestScore && score >= threshold) {
      bestScore = score;
      bestMatch = {
        medicamento,
        score: Math.round(score),
        original: word
      };
    }
  }
  
  return bestMatch;
}

/**
 * Extrae nombres de medicamentos del texto
 * usando fuzzy matching contra lista de medicamentos conocidos
 */
export function extractMedicamentos(text) {
  const cleanedText = cleanText(text);
  const words = cleanedText.split(/\s+/);
  const medicamentos = [];
  const found = new Set();
  
  // Buscar coincidencias en palabras individuales
  words.forEach(word => {
    if (word.length < 4) return; // Ignorar palabras muy cortas
    
    // Verificar si es una palabra stop
    if (PATTERNS.stopWords.test(word)) return;
    
    const match = findBestMatch(word, 70); // 70% de similitud mínima
    if (match && !found.has(match.medicamento)) {
      medicamentos.push(match);
      found.add(match.medicamento);
    }
  });
  
  // Buscar coincidencias en bigramas (dos palabras seguidas)
  for (let i = 0; i < words.length - 1; i++) {
    const bigram = `${words[i]} ${words[i + 1]}`;
    if (bigram.length < 6) continue;
    
    const match = findBestMatch(bigram, 75);
    if (match && !found.has(match.medicamento)) {
      medicamentos.push(match);
      found.add(match.medicamento);
    }
  }
  
  return medicamentos;
}

/**
 * Procesa el texto completo extraído por OCR y devuelve
 * información estructurada sobre medicamentos
 */
export function processMedicamentoText(ocrText) {
  if (!ocrText || ocrText.trim().length === 0) {
    return {
      error: 'No se detectó texto',
      medicamentos: [],
      dosis: [],
      frecuencias: [],
      duracion: [],
      cantidad: []
    };
  }
  
  const cleanedText = cleanText(ocrText);
  
  // Extraer información
  const medicamentos = extractMedicamentos(cleanedText);
  const dosis = extractDosis(cleanedText);
  const frecuencias = extractFrecuencia(cleanedText);
  const duracion = extractDuracion(cleanedText);
  const cantidad = extractCantidad(cleanedText);
  
  // Construir resultado estructurado
  const result = {
    textoOriginal: ocrText,
    textoLimpio: cleanedText,
    medicamentos: medicamentos.map(m => ({
      nombre: m.medicamento,
      nombreOriginal: m.original,
      confianza: m.score
    })),
    dosis: dosis,
    frecuencias: frecuencias,
    duracion: duracion,
    cantidad: cantidad,
    // Información consolidada para el medicamento principal
    principal: null
  };
  
  // Si encontramos medicamentos, construir objeto principal
  if (medicamentos.length > 0) {
    const medPrincipal = medicamentos[0]; // El de mayor score
    result.principal = {
      nombre: medPrincipal.medicamento,
      dosis: dosis.length > 0 ? `${dosis[0].valor} ${dosis[0].unidad}` : null,
      intervalo: frecuencias.length > 0 ? frecuencias[0].intervalo : 8, // Default 8 horas
      frecuenciaTexto: frecuencias.length > 0 ? frecuencias[0].texto : null,
      duracionDias: duracion.length > 0 ? duracion[0].valor : null,
      cantidad: cantidad.length > 0 ? `${cantidad[0].valor} ${cantidad[0].unidad}` : null,
      confianza: medPrincipal.score
    };
  }
  
  return result;
}

/**
 * Formatea el resultado para mostrar al usuario
 */
export function formatMedicamentoInfo(processedData) {
  if (!processedData.principal) {
    return 'No se pudo identificar ningún medicamento en el texto.';
  }
  
  const p = processedData.principal;
  let info = `📋 Medicamento: ${p.nombre.toUpperCase()}\n`;
  
  if (p.dosis) info += `💊 Dosis: ${p.dosis}\n`;
  if (p.frecuenciaTexto) info += `⏰ Frecuencia: ${p.frecuenciaTexto}\n`;
  if (p.intervalo) info += `🕐 Cada ${p.intervalo} horas\n`;
  if (p.duracionDias) info += `📅 Duración: ${p.duracionDias} días\n`;
  if (p.cantidad) info += `📦 Cantidad: ${p.cantidad}\n`;
  if (p.confianza) info += `\n✓ Confianza: ${p.confianza}%`;
  
  // Mostrar otros medicamentos detectados si los hay
  if (processedData.medicamentos.length > 1) {
    info += '\n\n🔍 Otros medicamentos detectados:\n';
    processedData.medicamentos.slice(1).forEach(m => {
      info += `  • ${m.nombre} (${m.confianza}%)\n`;
    });
  }
  
  return info;
}

// Exportar lista de medicamentos conocidos para poder expandirla
export { MEDICAMENTOS_CONOCIDOS };
