import { Personal, PersonalLicencias, Feriados, IsoNc, IsoNcTipo, IsoNcOrigen, IsoNcEstado } from "../db/index.js"
import Sequelize, { Op } from "sequelize";
import ExcelJS from 'exceljs'
//import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { formatDate, today } from "../utils/functions.js";
import { LICENCES_STATUS } from "../utils/constants.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const Libro20_NCPath = path.join(__dirname, '../', 'archivos', 'plantillas', 'Libro20_NC.xlsx');
const Libro22_LicenciasPath = path.join(__dirname, '../', 'archivos', 'plantillas', 'Libro22_Licencias.xlsx');
const Libro21_PedidoLicPath = path.join(__dirname, '../', 'archivos', 'plantillas', 'Libro21_PedidoLic.xlsx');

export const requestVacations = async (idPersonal, res) => {
  try {
    // Obtener nombre del personal
    const persona = await Personal.findOne({ where: { Id: idPersonal } });
    if (!persona) return res.status(404).send('Personal no encontrado');

    const nomPersonal = `${persona.Apellido} ${persona.Nombre}`.substring(0, 50);

    // Fecha de hoy en formato ISO
    const fechaHoy = formatDate(today());

    // Próxima fecha de inicio de licencia
    const licenciaInicio = await PersonalLicencias.findOne({
      attributes: [[Sequelize.fn('MIN', Sequelize.col('Fecha')), 'Inicio']],
      where: {
        IdEstado: LICENCES_STATUS.APPROVED,
        IdPersonal: idPersonal,
        Fecha: { [Op.gte]: fechaHoy },
      },
    });

    const finicio = licenciaInicio?.dataValues?.Inicio || '';

    // Próxima fecha de fin de licencia
    const licenciaFin = await PersonalLicencias.findOne({
      attributes: [[Sequelize.fn('MAX', Sequelize.col('Fecha')), 'Fin']],
      where: {
        IdEstado: LICENCES_STATUS.APPROVED,
        IdPersonal: idPersonal,
        Fecha: { [Op.gte]: fechaHoy },
      },
    });

    const ffin = licenciaFin?.dataValues?.Fin || '';

    // Obtener todos los feriados
    const feriados = await Feriados.findAll();
    const feriadosMap = new Map();
    feriados.forEach((feriado) => {
      const fecha = new Date(feriado.Fecha).toISOString().split('T')[0];
      feriadosMap.set(fecha, true);
    });

    // Calcular próxima fecha hábil
    let diasig = '';
    if (finicio && ffin) {
      let esHabil = false;
      diasig = new Date(ffin);

      while (!esHabil) {
        diasig.setDate(diasig.getDate() + 1);

        // Verificar si es feriado
        const esFeriado = feriadosMap.has(diasig.toISOString().split('T')[0]);

        // Verificar si es domingo
        const esDomingo = diasig.getDay() === 0;

        if (!esFeriado && !esDomingo) {
          esHabil = true;
        }
      }
    }

    // Cargar la plantilla Excel
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(Libro21_PedidoLicPath);
    const sheet = workbook.getWorksheet(1);

    // Escribir encabezados y datos en el Excel
    sheet.getCell('E5').value = fechaHoy.toLocaleDateString('es-ES');
    sheet.getCell('E6').value = nomPersonal;

    // Desde
    if (finicio) {
      const [a, m, d] = finicio.split('-');
      sheet.getCell('C11').value = d;
      sheet.getCell('D11').value = m;
      sheet.getCell('E11').value = a;
    }

    // Hasta
    if (ffin) {
      const [a, m, d] = ffin.split('-');
      sheet.getCell('F11').value = d;
      sheet.getCell('G11').value = m;
      sheet.getCell('H11').value = a;
    }

    // Retoma
    if (diasig) {
      const [a, m, d] = diasig.toISOString().split('T')[0].split('-');
      sheet.getCell('I11').value = d;
      sheet.getCell('J11').value = m;
      sheet.getCell('K11').value = a;
    }

    // Duración
    if (finicio && ffin) {
      const duracion = contarDiasLic(finicio, ffin);
      sheet.getCell('C14').value = `Duración licencia: ${duracion} días`;
    }

    // Descargar archivo Excel
    res.setHeader('Content-Type', 'application/vnd.ms-excel');
    res.setHeader('Content-Disposition', 'attachment; filename="archivo.xls"');
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generando el archivo Excel');
  }
}

