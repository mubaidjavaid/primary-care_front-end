export async function exportTriagePDF(containerId, fileName, payload = {}) {
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import("jspdf"),
    import("html2canvas"),
  ]);

  const element = containerId ? document.getElementById(containerId) : null;
  const doc = new jsPDF("p", "mm", "a4");

  doc.setFontSize(14);
  doc.text("TRIAGE AI PAKISTAN", 14, 16);
  doc.setFontSize(11);
  doc.text("PRIMARY CARE TRIAGE REPORT", 14, 22);

  if (payload?.doctorName) doc.text(`Doctor: ${payload.doctorName}`, 14, 30);
  if (payload?.facility) doc.text(`Facility: ${payload.facility}`, 14, 36);

  if (element) {
    const canvas = await html2canvas(element, { scale: 2 });
    const imageData = canvas.toDataURL("image/png");
    const pdfWidth = 180;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    doc.addImage(imageData, "PNG", 14, 44, pdfWidth, pdfHeight);
  }

  doc.setFontSize(9);
  doc.text(
    "This is not a confirmed diagnosis. Consult a qualified physician.",
    14,
    286,
  );
  doc.save(fileName);
}
