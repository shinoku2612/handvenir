import {
    useMemo,
    Children,
    useLayoutEffect,
    useState,
    useRef,
    useEffect,
    useCallback,
} from 'react';
import cx from '../../utils/class-name';
import styles from './Carousel.module.css';

import React from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export default function Carousel({
    children,
    duration = 400,
    autoplay = true,
    delay = 2000,
}) {
    // [STATES]
    const containerRef = useRef();
    const intervalRef = useRef(null);
    const [current, setCurrent] = useState(1);
    const [translateX, setTranslateX] = useState(0);
    const [disabled, setDisabled] = useState(false);

    // --Memo states--
    const slides = useMemo(() => {
        if (!children) return;
        if (children.length > 1) {
            let items = Children.map(children, (child, index) => (
                <li key={index} className={styles.slide}>
                    {child}
                </li>
            ));

            return [
                <li key={children.length + 1} className={styles.slide}>
                    {children[children.length - 1]}
                </li>,
                ...items,
                <li key={children.length + 2} className={styles.slide}>
                    {children[0]}
                </li>,
            ];
        }
        return <li className={styles.slide}>{children}</li>;
    }, [children]);

    // --Callback states--
    const switchSlide = useCallback(
        (mode) => {
            if (!children || !children.length) return;
            containerRef.current.style.transitionDuration = `${duration}ms`;
            if (mode === 'prev') {
                if (current <= 1) {
                    setTranslateX(0);
                    setCurrent(children.length);
                } else {
                    setTranslateX(
                        containerRef.current.clientWidth * (current - 1),
                    );
                    setCurrent((prev) => --prev);
                }
            } else if (mode === 'next') {
                if (current >= children.length) {
                    setTranslateX(
                        containerRef.current.clientWidth *
                            (children.length + 1),
                    );
                    setCurrent(1);
                } else {
                    setTranslateX(
                        containerRef.current.clientWidth * (current + 1),
                    );
                    setCurrent((prev) => ++prev);
                }
            }
        },
        [current, children, duration],
    );

    // [SIDE EFFECTS]
    // --Position first element-- + --Trigger once--
    useLayoutEffect(() => {
        if (children.length > 1)
            setTranslateX(containerRef.current.clientWidth);
    }, [children]);

    // --Infinite scroll smooth effect--
    useEffect(() => {
        const sliderContainer = containerRef.current;
        const transitionStart = () => {
            setDisabled(true);
        };
        const transitionEnd = () => {
            if (current <= 1) {
                containerRef.current.style.transitionDuration = '0ms';
                setTranslateX(containerRef.current.clientWidth * current);
            }

            if (current >= children.length) {
                containerRef.current.style.transitionDuration = '0ms';
                setTranslateX(
                    containerRef.current.clientWidth * children.length,
                );
            }
            setDisabled(false);
        };

        sliderContainer.addEventListener('transitionend', transitionEnd);
        sliderContainer.addEventListener('transitionstart', transitionStart);

        return () => {
            sliderContainer.removeEventListener('transitionend', transitionEnd);
            sliderContainer.removeEventListener(
                'transitionstart',
                transitionStart,
            );
        };
    }, [current, children]);

    //  --Autoplay--
    useEffect(() => {
        if (!autoplay) return;
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            switchSlide('next');
        }, delay);
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [switchSlide, autoplay, delay]);

    // [RENDER]
    return (
        <section className={styles.carousel}>
            <ul
                ref={containerRef}
                className={styles.slideContainer}
                style={{
                    transform: `translate3d(${-translateX}px, 0, 0)`,
                }}
            >
                {slides}
            </ul>
            <div
                onClick={() => switchSlide('prev')}
                className={cx(styles.btnLeft, { [styles.disabled]: disabled })}
            >
                <ChevronLeft />
            </div>
            <div
                onClick={() => switchSlide('next')}
                className={cx(styles.btnRight, { [styles.disabled]: disabled })}
            >
                <ChevronRight />
            </div>
        </section>
    );
}
