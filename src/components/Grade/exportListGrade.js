import { Button } from "@mui/material";
import { CSVLink } from "react-csv";

export default function ExportListGrade({ data, columns }) {
  const header = [
    {
      label: "MSSV",
      key: "studentId",
    },
    {
      label: "Họ tên",
      key: "fullName",
    },
  ];
  const dataList = [];
  columns.map((columns) => {
    header.push({ label: columns.name, key: columns.id.toString() });
  });
  data.map((data) => {
    const arrayPoint = data.arrayPoint;
    let listPointOfPerson = {};
    arrayPoint.map((arrayPoint) => {
      const assignmentId = arrayPoint.AssignmentId;
      const onePoint = { [assignmentId]: arrayPoint.point };
      listPointOfPerson = { ...listPointOfPerson, ...onePoint };
    });
    const studentIdAndName = { studentId: data.studentId, fullName: data.fullName };
    const dataPerson = { ...studentIdAndName, ...listPointOfPerson };
    dataList.push(dataPerson);
  });
 
  
  console.log("header11", header);
  console.log("dataList11", dataList);
  const csvReportGrade = {
    filename: "ReportGrade.csv",
    headers: header,
    data: dataList,
  };

  return (
    <CSVLink className="btn-export" {...csvReportGrade}>
      <Button variant="outlined" sx={{ m: 2 }}>
        Tải toàn bộ bảng điểm
      </Button>
    </CSVLink>
  );
}
