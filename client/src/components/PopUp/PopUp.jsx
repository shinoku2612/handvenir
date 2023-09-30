import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./PopUp.module.css";
import { checkType } from "../../utils/helper";

export default function PopUp({ title, message, handler, children }) {
    const [isShown, setIsShown] = useState(true);
    async function handleConfirm() {
        if (
            checkType(handler) === "function" ||
            checkType(handler) === "asyncfunction"
        ) {
            await handler();
            setIsShown(false);
        }
    }
    return isShown
        ? ReactDOM.createPortal(
              <div
                  role="form"
                  className={styles.popUp}
              >
                  <div className={styles.popUpContainer}>
                      <div className={styles.popUpHeader}>
                          <p className={styles.popUpHeaderTitle}>{title}</p>
                      </div>
                      <div className={styles.popUpBody}>
                          <div className={styles.iconContainer}>{children}</div>
                          <p className={styles.message}>{message}</p>
                      </div>
                      <div className="btn-groups">
                          <button
                              className="btn btn-primary m-inline-1"
                              onClick={handleConfirm}
                          >
                              Confirm
                          </button>
                          <button
                              className="btn btn-primary btn-outlined m-inline-1"
                              onClick={() => {
                                  setIsShown(false);
                              }}
                          >
                              Cancel
                          </button>
                      </div>
                  </div>
              </div>,
              document.body,
          )
        : null;
}
