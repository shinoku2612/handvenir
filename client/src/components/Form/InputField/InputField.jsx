import React, { useId } from 'react';
import { validateInput } from '../../../utils/helper';
import styles from './InputField.module.css';

export default function InputField({
    children,
    validate,
    position,
    setErrorList,
    ...props
}) {
    // [STATES]
    const inputId = useId();

    // [HANDLER FUNCTIONS]
    function handleBlurInput(e) {
        if (!validate) return;
        const validateRefult = validateInput(e.target);
        const errorMessage = validateRefult
            ? validateRefult.message
            : validateRefult;
        setErrorList((prev) => {
            prev.splice(position, 1, errorMessage);
            return [...prev];
        });
    }

    function handleFocusInput() {
        if (!validate) return;
        setErrorList((prev) => {
            prev.splice(position, 1, '');
            return [...prev];
        });
    }

    // [RENDER]
    return (
        <div className={styles.inputField}>
            <label htmlFor={inputId} className={styles.iconContainer}>
                {React.cloneElement(children, { className: styles.icon })}
            </label>
            <input
                id={inputId}
                className={styles.input}
                {...props}
                aria-required="true"
                onBlur={handleBlurInput}
                onFocus={handleFocusInput}
            />
        </div>
    );
}
