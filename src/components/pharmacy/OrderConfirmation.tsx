import { CheckCircle, Package, Clock, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VoiceButton } from "../voice/VoiceButton";

interface OrderConfirmationProps {
  orderId: string;
  total: number;
  onBackToHome: () => void;
}

export const OrderConfirmation = ({ orderId, total, onBackToHome }: OrderConfirmationProps) => {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div></div>
        <h1 className="text-xl font-semibold text-foreground">Order Confirmed</h1>
        <VoiceButton />
      </div>

      <div className="p-4 space-y-6">
        {/* Success Message */}
        <Card className="p-8 text-center bg-accent-light">
          <CheckCircle className="h-16 w-16 mx-auto text-accent mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Order Confirmed!
          </h2>
          <p className="text-muted-foreground mb-4">
            Thank you for your order. We're preparing your medicines for delivery.
          </p>
          <p className="text-lg font-semibold text-primary">
            Order Total: ${total.toFixed(2)}
          </p>
        </Card>

        {/* Order Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Order Details</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-medium text-foreground">{orderId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Order Date</span>
              <span className="font-medium text-foreground">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium text-foreground">Credit Card</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-accent">Processing</span>
            </div>
          </div>
        </Card>

        {/* Delivery Information */}
        <Card className="p-6 bg-primary-light">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Delivery Information
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">
                  Estimated Delivery: {estimatedDelivery.toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  2-3 business days
                </p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 mt-4">
              <p className="text-sm font-medium text-foreground mb-1">Delivery Address:</p>
              <p className="text-sm text-muted-foreground">
                123 Health Street<br />
                Medical City, MC 12345<br />
                United States
              </p>
            </div>
          </div>
        </Card>

        {/* Order Timeline */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Order Timeline</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Order Placed</p>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleTimeString()} - Your order has been received
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-muted rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-muted-foreground">Processing</p>
                <p className="text-sm text-muted-foreground">
                  We're preparing your medicines
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-muted rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-muted-foreground">Shipped</p>
                <p className="text-sm text-muted-foreground">
                  Your order is on its way
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-muted rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium text-muted-foreground">Delivered</p>
                <p className="text-sm text-muted-foreground">
                  Order arrives at your doorstep
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button onClick={onBackToHome} className="w-full">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <Button variant="outline" className="w-full">
            Track Order
          </Button>
        </div>

        {/* Contact Information */}
        <Card className="p-6 bg-muted/50">
          <h3 className="text-lg font-semibold text-foreground mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            If you have any questions about your order, please contact us:
          </p>
          <div className="space-y-1 text-sm">
            <p className="text-foreground">📞 1-800-HEALTH (1-800-432-584)</p>
            <p className="text-foreground">📧 support@healthapp.com</p>
          </div>
        </Card>
      </div>
    </div>
  );
};