import { useState } from 'react';

export default function useMultistep(steps = []) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    function next() {
        setCurrentStepIndex((prevIndex) => {
            if (prevIndex >= steps.length - 1) return prevIndex;
            return prevIndex + 1;
        });
    }
    function back() {
        setCurrentStepIndex((prevIndex) => {
            if (prevIndex <= 0) return prevIndex;
            return prevIndex - 1;
        });
    }
    function goTo(index) {
        if (index > currentStepIndex) return;
        setCurrentStepIndex(index);
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        next,
        back,
        goTo,
    };
}
