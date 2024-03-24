import { Typography, Box, Card, Divider, Button, Grid } from '@mui/material';
import { Dispatch, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Skeleton } from '@mui/material';

import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { style } from '../modalWindows/styles';
import { CourseService } from './CourseService';
import { ICreateNotificationData } from '../../types/coursesTypes/createNotificationType';
import { useParams } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IResponseCourseInfoData } from '../../types/coursesTypes/courseTypes';

function TabPanel(props: any) {

    const { children, value, index, htmlString, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
                </Box>
            )}
        </div>
    );
}

export interface CourseInfoTabsProps {
    courseInfo?: IResponseCourseInfoData;
    setUpdated: Dispatch<React.SetStateAction<boolean>>;
}

export const CourseInfoTabs = ({ courseInfo, setUpdated }: CourseInfoTabsProps) => {


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [value, setValue] = useState('one');

    if (!courseInfo) {
        return (
            <div>
                <Skeleton variant="text" width={200} height={30} animation="wave" />
                <Card variant="outlined">
                    <Skeleton variant="rectangular" width={500} height={200} animation="wave" />
                </Card>
            </div>
        );
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div style={{ border: '1px solid #E0E0E0', borderRadius: '4px' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="wrapped label tabs example"
            >
                <Tab
                    value="one"
                    label="Требования к курсу"
                    wrapped
                />
                <Tab value="two" label="Аннотация" />
                <Tab value="three" label="Уведомления" />
            </Tabs>
            <Divider orientation="horizontal" />
            <TabPanel value={value} htmlString={courseInfo?.requirements} index="one">
                <Typography>{courseInfo?.requirements}</Typography>
            </TabPanel>
            <TabPanel value={value} htmlString={courseInfo?.annotations} index="two">
                <Typography>{courseInfo?.annotations}</Typography>
            </TabPanel>
            <div
                role="tabpanel"
                hidden={value !== "three"}
                id={`wrapped-tabpanel-three`}
                aria-labelledby={"wrapped-tab-three"}
            >
                <Button variant="contained" color={"primary"} sx={{ marginLeft: '25px', marginTop: '25px' }} onClick={handleOpen}>
                    Создать уведомление
                </Button>
                {value === "three" && (
                    <Box sx={{ p: 3 }}>
                        {courseInfo?.notifications.map((notification, index) => (
                            <Box key={index}>
                                <Card variant="outlined" sx={{ backgroundColor: chooseColor(notification.isImportant), padding: "15px" }}>{notification.text}</Card>
                                {index < courseInfo.notifications.length - 1}
                            </Box>
                        ))}
                    </Box>
                )}
            </div>
            <CreateNotification open={open} handleClose={handleClose} setUpdated={setUpdated} />
        </div>
    )
}

const chooseColor = (isImportant: boolean) => {
    return isImportant ? '#F8D7DA' : 'white';
};

type CreateModalProps = {
    open: boolean;
    handleClose: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateNotification = ({ open, handleClose, setUpdated }: CreateModalProps) => {

    const [textValue, setTextValue] = useState<string>('');
    const [isChecked, setIsChecked] = useState(false);



    const { id } = useParams();

    const handleClick = async () => {
        try {
            const text = textValue;
            const isImportant = isChecked;

            console.log(isImportant)

            await CourseService.createNotification({ text, isImportant }, id);

            setUpdated(true);
            handleClose();
        } catch (error) {
            console.log("bruh");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextValue(event.target.value);
    };

    const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    return (<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Card sx={style}>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <Typography id="modal-modal-title" fontWeight="bold" variant="h5" sx={{ marginBottom: "10px" }}>Создать уведомление</Typography>
            <TextField
                sx={{ marginBottom: 1.5 }}
                fullWidth
                id="name"
                name="name"
                label="Название"
                variant="outlined"
                onChange={handleChange}
            />
            <Grid direction="column" item container xs={12} md={12}>
                <FormControlLabel
                    control={<Checkbox checked={isChecked} onChange={handleCheckBoxChange} />}
                    label="Важное уведомление"
                    labelPlacement="end"
                    sx={{ marginBottom: "10px" }}
                />
                <Button variant="contained" onClick={handleClick}>
                    создать
                </Button>
            </Grid>
        </Card>
    </Modal>
    );
};