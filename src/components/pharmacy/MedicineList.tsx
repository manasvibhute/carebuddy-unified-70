import { useState } from "react";
import { Search, ShoppingCart, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { VoiceButton } from "../voice/VoiceButton";
import { VoiceInput } from "../voice/VoiceInput";

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

interface MedicineListProps {
  onBack: () => void;
  onMedicineSelect: (medicine: Medicine) => void;
  onCartOpen: () => void;
  cartCount: number;
}

export const MedicineList = ({ onBack, onMedicineSelect, onCartOpen, cartCount }: MedicineListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "pain relief", "antibiotics", "vitamins", "heart", "diabetes"];

  const medicines: Medicine[] = [
    {
      id: "1",
      name: "Paracetamol 500mg",
      genericName: "Acetaminophen",
      price: 12.99,
      category: "pain relief",
      inStock: true,
      prescription: false,
      image: "/api/placeholder/100/100"
    },
    {
      id: "2",
      name: "Amoxicillin 250mg",
      genericName: "Amoxicillin",
      price: 28.50,
      category: "antibiotics",
      inStock: true,
      prescription: true,
      image: "/api/placeholder/100/100"
    },
    {
      id: "3",
      name: "Vitamin D3 1000IU",
      genericName: "Cholecalciferol",
      price: 15.75,
      category: "vitamins",
      inStock: true,
      prescription: false,
      image: "/api/placeholder/100/100"
    },
    {
      id: "4",
      name: "Lisinopril 10mg",
      genericName: "Lisinopril",
      price: 22.00,
      category: "heart",
      inStock: false,
      prescription: true,
      image: "/api/placeholder/100/100"
    },
    {
      id: "5",
      name: "Metformin 500mg",
      genericName: "Metformin HCl",
      price: 18.90,
      category: "diabetes",
      inStock: true,
      prescription: true,
      image: "/api/placeholder/100/100"
    }
  ];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.genericName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" onClick={onBack}>
          <X className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-foreground">Pharmacy</h1>
        <div className="flex items-center gap-2">
          <VoiceButton onVoiceInput={(text) => setSearchQuery(text)} />
          <Button variant="outline" size="icon" onClick={onCartOpen} className="relative">
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search */}
        <VoiceInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search medicines..."
          className="w-full"
        />

        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Medicine List */}
        <div className="space-y-3">
          {filteredMedicines.map((medicine) => (
            <Card 
              key={medicine.id} 
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onMedicineSelect(medicine)}
            >
              <div className="flex items-center space-x-4">
                {/* Medicine Image */}
                <div className="w-16 h-16 bg-medical-light-blue rounded-lg flex items-center justify-center">
                  <div className="text-2xl">💊</div>
                </div>

                {/* Medicine Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground truncate">
                        {medicine.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {medicine.genericName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-primary">
                        ${medicine.price}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {medicine.category}
                    </Badge>
                    {medicine.prescription && (
                      <Badge variant="secondary" className="text-xs">
                        Prescription Required
                      </Badge>
                    )}
                    <Badge 
                      variant={medicine.inStock ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {medicine.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No medicines found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};