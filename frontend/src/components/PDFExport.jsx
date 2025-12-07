import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Correct import

export const exportSalarySlipsPDF = (salarySlips) => {
  const doc = new jsPDF();
  doc.text("Salary Slips", 14, 16);

  const tableData = salarySlips.map((slip) => [
    slip.employee.name,
    slip.month,
    slip.salary,
  ]);

  autoTable(doc, { 
    head: [["Employee", "Month", "Salary"]],
    body: tableData,
    startY: 20,
  });

  doc.save("salary-slips.pdf");
};
