import {Button} from '@mui/material';
 
export default function ImportStudent({importStudetFile}){

  const handleChangeFile = (event) => {
    if(event.target.files[0]){
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("studentFile", file);
      
      importStudetFile(formData);
    }
  }
  return (
    <Button
      variant="outlined"
      component="label"
      sx={{ m: 2 }}
    >
      Nhập file danh sách học sinh
      <input
        type="file"
        hidden
        id="studentFile"
        name="studentFile"
        accept=".csv"
        onClick={(event) => event.target.value = null }
        multiple={false}
        onChange={(event) => handleChangeFile(event)}
      />
    </Button>
  );
}