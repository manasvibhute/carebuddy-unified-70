import { useState } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VoiceButton } from "../voice/VoiceButton";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  prescription: boolean;
}

interface CartProps {
  onBack: () => void;
  onCheckout: (items: CartItem[], total: number) => void;
  items?: CartItem[];
}

export const Cart = ({ onBack, onCheckout, items = [] }: CartProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(items.length > 0 ? items : [
    { id: "1", name: "Paracetamol 500mg", price: 12.99, quantity: 2, prescription: false },
    { id: "2", name: "Vitamin D3 1000IU", price: 15.75, quantity: 1, prescription: false },
    { id: "3", name: "Amoxicillin 250mg", price: 28.50, quantity: 1, prescription: true },
  ]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    onCheckout(cartItems, total);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" onClick={onBack}>
          <X className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-foreground">
          Cart ({cartItems.length})
        </h1>
        <VoiceButton />
      </div>

      <div className="p-4 space-y-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Your cart is empty
            </h3>
            <p className="text-muted-foreground mb-6">
              Add some medicines to get started
            </p>
            <Button onClick={onBack}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-medical-light-blue rounded-lg flex items-center justify-center">
                      <div className="text-xl">💊</div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Rs.{item.price} each
                      </p>
                      {item.prescription && (
                        <p className="text-xs text-warning bg-warning/10 px-2 py-1 rounded inline-block">
                          Prescription Required
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 ml-2"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        Rs.{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <Card className="p-6 bg-medical-light-blue">
              <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span>Rs.{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>
                    Delivery Fee 
                    {subtotal > 50 && <span className="text-sm text-accent ml-1">(Free over $50)</span>}
                  </span>
                  <span>{deliveryFee === 0 ? "Free" : `Rs.${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between text-lg font-semibold text-foreground">
                    <span>Total</span>
                    <span className="text-primary">Rs.{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button onClick={handleCheckout} className="w-full mt-6">
                Proceed to Checkout
              </Button>
            </Card>

            {/* Prescription Notice */}
            {cartItems.some(item => item.prescription) && (
              <Card className="p-4 bg-warning/10 border-warning">
                <p className="text-sm text-foreground">
                  <strong>Note:</strong> Your cart contains prescription medicines. 
                  You'll need to upload valid prescriptions during checkout.
                </p>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};