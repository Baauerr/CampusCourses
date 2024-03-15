// import { useEffect, useState } from 'react';
// import TextField from '@mui/material/TextField';

// interface PickDateProps {
//   onChange: (date: string | null) => void;
//   birthDate?: string;
// }

// export const PickDate = ({ birthDate }: PickDateProps) => {

//   useEffect(() => {
//     if (birthDate) {
//       const formattedDate = birthDate.split('T')[0];

//      // setValue(formattedDate);
//     }
//   }, [birthDate]);


//   console.log(value)

//   return (
//     <TextField
//       sx={{ marginBottom: 2 }}
//       variant="outlined"
//       fullWidth
//       id="birthDate"
//       label="Дата рождения"
//       type="date"
//       value = {value}
//       InputLabelProps={{ shrink: true }}
//     />
//   );
// };

// export default PickDate
