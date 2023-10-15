import { forwardRef, useImperativeHandle, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { postReviewService } from "../../services/review.service";
import styles from "./Review.module.css";
import { Rating } from "@mui/material";
import cx from "../../utils/class-name";

function Review({ userId }, ref) {
    // [STATES]
    const [show, setShow] = useState(false);
    const [productId, setProductId] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const dispatch = useDispatch();
    // [HANDLER FUNCTIONS]
    function handleCloseReview() {
        setShow(false);
        setComment("");
        setRating(5);
    }
    async function handlePostReview() {
        try {
            const res = await postReviewService(
                userId,
                productId,
                {
                    comment,
                    rating,
                },
                dispatch,
            );
            console.log(res.data);
            handleCloseReview();
        } catch (error) {
            console.log(error.message);
        }
    }
    // --Export review popup functions to forwarded ref--
    useImperativeHandle(ref, () => ({
        show(productId) {
            setShow(true);
            setProductId(productId);
        },
    }));
    return ReactDOM.createPortal(
        <div className={cx(styles.reviewPopup, { [styles.hide]: !show })}>
            <div className={styles.popupContainer}>
                <h3 className={styles.header}>Your opinion matters to us!</h3>
                <div className={styles.body}>
                    <span className={styles.question}>
                        How did you feel about this product?
                    </span>
                    <Rating
                        value={rating}
                        precision={1}
                        onChange={(e) => setRating(+e.target.value)}
                        className={styles.rating}
                    />
                    <textarea
                        value={comment}
                        className={styles.reivewBox}
                        placeholder="Leave a message that you want"
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <div className={styles.footer}>
                    <button
                        className="btn btn-primary"
                        onClick={handlePostReview}
                    >
                        Submit
                    </button>
                    <button
                        className="btn btn-primary btn-outlined m-inline-1"
                        onClick={handleCloseReview}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}

export default forwardRef(Review);
