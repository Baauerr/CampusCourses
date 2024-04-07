import { Typography, Grid } from '@mui/material';

export const HelloComponent = () => {
    return (
            <Grid container alignItems="center" justifyContent="center">
                <Typography variant='h4' sx={{ fontWeight: "bold" }}>Добро пожаловать в систему кампусных курсов!</Typography>
            </Grid>
    )
}