export const isoNc = async (id, res) => {
  try {
    const nc = await IsoNc.findOne({
      where: { Id: id },
      include: [
        { model: IsoNcTipo, as: 'tipo' },
        { model: IsoNcOrigen, as: 'origen' },
        { model: IsoNcEstado, as: 'estado' },
        { model: Personal, as: 'emisor' },
        { model: Personal, as: 'det' },
        { model: Personal, as: 'causa' },
        { model: Personal, as: 'accion' },
        { model: Personal, as: 'va' },
        { model: Personal, as: 'vef' }
      ],
    });

    if (!nc) return res.status(404).send('No se encontró la NC');

    // Formatear las fechas
    const formatearFecha = (fecha) =>
      fecha && fecha !== '0000-00-00' ? new Date(fecha).toLocaleDateString('es-ES') : '';

    const fecha = formatearFecha(nc.Fecha);
    const fechaA = formatearFecha(nc.FechaA);
    const fechaVA = formatearFecha(nc.FechaVA);
    const fechaVEF = formatearFecha(nc.FechaVEF);

    const nro = nc.NroNC.toString().padStart(5, '0');
    const tipo = nc.IdTipo;
    const ori = nc.origen.Nombre;
    const des = nc.Descripcion;
    const cau = nc.Causa;
    const acc = nc.Accion;

    const respd = `${nc.det.Apellido} ${nc.det.Nombre}`;
    const respe = `${nc.emisor.Apellido} ${nc.emisor.Nombre}`;
    const respc = `${nc.causa.Apellido} ${nc.causa.Nombre}`;
    const respa = `${nc.accion.Apellido} ${nc.accion.Nombre}`;
    const respva = `${nc.va.Apellido} ${nc.va.Nombre}`;
    const respvef = `${nc.vef.Apellido} ${nc.vef.Nombre}`;

    // Determinar columna de tipo
    let xtipo = '';
    switch (tipo) {
      case 1:
        xtipo = 'C';
        break;
      case 2:
        xtipo = 'E';
        break;
      case 3:
      case 4:
        xtipo = 'G';
        break;
    }

    // Cargar la plantilla Excel
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(Libro20_NCPath);
    const sheet = workbook.getWorksheet(1);

    // Llenar datos en la hoja de cálculo
    let rowex = 5;

    sheet.getCell(`C${rowex}`).value = fecha;
    sheet.getCell(`E${rowex}`).value = respd;
    sheet.getCell(`G${rowex}`).value = nro;
    rowex++;

    sheet.getCell(`D${rowex}`).value = 'Observación';
    sheet.getCell(`${xtipo}${rowex}`).value = 'X';
    rowex++;

    sheet.getCell(`C${rowex}`).value = ori;
    rowex++;

    sheet.getCell(`B${rowex}`).value = 'Descripción:';
    rowex++;
    sheet.getCell(`B${rowex}`).value = des;
    rowex++;
    sheet.getCell(`C${rowex}`).value = respe;
    rowex += 2;

    sheet.getCell(`B${rowex}`).value = 'Análisis de la Causa:';
    rowex++;
    sheet.getCell(`B${rowex}`).value = cau;
    rowex++;
    sheet.getCell(`C${rowex}`).value = respc;
    rowex += 2;

    sheet.getCell(`B${rowex}`).value = 'Acción:';
    rowex++;
    sheet.getCell(`B${rowex}`).value = acc;
    rowex++;
    sheet.getCell(`B${rowex}`).value = 'Fecha implementación acción propuesta:';
    sheet.getCell(`E${rowex}`).value = fechaA;
    rowex++;
    sheet.getCell(`C${rowex}`).value = respa;
    rowex++;

    sheet.getCell(`B${rowex}`).value = 'Fecha verificación implementación:';
    sheet.getCell(`E${rowex}`).value = fechaVA;
    rowex++;
    sheet.getCell(`C${rowex}`).value = respva;
    rowex += 2;

    sheet.getCell(`B${rowex}`).value = 'Fecha verificación eficacia acción:';
    sheet.getCell(`E${rowex}`).value = fechaVEF;
    rowex++;
    sheet.getCell(`C${rowex}`).value = respvef;

    // Opciones de estilo
    sheet.views = [{ showGridLines: false }];

    // Exportar el archivo
    res.setHeader('Content-Type', 'application/vnd.ms-excel');
    res.setHeader('Content-Disposition', `attachment; filename="archivo-${nro}.xls"`);
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generando el archivo Excel');
  }
}

