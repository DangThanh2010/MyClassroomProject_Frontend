
import {Button} from '@mui/material';
import { CSVLink } from "react-csv";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const dataGrade = [
    {
      studentId: "18120546",
      point: 100,
    },
  ];
  const headersGrade = [
    {
      label: "Student ID",
      key: "studentId",
    },
    { label: "Grade", key: "point" },
    { label: "Assignment: This is the assignment", key: "assignment" },
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