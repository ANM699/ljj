import createReport from "docx-templates";
import JSZipUtils from "jszip-utils";

export async function genReport(data) {
  //上传模版
  // const template = await readFileIntoArrayBuffer(file);
  // const report = await createReport({
  //   template,
  //   data: {
  //     name: "John",
  //     surname: "Appleseed",
  //   },
  //   cmdDelimiter: ["{", "}"],
  // });
  // saveDataToFile(
  //   report,
  //   "report.docx",
  //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  // );

  JSZipUtils.getBinaryContent(
    "./templates/F-05.docx",
    async (error, template) => {
      if (error) throw error;
      const report = await createReport({
        template,
        // data: {
        //   projectName: "测试项目",
        //   equipmentName: "设备",
        //   detectDate: "2021-4-15",
        //   reportNo: "292831930",
        //   c: {
        //     position: "北",
        //     section: [23, 21, 36],
        //   },
        // },
        data,
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
}

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
