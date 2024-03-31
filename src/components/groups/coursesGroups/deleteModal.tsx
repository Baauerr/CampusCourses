import { Typography, Card, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { style } from '../../modalWindows/styles';
import { useNavigate } from 'react-router-dom';

export interface ITypeOfDeleting{

}

type EditModalProps = {
    name: string
    openDelete: boolean;
    handleCloseDelete: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    deleteRequestFunction: () => Promise<void>;
    redirectPath?: string;
};

export const DeleteModal = ({ name, openDelete, handleCloseDelete, setUpdated, deleteRequestFunction, redirectPath }: EditModalProps) => {

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await deleteRequestFunction();
            setUpdated(true);
            handleCloseDelete();
            if (redirectPath) {
                navigate(redirectPath);
            }
        } catch (error) {
            console.log("bruh");
        }
    };

    return (<Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Card sx={style}>
            <IconButton
                aria-label="close"
                onClick={handleCloseDelete}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <Typography id="modal-modal-title" fontWeight="bold" variant="h5" sx={{ marginBottom: "10px" }}>Удалить: "{name}"? </Typography>
            <Button variant="contained" color={"error"} onClick={handleClick}>
                Удалить
            </Button>
        </Card>
    </Modal>
    );
};

export default DeleteModal