export const getStaffLicences = async ({ puesto, fechaDesde }, res) => {
	try {
    const DAYS_TO_EXPORT = 180
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(Libro22_LicenciasPath);
    const sheet = workbook.getWorksheet(1);
    sheet.getRow(1).getCell(4).style.font.strike = false

    // Parámetros recibidos
    const hoy = formatDate(today());
    const fechaInicial = fechaDesde ? formatDate(fechaDesde) : hoy;

    // Filtros
    const puestoFiltro = puesto ? { IdPuesto: puesto } : {};
    const activoFiltro = Sequelize.or(
      { FechaBaja: '0000-00-00' },
      Sequelize.where(
        Sequelize.fn('DATEDIFF', Sequelize.fn('NOW'), Sequelize.col('FechaBaja')),
        '<',
        0
      )
    );

    // Query para obtener el personal
    const personal = await Personal.findAll({
      where: {
        ...puestoFiltro,
        ...activoFiltro,
        Id: {[Sequelize.Op.ne] : 0},
      },
      order: [['Apellido', 'ASC'], ['Nombre', 'ASC']],
    });

    // Escribe los días en las columnas
    let fecha = new Date(fechaInicial);
    for (let col = 2; col <= DAYS_TO_EXPORT + 1; col++) {
      const diaSemana = fecha.toLocaleString('es-ES', { weekday: 'short' });
      const diaMes = `${diaSemana} ${fecha.getDate()}-${fecha.getMonth() + 1}`;
      sheet.getRow(2).getCell(col).value = diaMes;
      fecha.setDate(fecha.getDate() + 1);
    }

    // Escribe una fila por cada persona
    let rowNumber = 3;

    // Consulta todas las licencias de las personas activas en el rango de fechas
    const licencias = await PersonalLicencias.findAll({
      where: {
        Fecha: {
          [Sequelize.Op.between]: [fechaInicial, new Date(fechaInicial).setDate(fechaInicial.getDate() + DAYS_TO_EXPORT + 1)],
        },
      },
    });

    // Convierte las licencias en un mapa para acceder rápidamente por IdPersonal y Fecha
    const licenciasMap = new Map();
    licencias.forEach((licencia) => {
      const key = `${licencia.IdPersonal}-${new Date(licencia.Fecha).toISOString().split('T')[0]}`;
      licenciasMap.set(key, licencia);
    });

    for (const persona of personal) {
      const cell = sheet.getRow(rowNumber).getCell(1)
      cell.value = `${persona.Apellido} ${persona.Nombre}`;
      cell.style.font.strike = false
      fecha = new Date(fechaInicial);
      
      for (let col = 2; col <= DAYS_TO_EXPORT + 1; col++) {
        // Busca licencia en el mapa
        const key = `${persona.Id}-${new Date(fecha).toISOString().split('T')[0]}`;
        const licencia = licenciasMap.get(key);
        
        if (licencia) {
          const cell2 = sheet.getRow(rowNumber).getCell(col);
          cell2.value = ' ';
          cell2.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF008000' }, // Verde
          };
        }

        fecha.setDate(fecha.getDate() + 1);
      }

      rowNumber++;
    }

    // Estilo de bordes
    sheet.eachRow((row, rowIndex) => {
      if (rowIndex >= 3) {
        row.eachCell((cell) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
      }
    });

    // Genera el archivo Excel
    res.setHeader('Content-Type', 'application/vnd.ms-excel');
    res.setHeader('Content-Disposition', 'attachment; filename="archivo.xls"');
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generando el archivo Excel');
  }
};

const contarDiasLic = (inicio, fin) => {
  const fechaInicio = new Date(inicio);
  const fechaFin = new Date(fin);
  return Math.ceil((fechaFin - fechaInicio) / (1000 * 60 * 60 * 24)) + 1;
};