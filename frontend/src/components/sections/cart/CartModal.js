import React, { useContext } from "react";
import { CartContext } from "../../../context/CartContext"; // ✅ Asegúrate de que la ruta es correcta
import { createCart, createPayment } from "../../servicios/payment/paymentService";
import { Link, useHistory } from "react-router-dom"; // Importa useHistory para redirigir después de la transacción

const CartContent = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const history = useHistory(); // Para redirigir después del pago
  // Función que se llama cuando el usuario hace clic en "Ir a Pagar"
  const handlePayment = async () => {
    try {
      // Aquí puedes agregar más detalles si es necesario (total, dirección, etc.)
      const paymentData = {
        items: cart,
        totalAmount: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), // Calcula el total
      };
      const cartCreated = await createCart(paymentData);
      
      const paymentCreated = await createPayment({idCartBuy : cartCreated._id});

      if (paymentCreated && paymentCreated.status === "CREATED") {
        // Si el pago fue exitoso, redirigimos a la URL proporcionada en la respuesta
        const approvalLink = paymentCreated.links[1].href; // Aquí obtenemos el enlace a la transacción de PayPal

        // Abrimos el enlace en una nueva ventana o pestaña
        window.open(approvalLink, "_blank");  // "_blank" asegura que se abre en una nueva pestaña
      } else {
        // Si hubo algún error en el proceso de pago, mostramos un mensaje de error
        alert("Hubo un problema con el pago. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Hubo un problema con el pago. Intenta nuevamente.");
    }
  };
  if (!cart || cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>🛒 Carrito de Compras</h2>
        <p>Tu carrito está vacío.</p>
        <Link to="/shop-left" className="btn btn-primary">Ver productos</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>🛒 Carrito de Compras</h2>
      <ul className="cart-list">
        {
          cart.map((item) => {
            return (
              <li key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                  onError={(e) => (e.target.src = "")}
                />
                <div className="cart-item-info">
                  <span>{item.name} - ${Number(item.price || 0).toFixed(2)} x {item.quantity}</span>
                </div>
                <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>❌ Eliminar</button>
              </li>
            );
          })
        }
      </ul>
      <div className="cart-actions">
        <button className="btn btn-secondary" onClick={clearCart}>🗑 Vaciar Carrito</button>
        <button className="btn btn-success" onClick={handlePayment}>💳 Ir a Pagar</button>
      </div>
    </div>
  );
};

export default CartContent;
