import Item from '../item';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import React from 'react';
import { IResponseAccountInfoData } from '../../../types/userTypes/accountTypes';
import { AuthService } from '../authService';
import { PickDate } from '../register/registration';

export const Profile = () => {

    const dispatch = useAppDispatch();

    const [data, setData] = useState<IResponseAccountInfoData>({
        email: '',
        birthDate: '',
        fullName: '',
    })

    const [profileInfo, setProfileInfo] = useState<IResponseAccountInfoData>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        });
    };

    const handleDateChange = (date: string | null) => {
        if (date) {
            setData({
                ...data,
                birthDate: date,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try {
            const userData = {
                email: data.email,
                birthDate: data.birthDate,
                fullName: data.fullName,
            }


        }
        catch {
            console.log("bruh");
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = await AuthService.getUserInfo();
                setProfileInfo(info);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    return (
        <Container maxWidth="sm" sx={{ paddingTop: "80px" }}>
            <Item elevation={24}>
                <form onSubmit={handleSubmit}>
                    <h1>Профиль</h1>
                    <TextField
                        sx={{ marginBottom: 2 }}
                        fullWidth id="email"
                        label="Email"
                        variant="outlined"
                        onChange={handleChange}
                        value={profileInfo ? profileInfo.email : ''}
                    />
                    <TextField
                        sx={{ marginBottom: 2 }}
                        fullWidth id="fullName"
                        label="ФИО"
                        variant="outlined"
                        onChange={handleChange}
                        value={profileInfo ? profileInfo.fullName : ''}
                    />
                    <PickDate onChange={handleDateChange} />
                    <Button fullWidth size="large" variant="contained" type="submit">
                        Изменить
                    </Button>
                </form>
            </Item>
        </Container>
    );
};

export default Profile;

// const PickDate = ({ onChange }: { onChange: (date: string | null) => void }) => {
//     const [value, setValue] = useState<string | null>(null);

//     const handleDateChange = (newValue: string | null) => {
//         setValue(newValue);
//         onChange(newValue);
//     };

//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DateField
//                 sx={{ marginBottom: 2 }}
//                 fullWidth
//                 id="birthDate"
//                 label="День рождения"
//                 value={value}
//                 format="DD.MM.YYYY"
//                 onChange={handleDateChange}
//             />
//         </LocalizationProvider>
//     );
// };


