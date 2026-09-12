import { CreateReportDto } from '../dto/create-report.dto';
import { Severity } from '../enums/severity.enum';

const etiquetasSeveridad: Record<Severity, string> = {
  [Severity.LOW]: 'Baja',
  [Severity.MEDIUM]: 'Media',
  [Severity.HIGH]: 'Alta',
};

export function generateReportTemplate(dto: CreateReportDto): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Nuevo reporte de fuga de agua</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f0f4f8; margin: 0; padding: 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="background-color: #0369a1; padding: 16px 24px;">
                    <h1 style="color: #ffffff; font-size: 20px; margin: 0;">Nuevo reporte de fuga de agua</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 24px;">
                    <p style="color: #334155; font-size: 14px; margin: 0 0 16px 0;">
                      Se registró un nuevo reporte ciudadano. A continuación los detalles:
                    </p>
                    <table role="presentation" width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
                      <tr>
                        <td style="border: 1px solid #e2e8f0; font-weight: bold; color: #0f172a; width: 40%;">Dirección</td>
                        <td style="border: 1px solid #e2e8f0; color: #334155;">${dto.address}</td>
                      </tr>
                      <tr>
                        <td style="border: 1px solid #e2e8f0; font-weight: bold; color: #0f172a;">Descripción</td>
                        <td style="border: 1px solid #e2e8f0; color: #334155;">${dto.description}</td>
                      </tr>
                      <tr>
                        <td style="border: 1px solid #e2e8f0; font-weight: bold; color: #0f172a;">Severidad</td>
                        <td style="border: 1px solid #e2e8f0; color: #334155;">${etiquetasSeveridad[dto.severity]}</td>
                      </tr>
                      <tr>
                        <td style="border: 1px solid #e2e8f0; font-weight: bold; color: #0f172a;">Teléfono de contacto</td>
                        <td style="border: 1px solid #e2e8f0; color: #334155;">${dto.reporterPhone}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f1f5f9; padding: 16px 24px;">
                    <p style="color: #64748b; font-size: 12px; margin: 0;">
                      Este correo fue generado automáticamente por el sistema AguaFix.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
