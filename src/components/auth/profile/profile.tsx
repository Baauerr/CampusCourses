import Item from '../item';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { IResponseAccountInfoData } from '../../../types/userTypes/accountTypes';
import { AuthService } from '../authService';
import { useFormik } from 'formik';
import { profileValidationSchema } from '../../../helpers/validations/profileValidatiob';

export const Profile = () => {

    useEffect(() => {

        const fetchData = async () => {
            try {
                const info = await AuthService.getUserInfo();
                info.birthDate = info.birthDate.split('T')[0];
                setProfileInfo(info);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const [profileInfo, setProfileInfo] = useState<IResponseAccountInfoData>({
        email: '',
        birthDate: '',
        fullName: '',
    });

    const formik = useFormik({
        initialValues: profileInfo,
        validationSchema: profileValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const userData = {
                    email: values.email,
                    birthDate: values.birthDate,
                    fullName: values.fullName,
                }

                await AuthService.editUserAccount(userData);
            }
            catch {
                console.log("bruh");
            } finally {
                setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        formik.setValues(profileInfo);
    }, [profileInfo]);

    return (
        <Container maxWidth="sm">
            <Item elevation={24}  sx = {{borderRadius: '15px'}}>
                <form onSubmit={formik.handleSubmit}>
                    <h1>Профиль</h1>
                    <TextField
                        sx={{ marginBottom: 2, pointerEvents: 'none' }}
                        fullWidth
                        id="email"
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={profileInfo.email}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        sx={{ marginBottom: 2 }}
                        fullWidth
                        id="fullName"
                        label="ФИО"
                        variant="outlined"
                        {...formik.getFieldProps("fullName")}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                    />
                    <TextField
                        sx={{ marginBottom: 2 }}
                        variant="outlined"
                        fullWidth
                        id="birthDate"
                        label="Дата рождения"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        {...formik.getFieldProps("birthDate")}
                        error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                        helperText={formik.touched.birthDate && formik.errors.birthDate}
                    />
                    <Button fullWidth size="large" variant="contained" type="submit">
                        Изменить
                    </Button>
                </form>
            </Item>
        </Container>
    );
};

export default Profile;