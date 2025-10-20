import React, { useState } from "react";
import sign from "../components/Signin";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import DashboardView from '../components/Dashboard';
import Inventory from '../components/Inventory';
import Analytics from '../components/Analytics';
import AddItemModal from '../components/AddItemModal';
import ObjectDetectionModal from '../components/ObjectDetectionModal';
import { initialInventory } from '../utils/mockData';

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e?.preventDefault?.();
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.error("Sign out failed", err);
    }
  };

  // If user not signed in, show Login (or redirect)
  if (!session) return <sign />;

  // AppContent logic merged here
  const [activeTab, setActiveTab] = useState("dashboard");
  const [inventory, setInventory] = useState(initialInventory);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetectionModal, setShowDetectionModal] = useState(false);

  const addItem = (item) => {
    setInventory([
      ...inventory,
      { ...item, id: Date.now(), detectedAt: new Date().toISOString().split("T")[0] },
    ]);
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      )
    );
  };

  const addDetectedToInventory = (detected) => {
    const existingItem = inventory.find(
      (item) => item.name.toLowerCase() === detected.name.toLowerCase()
    );

    if (existingItem) {
      setInventory(
        inventory.map((item) =>
          item.id === existingItem.id ? { ...item, quantity: item.quantity + detected.quantity } : item
        )
      );
    } else {
      const newItem = {
        id: Date.now(),
        name: detected.name,
        category: detected.category,
        quantity: detected.quantity,
        minStock: 5,
        price: 0,
        image: null,
        detectedAt: new Date().toISOString().split("T")[0],
      };
      setInventory([...inventory, newItem]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onDetectClick={() => setShowDetectionModal(true)} onSignOut={handleSignOut} />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "dashboard" && <DashboardView inventory={inventory} />}
        {activeTab === "inventory" && (
          <Inventory
            inventory={inventory}
            onAddClick={() => setShowAddModal(true)}
            onDelete={deleteItem}
            onUpdateQuantity={updateQuantity}
          />
        )}
        {activeTab === "analytics" && <Analytics inventory={inventory} />}
      </main>

      {showAddModal && (
        <AddItemModal onClose={() => setShowAddModal(false)} onAdd={addItem} />
      )}

      {showDetectionModal && (
        <ObjectDetectionModal
          onClose={() => setShowDetectionModal(false)}
          onAddToInventory={addDetectedToInventory}
        />
      )}
    </div>
  );
};

export default Dashboard;
