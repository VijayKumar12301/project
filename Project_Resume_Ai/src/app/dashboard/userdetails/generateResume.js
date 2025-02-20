import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
const generateResume = (values) => {
  const doc = new jsPDF();
  // Set Font
  doc.setFont("Helvetica");
  doc.setFontSize(18);
  doc.text("Resume", 90, 20);
  // Personal Details Section
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Name: ${values?.firstName || 'N/A'} ${values?.lastName || 'N/A'}`, 20, 40);
  doc.text(`Email: ${values?.email || 'N/A'}`, 20, 50);
  let currentY = 60;
  doc.autoTable({
    startY: currentY,
    head: [['Personal Details', '']],
    body: [
      ['Mobile Number:', values?.mobileNumber || 'N/A'],
      ['Date of Birth:', values?.dateOfBirth || 'N/A'],
      ['Gender:', values?.gender || 'N/A'],
      ['Address:', values?.presentAddress || 'N/A']
    ],
    theme: 'striped',
    styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 },
    margin: { left: 20, right: 20 },
    pageBreak: 'auto'
  });
  currentY = doc.autoTable.previous.finalY + 10;
  doc.setDrawColor(0, 51, 102);
  doc.line(20, currentY, 190, currentY);
  // Education Section
  doc.setFontSize(14);
  doc.setFont("Helvetica", "bold");
  doc.text("Education Details", 20, currentY + 10);
  doc.autoTable({
    startY: currentY + 20,
    head: [['Details', '']],
    body: [
      ['Field of Study:', values?.branch || 'N/A'],
      ['College Name:', values?.college || 'N/A'],
      ['Percentage:', values?.percentage ? `${values.percentage}%` : 'N/A'],
      ['Passing Year:', values?.passingYear || 'N/A']
    ],
    theme: 'striped',
    styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 },
    margin: { left: 20, right: 20 },
    pageBreak: 'auto'
  });
  // Skills Section
  currentY = doc.autoTable.previous.finalY + 10;
  doc.setFontSize(14);
  doc.text("Skills", 20, currentY + 10);
  doc.autoTable({
    startY: currentY + 20,
    head: [['Skills']],
    body: [[values?.skills || 'N/A']],
    theme: 'striped',
    styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 },
    margin: { left: 20, right: 20 },
    pageBreak: 'auto'
  });
  // Certifications
  currentY = doc.autoTable.previous.finalY + 10;
  doc.setFontSize(14);
  doc.text("Certifications", 20, currentY + 10);
  doc.autoTable({
    startY: currentY + 20,
    head: [['Certification Type', 'Details']],
    body: [
      ['Technical Certifications:', values?.technicalCertifications || 'N/A'],
      ['Internship Certifications:', values?.internshipCertifications || 'N/A']
    ],
    theme: 'striped',
    styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 },
    margin: { left: 20, right: 20 },
    pageBreak: 'auto'
  });
  // Experience Section
  if (values?.yearsOfExperience && values.yearsOfExperience > 0) {
    currentY = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(14);
    doc.text("Experience", 20, currentY + 10);
    doc.autoTable({
      startY: currentY + 20,
      head: [['Details', '']],
      body: [
        ['Years of Experience:', values?.yearsOfExperience || 'N/A'],
        ['Experience Details:', values?.experienceDetails || 'N/A']
      ],
      theme: 'striped',
      styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 },
      margin: { left: 20, right: 20 },
      pageBreak: 'auto'
    });
  }
  // Additional Details
  currentY = doc.autoTable.previous.finalY + 10;
  doc.setFontSize(14);
  doc.text("Additional Details", 20, currentY + 10);
  doc.autoTable({
    startY: currentY + 20,
    head: [['Details', '']],
    body: [
      ['LinkedIn Profile:', values?.linkedinProfile || 'N/A'],
      ['Project:', values?.project || 'N/A'],
      ['Hobbies:', values?.hobbies || 'N/A']
    ],
    theme: 'striped',
    styles: { fontSize: 12, font: 'Helvetica', cellPadding: 5 },
    margin: { left: 20, right: 20 },
    pageBreak: 'auto'
  });
  // Save the document
  doc.save('resume.pdf');
  console.log("Resume PDF generated successfully!");
};
export default generateResume;