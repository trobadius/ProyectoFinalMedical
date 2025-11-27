/**
 * Ejemplo de cómo usar el procesador de medicamentos con la API
 * Este archivo muestra cómo integrar el OCR procesado con el calendario
 */

import api from '../api';
import { processMedicamentoText } from './medicamentoProcessor';

/**
 * Guarda un medicamento procesado por OCR en el calendario
 * @param {Object} processedData - Datos procesados del medicamento
 * @param {Date} fecha - Fecha para programar el medicamento (opcional, por defecto hoy)
 * @returns {Promise} - Respuesta de la API
 */
export async function saveMedicamentoToCalendar(processedData, fecha = new Date()) {
  if (!processedData.principal) {
    throw new Error('No hay información de medicamento para guardar');
  }
  
  const { principal } = processedData;
  const fechaFormato = fecha.toISOString().split('T')[0];
  
  try {
    const response = await api.post('/medicamentos-programados/', {
      nombre: principal.nombre,
      intervalo: principal.intervalo || 8,
      fecha: fechaFormato,
      ultima_toma: null
    });
    
    return {
      success: true,
      data: response.data,
      message: `Medicamento ${principal.nombre} guardado correctamente`
    };
  } catch (error) {
    console.error('Error al guardar medicamento:', error);
    return {
      success: false,
      error: error.message,
      message: 'Error al guardar el medicamento'
    };
  }
}

/**
 * Guarda múltiples medicamentos de una receta procesada
 * @param {Object} processedData - Datos procesados de la receta
 * @param {Date} fechaInicio - Fecha de inicio del tratamiento
 * @returns {Promise<Array>} - Array de resultados
 */
export async function saveMedicamentosFromReceta(processedData, fechaInicio = new Date()) {
  const results = [];
  
  // Guardar medicamento principal
  if (processedData.principal) {
    const result = await saveMedicamentoToCalendar(processedData, fechaInicio);
    results.push(result);
    
    // Si hay duración de tratamiento, crear entradas para los días siguientes
    if (processedData.principal.duracionDias) {
      const duracion = processedData.principal.duracionDias;
      
      for (let i = 1; i < duracion; i++) {
        const fecha = new Date(fechaInicio);
        fecha.setDate(fecha.getDate() + i);
        
        const result = await saveMedicamentoToCalendar(processedData, fecha);
        results.push(result);
      }
    }
  }
  
  // Guardar otros medicamentos detectados (si el usuario lo confirma)
  if (processedData.medicamentos.length > 1) {
    const otrosMedicamentos = processedData.medicamentos.slice(1);
    
    for (const med of otrosMedicamentos) {
      const confirmar = window.confirm(
        `¿También deseas agregar ${med.nombre} (confianza: ${med.confianza}%)?`
      );
      
      if (confirmar) {
        // Crear un objeto similar al principal para estos medicamentos
        const dataTemp = {
          principal: {
            nombre: med.nombre,
            intervalo: 8, // Default
            duracionDias: processedData.principal?.duracionDias || null
          }
        };
        
        const result = await saveMedicamentoToCalendar(dataTemp, fechaInicio);
        results.push(result);
      }
    }
  }
  
  return results;
}

/**
 * Procesa texto de OCR y ofrece guardarlo en el calendario
 * @param {string} ocrText - Texto extraído del OCR
 * @returns {Promise} - Resultado del procesamiento y guardado
 */
export async function processAndSaveOCR(ocrText) {
  // 1. Procesar el texto
  const processedData = processMedicamentoText(ocrText);
  
  if (!processedData.principal) {
    return {
      success: false,
      message: 'No se pudo identificar medicamentos en el texto',
      processedData
    };
  }
  
  // 2. Mostrar información al usuario y pedir confirmación
  const { principal } = processedData;
  const mensaje = `
Se detectó el siguiente medicamento:
  
📋 Nombre: ${principal.nombre}
${principal.dosis ? `💊 Dosis: ${principal.dosis}` : ''}
${principal.frecuenciaTexto ? `⏰ Frecuencia: ${principal.frecuenciaTexto}` : ''}
🕐 Intervalo: Cada ${principal.intervalo} horas
${principal.duracionDias ? `📅 Duración: ${principal.duracionDias} días` : ''}
${principal.cantidad ? `📦 Cantidad: ${principal.cantidad}` : ''}

✓ Confianza: ${principal.confianza}%

¿Deseas agregarlo al calendario?
  `.trim();
  
  const confirmar = window.confirm(mensaje);
  
  if (!confirmar) {
    return {
      success: false,
      message: 'El usuario canceló la operación',
      processedData
    };
  }
  
  // 3. Guardar en el calendario
  const results = await saveMedicamentosFromReceta(processedData);
  
  const exitosos = results.filter(r => r.success).length;
  const fallidos = results.filter(r => !r.success).length;
  
  return {
    success: exitosos > 0,
    message: `${exitosos} medicamento(s) guardado(s) correctamente${fallidos > 0 ? `, ${fallidos} fallido(s)` : ''}`,
    processedData,
    results
  };
}

export default {
  saveMedicamentoToCalendar,
  saveMedicamentosFromReceta,
  processAndSaveOCR
};
