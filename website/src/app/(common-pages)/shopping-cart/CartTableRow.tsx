import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import "./cartPage.css";

const CartTableRow = ({ item, removeItem, updateItemQuantity }) => {
  const { title, image, price } = item;
  const subTotal = price * item?.quantity;

  const handelRemoveItem = (id) => {
    removeItem(id);
    toast.success("Removed item from cart successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <tr>
      <td data-label="Product">
        <div className="ps-product--cart">
          <div className="ps-product__thumbnail">
            <Link href="#">
              <img src={image} alt="" />
            </Link>
          </div>
          <div className="ps-product__content">
            <Link href="#">{title}</Link>
            <p>
              Sold By:<strong> YOUNG SHOP</strong>
            </p>
          </div>
        </div>
      </td>
      <td className="price" data-label="Price">
        ${price}
      </td>
      <td data-label="Quantity">
        <div className="form-group--number">
          <button className="up" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
            +
          </button>
          <button className="down" disabled={item?.quantity <= 1} onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
            {" "}
            -
          </button>
          <span>{item?.quantity}</span>
        </div>
      </td>
      <td data-label="Total">${subTotal.toFixed(2)}</td>
      <td data-label="Actions">
        <button className="action-button" onClick={() => handelRemoveItem(item?.id)}>
          {/* <i className="icon-cross" /> */}
          <RxCross1 />
        </button>
      </td>
    </tr>
  );
};

export default CartTableRow;
