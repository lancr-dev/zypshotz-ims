import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/*
    LOAD IMAGE AS BASE64
*/
const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.src = src;

    img.onload = () => resolve(img);

    img.onerror = reject;
  });
};

/*
    EXPORT INVENTORY LOGS TO PDF
*/
const exportLogsPdf = async (logs) => {
  const doc = new jsPDF();

  const generatedDate = new Date().toLocaleString();

  /*
      LOAD LOGO
  */
  const logo = await loadImage('/zypshotz.jpg');

  /*
      TABLE
  */
  autoTable(doc, {
    startY: 45,

    head: [['Date & Time', 'Item', 'Action', 'Qty', 'Before', 'After']],

    body: logs.map((log) => [
      new Date(log.createdAt).toLocaleString(),

      log.inventoryId?.itemName || 'Deleted Item',

      log.actionType === 'ADD' ? 'Stock In' : 'Stock Out',

      log.quantity,

      log.previousStock,

      log.newStock,
    ]),

    styles: {
      fontSize: 9,
    },

    headStyles: {
      fillColor: [220, 53, 69],
    },

    /*
        HEADER & FOOTER ON EVERY PAGE
    */
    didDrawPage: (data) => {
      // Logo
      doc.addImage(logo, 'PNG', 14, 8, 20, 20);
      // Header
      doc.setFontSize(16);

      doc.text('Zypshotz Inventory Management System', 105, 15, {
        align: 'center',
      });

      doc.setFontSize(12);

      doc.text('Inventory Logs Report', 105, 22, {
        align: 'center',
      });

      // Generated date
      doc.setFontSize(9);
      doc.text(`Generated: ${generatedDate}`, 105, 28, {
        align: 'center',
      });
    },
  });

  /*
      TOTAL PAGE COUNT
  */
  const totalPages = doc.internal.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(10);

    doc.text(`Page ${i} of ${totalPages}`, 105, pageHeight - 10, {
      align: 'center',
    });
  }

  /*
      SAVE PDF
  */
  const today = new Date().toISOString().split('T')[0];

  doc.save(`inventory-logs-${today}.pdf`);
};

export default exportLogsPdf;
