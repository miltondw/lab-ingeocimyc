import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Injectable({
  providedIn: 'root'
})
export class SavePdfService {

  constructor() { } 
  async save(pdfData:any): Promise<void> {
    const idT = 'pdfEnsayo';
    const title = `${pdfData.title.split(',')[0].split(' ').join('-').toLocaleLowerCase()}.pdf`;
    const pdf = new jsPDF('p', 'mm', 'a4', true);
    let pageCount = 1;
    try {
      for (let i=0; i<pdfData.data.length; i++) {
      const id = `${idT}-${pdfData.data[i][0].header.probe}${pdfData.data[i][0].header.muestra}`;
            const elementToExport = document.getElementById(id) as HTMLElement;
            const canvas = await html2canvas(elementToExport);
            const image = new Image();
            const saveImagePromise = new Promise<void>((resolve, reject) => {
              image.onload = () => {
                pdf.addImage(image, 'PNG', 5, 12,200, 270);
                pdf.addPage();
                pageCount++;
                resolve();
              };
              image.onerror = reject;
              image.src = canvas.toDataURL('image/png');
            });

            await saveImagePromise;
      }
       pdf.deletePage(pageCount);
       pdf.save(title);
    } catch (error) {
      console.error('Error al guardar el archivo PDF:', error);
    }
  }
}
