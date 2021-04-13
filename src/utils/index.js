import createReport from "docx-templates";
import JSZipUtils from "jszip-utils";

export const genReport = () => {
  JSZipUtils.getBinaryContent(
    "./templates/myTemplate.docx",
    async (error, template) => {
      if (error) throw error;
      const report = createReport({
        template,
        data: {
          name: "John",
          surname: "Appleseed",
        },
        cmdDelimiter: ["{", "}"],
      });
      // Save report
      saveDataToFile(
        report,
        "report.docx",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
    }
  );
};

// ==============================================
// Helpers
// ==============================================
const readFileIntoArrayBuffer = async (fd) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsArrayBuffer(fd);
  });

const saveDataToFile = (data, fileName, mimeType) => {
  const blob = new Blob([data], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  downloadURL(url, fileName, mimeType);
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 1000);
};

const downloadURL = (data, fileName) => {
  const a = document.createElement("a");
  a.href = data;
  a.download = fileName;
  document.body.appendChild(a);
  a.style = "display: none";
  a.click();
  a.remove();
};
