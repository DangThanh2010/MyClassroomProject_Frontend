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
  let sumPointDefault=0;
  columns.map((columns) => {
    header.push({ label: columns.name, key: columns.id.toString() });
    sumPointDefault+=columns.point;
  });
  header.push({
    label: "Tổng điểm",
    key: "sum",
  });
  let sumPointAllPerson = [];
  
  for (let j = 0; j < data.length; j++) {
    let sumPointOnePerson = 0;
    for (let s = 0; s < data[j].arrayPoint.length; s++) {
    
      columns.map((columns) => {
        if (data[j].arrayPoint[s].AssignmentId === columns.id) {
          if(data[j].arrayPoint[s].point !== null){
            sumPointOnePerson += data[j].arrayPoint[s].point*columns.point / 100;
          }
        }
      });

    }
    sumPointAllPerson.push({sum: Math.round(sumPointOnePerson * 100) / 100 + "/" + sumPointDefault});
  }

  data.map((data, index) => {
    const arrayPoint = data.arrayPoint;
    let listPointOfPerson = {};
    arrayPoint.map((arrayPoint) => {
      const assignmentId = arrayPoint.AssignmentId;
      const onePoint = { [assignmentId]: arrayPoint.point !== null ? arrayPoint.point+"/100" : ""};
      listPointOfPerson = { ...listPointOfPerson, ...onePoint };
    });
    const studentIdAndName = {
      studentId: data.studentId,
      fullName: data.fullName,
    };
    const dataPerson = { ...studentIdAndName, ...listPointOfPerson, ...sumPointAllPerson[index] };
    dataList.push(dataPerson);
  });

  const csvReportGrade = {
    filename: "ReportGradeBoard.csv",
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
