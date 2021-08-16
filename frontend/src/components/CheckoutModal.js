import Modal from "react-bootstrap/Modal";
import { Button, ProgressBar } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../App";
// import { clearCart } from "../localStorage";

const CheckoutModal = (props) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const checkoutIsClicked = props.show;
  const cart = useContext(CartContext);
  const noOfItems = cart.cart.size;

  useEffect(() => {
    let intervalId;
    if (checkoutIsClicked) {
      intervalId = setInterval(() => {
        setCurrentProgress((oldValue) => {
          const newValue = oldValue + 1;
          if (newValue === 100) {
            clearInterval(intervalId);
          }
          return newValue;
        });
      }, 25 * cart.cart.size);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
      setCurrentProgress(0);
    };
  }, [checkoutIsClicked, cart.cart.size]);

  const disable = currentProgress === 100 ? false : true;
  const displayString = disable ? "Loading" : "Done!";

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Loading {noOfItems} items to your Neuralink
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {noOfItems > 4 &&
          "This may take a while. Try out Neuralink Accelerator addon for faster warp speed..."}
        <ProgressBar min={0} animated now={currentProgress} variant="warning" />
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.onClick();
            setTimeout(() => {
              cart.clearCart();
              props.onHide();
            }, 1000);
          }}
          disabled={disable}
          variant="warning"
        >
          {displayString}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;
