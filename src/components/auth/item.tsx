import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.primary,
    paddingRight: '30px',
    paddingLeft: '30px',
    paddingBottom: '30px',
    paddingTop: '5px',
}));

export default Item;
