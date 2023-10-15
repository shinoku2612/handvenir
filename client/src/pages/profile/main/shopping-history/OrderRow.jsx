import { Cancel, Visibility } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { checkType, formatDDMMYYYY } from "../../../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../../../../redux/slice/global.slice";
import { getUserId } from "../../../../redux/selectors";
import { cancelOrderService } from "../../../../services/order.service";

export default function OrderRow({ item, onUpdate }) {
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();
    async function handleCancelOrder() {
        console.log("Cancelling");
        if (!item.isCancelable) {
            return dispatch(
                setToast({
                    show: true,
                    type: "danger",
                    message:
                        "You cannot cancel this order. Please ensure that your order is pending processing within 1 day.",
                }),
            );
        }
        await cancelOrderService(userId, item._id, dispatch);
        if (checkType(onUpdate).includes("function")) onUpdate();
    }
    return (
        <tr>
            <td>{formatDDMMYYYY(item.createdAt)}</td>
            <td>{item.receiver}</td>
            <td>
                <span className={`status ${item.status}`}>{item.status}</span>
            </td>
            <td>
                <strong className="text-uppercase">{item.method}</strong>
            </td>
            <td>{item.address}</td>
            <td>
                <strong>${item.total}</strong>
            </td>
            <td>
                <NavLink
                    to={`/order/${item._id}`}
                    className="btn-mui btn-mui-primary"
                >
                    <Visibility
                        fontSize="small"
                        titleAccess="Click to view detail"
                    />
                </NavLink>
                <button
                    className="btn-mui btn-mui-danger"
                    disabled={!item.isCancelable}
                    onClick={handleCancelOrder}
                >
                    <Cancel
                        fontSize="small"
                        titleAccess="Click to cancel"
                    />
                </button>
            </td>
        </tr>
    );
}
