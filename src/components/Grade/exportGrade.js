
import {Button} from '@mui/material';
import { CSVLink } from "react-csv";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
  
  const csvReportGrade = {
    filename: "ReportGrade.csv",
    headers: headersGrade,
    data: dataGrade,
  };
  
export default function ExportStudent(){
    return (
        <CSVLink className="btn-export" {...csvReportGrade}>
        <Button
          variant="outlined"
          sx={{ m: 2 }}
          endIcon={<ArrowDropDownIcon />}
        >
          Download Default Grade File
        </Button>
      </CSVLink>
    );
}