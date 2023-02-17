import React, { forwardRef, useImperativeHandle } from 'react';
import useMultistep from '../../hooks/useMultistep';
import cx from '../../utils/class-name';
import styles from './Multistep.module.css';

export default forwardRef(function Multistep(
    {
        children,
        headers,
        value,
        onFinish,
        onTurnBack,
        autoNext = false,
        ...props
    },
    ref,
) {
    // [STATES]
    const {
        step,
        currentStepIndex,
        isFirstStep,
        isLastStep,
        next,
        back,
        goTo,
    } = useMultistep(children);

    // [SIDE EFFECTS]
    // --Next on complete step--
    useImperativeHandle(ref, () => {
        if (autoNext)
            return {
                next,
            };
    });

    // [HANDLER FUNCTIONS]
    function handleGoToStep(stepIndex) {
        return function () {
            const backHeader = headers.filter((_, index) => index > stepIndex);
            backHeader.forEach((header) =>
                onTurnBack((prev) => ({ ...prev, [header]: '' })),
            );
            goTo(stepIndex);
        };
    }

    // [RENDER]
    return (
        <form onSubmit={onFinish} className={styles.multistepWrapper}>
            <div className={styles.multistepHeader}>
                {headers.map((header, index) => (
                    <div
                        key={header}
                        className={cx(styles.stepContainer, {
                            [styles.done]: index <= currentStepIndex,
                        })}
                    >
                        <div
                            className={styles.stepLabel}
                            onClick={handleGoToStep(index)}
                        >
                            {index + 1}
                        </div>
                        <p className={styles.stepName}>
                            {value[header] || headers[index]}
                        </p>
                    </div>
                ))}
            </div>
            <div className={styles.multistepBody}>{step}</div>
            <div className={styles.multistepFooter}>
                {!autoNext && !isFirstStep && (
                    <div className={styles.actionBtn} onClick={back}>
                        Back
                    </div>
                )}

                {!autoNext && !isLastStep && (
                    <div className={styles.actionBtn} onClick={next}>
                        Next
                    </div>
                )}
                {isLastStep && (
                    <button type="submit" className={styles.actionBtn}>
                        Finish
                    </button>
                )}
            </div>
        </form>
    );
});
