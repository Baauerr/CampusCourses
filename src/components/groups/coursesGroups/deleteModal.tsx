
import { Typography, Card, Button } from '@mui/material';
import { GroupsService } from '../groupsService';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { style } from '../../modalWindows/styles';

type EditModalProps = {
    id: string
    groupName: string
    openDelete: boolean;
    handleCloseDelete: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditModal = ({ groupName, openDelete, handleCloseDelete, setUpdated, id }: EditModalProps) => {


    const handleClick = async () => {
        try {
            await GroupsService.deleteGroup(id);
            setUpdated(true);
            handleCloseDelete();
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
            <Typography id="modal-modal-title" fontWeight="bold" variant="h5" sx={{ marginBottom: "10px" }}>Удалить группу: "{groupName}"? </Typography>
            <Button variant="contained" color={"error"} onClick={handleClick}>
                Удалить
            </Button>
        </Card>
    </Modal>
    );
};

export default EditModal