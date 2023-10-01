import React, { useEffect, useState } from "react";
import styles from "./Select.module.css";
import { Check, ExpandMore } from "@mui/icons-material";
import cx from "../../utils/class-name";

export default function Select({
    editable = true,
    label,
    defaultValue,
    placeholder = "Choose",
    renderData = [],
    onSelect,
    classNames,
    ...props
}) {
    // [STATES]
    const [expand, setExpand] = useState(false);

    // [SIDE EFFECTS]
    // --Turn ON/OFF edit mode--
    useEffect(() => {
        if (editable) setExpand(false);
    }, [editable]);

    // [HANDLER FUNCTIONS]
    function handleToggleExpand() {
        if (editable) setExpand((prev) => !prev);
    }
    function handleSelectValue(value) {
        return function () {
            onSelect(value);
            setExpand(false);
        };
    }

    // [RENDER]
    return (
        <div
            className={cx(styles.select, classNames)}
            {...props}
        >
            <span className={styles.label}>{label}</span>
            <div
                className={styles.value}
                onClick={handleToggleExpand}
            >
                <p>{defaultValue?.toString() || placeholder}</p>
                {editable ? (
                    <ExpandMore
                        className={cx({
                            [styles.rotateUp]: expand && editable,
                        })}
                    />
                ) : null}
            </div>
            <div
                className={cx(styles.optionContainer, {
                    [styles.expand]: expand && editable,
                })}
                aria-hidden
            >
                {renderData.map((option) => (
                    <div
                        key={option}
                        className={cx(styles.option, {
                            [styles.selected]: defaultValue === option,
                        })}
                        onClick={handleSelectValue(option)}
                    >
                        <span>{option}</span>
                        {defaultValue === option && <Check />}
                    </div>
                ))}
            </div>
        </div>
    );
}
