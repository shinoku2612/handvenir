import { checkType } from './helper';

export default function classNames() {
    const classSet = new Set();
    const classList = Array.from(arguments);
    classList.forEach((className) => {
        if (checkType(className) === 'array') {
            classSet.add(classNames(...className));
        } else if (checkType(className) === 'string') {
            classSet.add(className);
        } else if (checkType(className) === 'object') {
            Object.keys(className).forEach((keyClass) => {
                const conditionalClassName = className[keyClass];
                if (checkType(conditionalClassName) !== 'boolean') return;
                if (conditionalClassName) {
                    classSet.add(keyClass);
                } else {
                    classSet.delete(keyClass);
                }
            });
        }
    });
    return Array.from(classSet).join(' ');
}
