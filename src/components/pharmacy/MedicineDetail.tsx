import { useState } from "react";
import { ArrowLeft, Plus, Minus, ShoppingCart, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VoiceButton } from "../voice/VoiceButton";

interface Medicine {
  id: string;
  name: string;
  genericName: string;
  price: number;
  category: string;
  inStock: boolean;
  prescription: boolean;
  image: string;
}

interface MedicineDetailProps {
  medicine: Medicine;
  onBack: () => void;
  onAddToCart: (medicine: Medicine, quantity: number) => void;
}

export const MedicineDetail = ({ medicine, onBack, onAddToCart }: MedicineDetailProps) => {
  const [quantity, setQuantity] = useState(1);

  const medicineDetails = {
    description: "Paracetamol is a pain reliever and fever reducer commonly used to treat headaches, muscle aches, arthritis, backaches, toothaches, colds, and fevers.",
    dosage: "Adults: 500mg-1000mg every 4-6 hours. Maximum 4000mg per day.",
    sideEffects: ["Nausea", "Skin rash", "Allergic reactions (rare)"],
    warnings: ["Do not exceed recommended dose", "Consult doctor if symptoms persist", "Keep out of reach of children"],
    ingredients: "Active: Paracetamol 500mg, Inactive: Starch, Povidone, Stearic acid"
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(medicine, quantity);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground truncate">
          Medicine Details
        </h1>
        <VoiceButton />
      </div>

      <div className="p-4 space-y-6">
        {/* Medicine Header */}
        <Card className="p-6 bg-medical-light-blue">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center">
              <div className="text-3xl">💊</div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {medicine.name}
              </h2>
              <p className="text-muted-foreground mb-3">{medicine.genericName}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline">{medicine.category}</Badge>
                {medicine.prescription && (
                  <Badge variant="secondary">Prescription Required</Badge>
                )}
                <Badge variant={medicine.inStock ? "default" : "destructive"}>
                  {medicine.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">${medicine.price}</p>
              <p className="text-sm text-muted-foreground">per pack</p>
            </div>
          </div>
        </Card>

        {/* Prescription Warning */}
        {medicine.prescription && (
          <Card className="p-4 bg-warning/10 border-warning">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-warning" />
              <div>
                <h3 className="font-semibold text-foreground">Prescription Required</h3>
                <p className="text-sm text-muted-foreground">
                  Please upload a valid prescription before ordering this medication.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Quantity and Add to Cart */}
        {medicine.inStock && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quantity</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-medium text-foreground w-8 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-primary">
                  ${(medicine.price * quantity).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
            <Button 
              onClick={handleAddToCart} 
              className="w-full mt-4"
              disabled={!medicine.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </Card>
        )}

        {/* Description */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Info className="h-5 w-5 mr-2" />
            Description
          </h3>
          <p className="text-foreground leading-relaxed">
            {medicineDetails.description}
          </p>
        </Card>

        {/* Dosage */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Dosage</h3>
          <p className="text-foreground">
            {medicineDetails.dosage}
          </p>
        </Card>

        {/* Side Effects */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Side Effects</h3>
          <ul className="space-y-2">
            {medicineDetails.sideEffects.map((effect, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-foreground">{effect}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Warnings */}
        <Card className="p-6 bg-destructive/10 border-destructive/20">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-destructive" />
            Important Warnings
          </h3>
          <ul className="space-y-2">
            {medicineDetails.warnings.map((warning, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                <span className="text-foreground">{warning}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Ingredients */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Ingredients</h3>
          <p className="text-foreground">
            {medicineDetails.ingredients}
          </p>
        </Card>
      </div>
    </div>
  );
};