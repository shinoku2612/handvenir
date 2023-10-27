import React, {
    useRef,
    useState,
    useImperativeHandle,
    forwardRef,
} from "react";
import styles from "./Cropper.module.css";
import cx from "../../utils/class-name";

function Cropper({ image }, ref) {
    // [STATES]
    const [scale, setScale] = useState(1);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [canvasContext, setCanvasContext] = useState();
    const [originImage, setOriginImage] = useState();
    const containerRef = useRef();
    const canvasRef = useRef();

    // Export ref
    useImperativeHandle(ref, () => ({
        canvas: canvasRef.current,
        context: canvasContext,
        source: originImage,
        cropImage(canvas, context, src) {
            return new Promise((resolve, reject) => {
                const naturalWidth = src.naturalWidth;
                const naturalHeight = src.naturalHeight;

                const widthScale = naturalWidth / src.width;
                const heightScale = naturalHeight / src.height;

                const scaleOffsetX = (naturalWidth * (scale - 1)) / (2 * scale);
                const scaleOffsetY =
                    (naturalHeight * (scale - 1)) / (2 * scale);

                const translateOffsetX = (translateX * widthScale) / scale;
                const translateOffsetY = (translateY * heightScale) / scale;
                context.drawImage(
                    src,
                    scaleOffsetX - translateOffsetX,
                    scaleOffsetY - translateOffsetY,
                    naturalWidth / scale,
                    naturalHeight / scale,
                    0,
                    0,
                    canvas.width,
                    canvas.height,
                );
                const maskSize = canvas.height;
                const croppedImageData = context.getImageData(
                    (canvas.width - maskSize) / 2,
                    (canvas.height - maskSize) / 2,
                    maskSize,
                    maskSize,
                );
                context.clearRect(0, 0, canvas.width, canvas.height);

                const cropCanvas = document.createElement("canvas");
                cropCanvas.width = maskSize;
                cropCanvas.height = maskSize;
                const cropContext = cropCanvas.getContext("2d");
                cropContext.putImageData(croppedImageData, 0, 0);
                cropCanvas.toBlob(
                    (blob) => {
                        const croppedImageFile = new File(
                            [blob],
                            "croped-image",
                            {
                                type: blob.type,
                            },
                        );
                        resolve(croppedImageFile);
                    },
                    "image/png",
                    1,
                );
            });
        },
    }));

    // [HANDLER FUNCTIONS]
    function createCroppingMask(e) {
        const originImage = e.target;
        const canvas = canvasRef.current;
        canvas.width = originImage.width;
        canvas.height = originImage.height;
        const context = canvas.getContext("2d");
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.arc(
            canvas.width / 2,
            canvas.height / 2,
            canvas.height / 2,
            0,
            Math.PI * 2,
        );
        context.clip();
        context.clearRect(0, 0, canvas.width, canvas.height);
        setCanvasContext(context);
        setOriginImage(originImage);
    }

    function handleMoveImage(event) {
        const cropperContainer = containerRef.current;
        const marginX =
            (originImage.width * scale - canvasRef.current.height) / 2;
        let currentTranslateX = translateX;
        const initPageX = event.pageX;

        const marginY =
            (originImage.height * scale - canvasRef.current.height) / 2;
        let currentTranslateY = translateY;
        const initPageY = event.pageY;

        cropperContainer.onmousemove = function (event) {
            const shiftX = event.pageX - initPageX;
            currentTranslateX = translateX + shiftX;
            if (currentTranslateX > marginX) currentTranslateX = marginX;
            if (currentTranslateX * -1 > marginX) currentTranslateX = -marginX;

            const shiftY = event.pageY - initPageY;
            currentTranslateY = translateY + shiftY;
            if (currentTranslateY > marginY) currentTranslateY = marginY;
            if (currentTranslateY * -1 > marginY) currentTranslateY = -marginY;

            originImage.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px) scale(${scale})`;
        };
        cropperContainer.onmouseup = function () {
            setTranslateX(currentTranslateX);
            setTranslateY(currentTranslateY);
            cropperContainer.onmousemove = null;
            cropperContainer.onmouseup = null;
        };
    }

    // [RENDER]
    return (
        <div className={styles.cropperContainer}>
            <div
                className={cx(styles.cropper)}
                onMouseDown={handleMoveImage}
                ref={containerRef}
            >
                <canvas
                    className={styles.cropperCanvas}
                    ref={canvasRef}
                ></canvas>
                <img
                    src={image}
                    alt=""
                    onLoad={createCroppingMask}
                    className={styles.image}
                    style={{
                        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
                    }}
                />
            </div>
            <input
                type="range"
                className={styles.scaleRange}
                defaultValue={1}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => {
                    const marginX =
                        (originImage.width * e.target.value -
                            canvasRef.current.height) /
                        2;
                    if (translateX > marginX) setTranslateX(marginX);
                    if (translateX * -1 > marginX) setTranslateX(-1 * marginX);
                    const marginY =
                        (originImage.height * e.target.value -
                            canvasRef.current.height) /
                        2;
                    if (translateY > marginY) setTranslateY(marginY);
                    if (translateY * -1 > marginY) setTranslateY(-1 * marginY);
                    setScale(e.target.value);
                }}
            />
        </div>
    );
}

export default forwardRef(Cropper);
