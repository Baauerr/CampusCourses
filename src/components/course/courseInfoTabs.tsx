import { Typography, Box, Card, Divider, Button } from '@mui/material';
import { Dispatch, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Skeleton } from '@mui/material';
import { IResponseCourseInfoData } from '../../types/coursesTypes/courseTypes';
import { CreateNotification } from './createNotification';

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
