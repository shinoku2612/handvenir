import { useQuery, useQueryClient } from "react-query";
import styles from "./WishList.module.css";
import { getProductByIdService } from "../../services/product.service";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../redux/selectors";
import { removeFromWishListService } from "../../services/wish-list.service";
import { Skeleton } from "@mui/material";
import { NavLink } from "react-router-dom";
import { DeleteForever } from "@mui/icons-material";
import cx from "../../utils/class-name";

export default function WishListRow({ item }) {
    // [QUERIES]
    const { isLoading, data: product } = useQuery(
        ["single-product", item.product],
        () => getProductByIdService(item.product),
    );
    const queryClient = useQueryClient();

    // [STATES]
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();

    // [HANDLER FUNCTIONS]
    async function handleRemoveProduct() {
        try {
            await removeFromWishListService(userId, dispatch, item.product);
            queryClient.invalidateQueries("wish-list");
        } catch (error) {
            console.log(error.message);
        }
    }

    // [RENDER]
    if (isLoading)
        return (
            <tr>
                <td>
                    <div className={styles.productInfo}>
                        <Skeleton
                            width={100}
                            height={80}
                        />
                        <Skeleton
                            variant="text"
                            width={200}
                            sx={{
                                fontSize: "1rem",
                                marginLeft: "1rem",
                            }}
                        />
                    </div>
                </td>
                <td>
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem" }}
                    />
                </td>
                <td>
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem" }}
                    />
                </td>
                <td></td>
            </tr>
        );
    return (
        <tr>
            <td>
                <NavLink
                    to={`/product/${product.slug}`}
                    className={styles.productInfo}
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className={styles.image}
                    />
                    <span className={styles.info}>{product.title}</span>
                </NavLink>
            </td>
            <td>
                <span className={styles.description}>
                    {product.description}
                </span>
            </td>
            <td>
                <span className={styles.info}>${product.price}</span>
            </td>
            <td>
                <DeleteForever
                    className={cx(styles.action, styles.delete)}
                    sx={{
                        transition: "transform 200ms ease-in-out;",
                    }}
                    onClick={handleRemoveProduct}
                />
            </td>
        </tr>
    );
}
