
import {Button} from '@mui/material';
import { CSVLink } from 'react-csv';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const data = [
    {
      no: "1",
      studentId: "18120546",
      fullName: "Nguyen Van A",
    },
  ];
  const headers = [
    {
      label: "No",
      key: "no",
    },
    {
      label: "StudentId",
      key: "studentId",
    },
    { label: "Fullname", key: "fullName" },
  ];
  
  const csvReport = {
    filename: "ReportStudent.csv",
    headers: headers,
    data: data,
  };
  
export default function ExportStudent(){
    return (
        <CSVLink className="btn-export" {...csvReport}>
        <Button
          variant="outlined"
          sx={{ m: 2 }}
          endIcon={<ArrowDropDownIcon />}
        >
         Tải mẫu file danh sách học sinh
        </Button>
      </CSVLink>
    );
}