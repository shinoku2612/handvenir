import { ReportProblem } from '@mui/icons-material';
import React, { useState } from 'react';
import cx from '../../utils/class-name';
import { ValidationError } from '../../utils/errors';
import { checkType, validateInput } from '../../utils/helper';
import styles from './Form.module.css';
export default function Form({
    children,
    className,
    validate,
    defaultValidate = false,
    onSubmit,
    header,
    footer,
    ...props
}) {
    // [STATES]
    const [errorList, setErrorList] = useState([]);

    // [HANDLER FUNCTIONS]
    function handleValidateForm(e) {
        e.preventDefault();
        if (!validate) return true;
        setErrorList(
            Array.from(e.target).map((formControl) => {
                if (!formControl.required) return null;
                const validateResult = validateInput(formControl);
                if (checkType(validateResult) === 'error')
                    return validateResult.message;
                return validateResult;
            }),
        );
        if (errorList.length > 0) {
            if (errorList.every((error) => error === null)) return true;
        }
        return false;
    }

    function handleSubmitForm(e) {
        try {
            const isValidate = handleValidateForm(e);
            console.log(isValidate)
            if (!isValidate)
                throw new ValidationError('form-submit', 'Invalid form data');
            onSubmit();
        } catch (error) {
            console.log(error.message);
        }
    }

    // [RENDER]
    return (
        <form
            autoComplete="off"
            noValidate={!defaultValidate}
            className={cx(styles.form, className)}
            {...props}
            onSubmit={handleSubmitForm}
        >
            {header}
            {React.Children.map(children, (child, index) => (
                <div className={styles.inputGroups}>
                    {React.cloneElement(child, {
                        'data-invalid': !!errorList[index],
                        validate,
                        position: index,
                        setErrorList: setErrorList,
                    })}
                    {errorList[index] && (
                        <span className={cx(styles.errorMessage)}>
                            <ReportProblem
                                fontSize="small"
                                sx={{ marginRight: '0.25rem' }}
                                className={styles.errorIcon}
                            />
                            {errorList[index]}
                        </span>
                    )}
                </div>
            ))}
            {footer}
        </form>
    );
}
