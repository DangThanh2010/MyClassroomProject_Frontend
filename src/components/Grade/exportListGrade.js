import { Button } from "@mui/material";
import { CSVLink } from "react-csv";

export default function ExportListGrade({ data, columns }) {
  console.log("data11", data);
  console.log("column11", columns);
  const header = [
    {
      label: "MSSV",
      key: "studentId",
    },
  ];
  const dataListGrade = [];
    const dataList = [];
  
  columns.map((columns) => {
    header.push({ label: columns.name, key: columns.id.toString() });
  });
  console.log("header11", header);
  data.map((data) => {
    const m = data.arrayPoint;
    const dulieu = [];
    let allobject={};
    // const listPoint = { ...data.arrayPoint };
    m.map((m) => {
        
      const h = m.AssignmentId;
    //   dulieu.push({[h]: m.point });
    const q={[h]:m.point};
    allobject={...allobject, ...q}
    });
    const t = { studentId: data.studentId };
    console.log('h', dulieu);
    const dataList123 = { ...t, ...allobject };
    dataList.push(dataList123);
   
    // console.log("listPoint11", listPoint);
    // const dataList = { ...t, ...listPoint };
    // dataListGrade.push(dataList);
    // dataListGrade.push({studentId:data.studentId, listPoint});
    // listPoint.map((listPoint) => {
    //     dataListGrade.push({studentId:data.studentId, listPoint });
    // });
    // header.push({ label: columns.name, key: columns.id });
  });
//   console.log("allobject", allobject);
  
  //   console.log("dataList", dataList);
  const dataGrade = [
    {
      no: "1",
      studentId: "18120546",
      point: 100,
    },
  ];
  const headersGrade = [
    {
      label: "No",
      key: "no",
    },
    {
      label: "StudentId",
      key: "studentId",
    },
    { label: "Point", key: "point" },
  ];
  console.log('dataGrade', dataGrade)
  console.log('headersGrade', headersGrade)
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
