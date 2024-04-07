
import { InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { typesOfModal } from '../../../types/coursesTypes/courseTypes';
import { CourseInputProps, InputProps, InputsNameProps, SelectTeacherProps } from '../../../types/propsTypes/inputsProps';

const QuillField = ({ name, setFieldValue, value }: { name: string, setFieldValue: Function, value: string }) => {
    const handleChange = (content: string) => {
        setFieldValue(name, content);
    };

    return (
        <div>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={handleChange}
                modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ['bold', 'italic', 'underline', 'strike'],       
                      ['blockquote', 'code-block'],
            
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      [{ script: 'sub' }, { script: 'super' }],     
                      [{ indent: '-1' }, { indent: '+1' }],         
                      [{ direction: 'rtl' }],                        
                      [{ color: [] }, { background: [] }],          
                      [{ font: [] }],
                      [{ align: [] }],
                      ['clean'],                                         
                      ['link', 'image', 'video']                         
                    ],
                  }}
                  formats={[
                    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 
                    'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'video'
                  ]}
            />
        </div>
    );
}

export const CourseInputs = ({ formik, typeOfModal, serverError, users, role }: CourseInputProps) => {
    return (
        <div>
            {(role?.isAdmin || typeOfModal == typesOfModal.createCourse) && <InputName formik={formik} serverError={serverError} />}
            {(role?.isAdmin || typeOfModal == typesOfModal.createCourse) && <InputStart formik={formik} />}
            {(role?.isAdmin || typeOfModal == typesOfModal.createCourse) && <InputMaximumStudentsCount formik={formik} />}
            {(role?.isAdmin || typeOfModal == typesOfModal.createCourse) && <InputSemester formik={formik} />}
            {((role?.isTeacher || role?.isAdmin) || typeOfModal == typesOfModal.createCourse) && <InputRequirements formik={formik} />}
            {((role?.isTeacher || role?.isAdmin) || typeOfModal == typesOfModal.createCourse) && <InputAnnotation formik={formik} />}
            {(typeOfModal == typesOfModal.createCourse) && <InputMainTeacher formik={formik} users={users} typeOfModal={typeOfModal} />}
        </div>
    );
};

const InputName = ({ formik, serverError }: InputsNameProps) => {
    return (
        <div>
            <TextField
                fullWidth
                id="name"
                label="Название курса"
                variant="outlined"
                {...formik.getFieldProps("name")}
                error={formik.touched.name && (Boolean(formik.errors.name) || !!serverError)}
                helperText={(formik.touched.name && formik.errors.name) || serverError}
            />
        </div>
    );
};

const InputStart = ({ formik }: InputProps) => {
    return (
        <div>
            <TextField
                sx={{ marginTop: 2 }}
                fullWidth id="startYear"
                label="Год начала курса"
                type="number"
                variant="outlined"
                {...formik.getFieldProps("startYear")}
                error={formik.touched.startYear && Boolean(formik.errors.startYear)}
                helperText={formik.touched.startYear && formik.errors.startYear}
            />
        </div>
    );
};

const InputMaximumStudentsCount = ({ formik }: InputProps) => {
    return (
        <div>
            <TextField
                sx={{ marginTop: 2 }}
                variant="outlined"
                fullWidth
                id="maximumStudentsCount"
                type="number"
                label="Общее количество мест"
                {...formik.getFieldProps("maximumStudentsCount")}
                error={formik.touched.maximumStudentsCount && Boolean(formik.errors.maximumStudentsCount)}
                helperText={formik.touched.maximumStudentsCount && formik.errors.maximumStudentsCount}
            />
        </div>
    );
};

const InputSemester = ({ formik }: InputProps) => {
    return (
        <div>
            <InputLabel id="demo-row-radio-buttons-group-label" sx={{ marginTop: 1 }}>Семестр</InputLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                {...formik.getFieldProps("semester")}
            >
                <FormControlLabel value="Autumn" control={<Radio />} label="Осенний" />
                <FormControlLabel value="Spring" control={<Radio />} label="Весенний" />
            </RadioGroup>
        </div>
    );
};

const InputRequirements = ({ formik }: InputProps) => {

    return (
        <div>
            <InputLabel sx={{ marginTop: 1 }}>Требования (обязательно)</InputLabel>
            <QuillField
                name="requirements"
                setFieldValue={formik.setFieldValue}
                value={formik.values.requirements}
                
            />
        </div>
    );
};

const InputAnnotation = ({ formik }: InputProps) => {
    return (
        <div>
            <InputLabel sx={{ marginTop: 1 }}>Аннотации (обязательно)</InputLabel>
            <QuillField name="annotations" setFieldValue={formik.setFieldValue} value={formik.values.annotations} />
        </div>
    );
};

const InputMainTeacher = ({ formik, users, typeOfModal }: SelectTeacherProps) => {
    return (
        <div>
            <InputLabel htmlFor="mainTeacherId" sx={{ marginTop: 1 }}>Основной преподаватель курса (обязательно)</InputLabel>
            <Select
                options={users?.map((item) => ({ value: item.id, label: item.fullName }))}
                id="mainTeacherId"
                isDisabled={typeOfModal === typesOfModal.editCourse ? true : false}
                onChange={(selectedOption) => formik.setFieldValue("mainTeacherId", selectedOption?.value)}
            >
            </Select>
        </div>
    );
};


