import React, { useState } from "react";

const products = [
  { name: "Laptop", sku: "LAP-001", category: "Electronics", quantity: 15, threshold: 10, price: 999.99 },
  { name: "Mouse", sku: "MOU-001", category: "Electronics", quantity: 5, threshold: 20, price: 29.99 },
  { name: "Keyboard", sku: "KEY-001", category: "Electronics", quantity: 8, threshold: 15, price: 79.99 },
  { name: "Monitor", sku: "MON-001", category: "Electronics", quantity: 3, threshold: 5, price: 299.99 },
  { name: "Desk Chair", sku: "CHR-001", category: "Furniture", quantity: 25, threshold: 10, price: 199.99 },
];

function getStatus(product) {
  if (product.quantity <= product.threshold) return "Low Stock";
  return "In Stock";
}

function getStatusColor(status) {
  return status === "Low Stock"
    ? { background: "#FFF5D1", color: "#B8860B" }
    : { background: "#E7F9ED", color: "#2E7D32" };
}

export default function Dashboard({ onLogout }) {
  const [search, setSearch] = useState("");
  const filtered = products.filter(
    p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );
  const lowStock = products.filter(p => p.quantity <= p.threshold);
  const totalValue = products.reduce((sum, p) => sum + p.quantity * p.price, 0);

  return (
    <div style={{ background: "#f7f7fa", minHeight: "100vh", paddingBottom: 40 }}>
      {/* Header */}
      <div style={{
        background: "#fff",
        padding: "18px 36px",
        borderBottom: "1px solid #eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ fontWeight: 700, fontSize: 22, display: "flex", alignItems: "center" }}>
          <span style={{
            display: "inline-block",
            width: 28,
            height: 28,
            background: "#222",
            borderRadius: 6,
            marginRight: 10,
            textAlign: "center",
            color: "#FFD600",
            fontWeight: 900,
            fontSize: 20,
            lineHeight: "28px"
          }}>▣</span>
          Inventory Manager
        </div>
        <div>
          <span style={{
            background: "#FFF5D1",
            color: "#B8860B",
            padding: "6px 16px",
            borderRadius: 6,
            fontWeight: 600,
            marginRight: 18,
            fontSize: 15
          }}>
            <span style={{ marginRight: 6 }}>🔔</span>
            {lowStock.length} Alerts
          </span>
          <button
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: 6,
              padding: "6px 18px",
              fontWeight: 600,
              cursor: "pointer"
            }}
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Title */}
      <div style={{ maxWidth: 1100, margin: "30px auto 0", padding: "0 24px" }}>
        <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Inventory Dashboard</div>
        <div style={{ color: "#666", marginBottom: 28 }}>Monitor and manage your shop's inventory</div>

        {/* Summary Cards */}
        <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
          <div style={{
            flex: 1,
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <div style={{ fontSize: 15, color: "#444", marginBottom: 6 }}>Total Products</div>
            <div style={{ fontWeight: 700, fontSize: 22 }}>{products.length}</div>
          </div>
          <div style={{
            flex: 1,
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <div style={{ fontSize: 15, color: "#444", marginBottom: 6 }}>Total Items</div>
            <div style={{ fontWeight: 700, fontSize: 22 }}>{products.reduce((sum, p) => sum + p.quantity, 0)}</div>
          </div>
          <div style={{
            flex: 1,
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <div style={{ fontSize: 15, color: "#444", marginBottom: 6 }}>Low Stock Alerts</div>
            <div style={{ fontWeight: 700, fontSize: 22 }}>{lowStock.length}</div>
          </div>
          <div style={{
            flex: 1,
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <div style={{ fontSize: 15, color: "#444", marginBottom: 6 }}>Inventory Value</div>
            <div style={{ fontWeight: 700, fontSize: 22 }}>${totalValue.toFixed(2)}</div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        {lowStock.length > 0 && (
          <div style={{
            background: "#FFFBEA",
            borderRadius: 12,
            padding: "18px 24px",
            marginBottom: 32,
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
          }}>
            <div style={{ fontWeight: 600, color: "#B8860B", marginBottom: 10 }}>
              <span style={{ marginRight: 8 }}>⚠️</span>
              Low Stock Alerts
              <span style={{ marginLeft: 8, fontWeight: 400, color: "#B8860B" }}>
                {lowStock.length} products need attention
              </span>
            </div>
            {lowStock.map((p, i) => (
              <div key={i} style={{
                background: "#fff",
                borderRadius: 8,
                padding: "10px 18px",
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #FFE9A7"
              }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: "#888" }}>
                    SKU: {p.sku} · Category: {p.category}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={{
                    fontWeight: 700,
                    color: "#B8860B",
                    fontSize: 18,
                    minWidth: 22,
                    textAlign: "center"
                  }}>{p.quantity}</div>
                  <div style={{
                    background: "#FFF5D1",
                    color: "#B8860B",
                    borderRadius: 6,
                    padding: "2px 10px",
                    fontSize: 13,
                    fontWeight: 600
                  }}>
                    {p.quantity <= p.threshold / 2 ? "Critical" : "Low Stock"}
                  </div>
                  <div style={{ fontSize: 13, color: "#888" }}>
                    Threshold: {p.threshold}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Inventory Table */}
        <div style={{
          background: "#fff",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
        }}>
          <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 18 }}>Product Inventory</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: "8px 14px",
                borderRadius: 6,
                border: "1px solid #ddd",
                width: 220,
                fontSize: 15
              }}
            />
            <button style={{
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "8px 18px",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer"
            }}>+ Add Product</button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
              <thead>
                <tr style={{ background: "#f7f7fa", color: "#444" }}>
                  <th style={{ textAlign: "left", padding: "10px 8px" }}>Product Name</th>
                  <th style={{ textAlign: "left", padding: "10px 8px" }}>SKU</th>
                  <th style={{ textAlign: "left", padding: "10px 8px" }}>Category</th>
                  <th style={{ textAlign: "right", padding: "10px 8px" }}>Quantity</th>
                  <th style={{ textAlign: "right", padding: "10px 8px" }}>Threshold</th>
                  <th style={{ textAlign: "right", padding: "10px 8px" }}>Price</th>
                  <th style={{ textAlign: "center", padding: "10px 8px" }}>Status</th>
                  <th style={{ textAlign: "center", padding: "10px 8px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "10px 8px" }}>{p.name}</td>
                    <td style={{ padding: "10px 8px" }}>{p.sku}</td>
                    <td style={{ padding: "10px 8px" }}>{p.category}</td>
                    <td style={{ padding: "10px 8px", textAlign: "right", fontWeight: 600 }}>{p.quantity}</td>
                    <td style={{ padding: "10px 8px", textAlign: "right" }}>{p.threshold}</td>
                    <td style={{ padding: "10px 8px", textAlign: "right" }}>${p.price.toFixed(2)}</td>
                    <td style={{ padding: "10px 8px", textAlign: "center" }}>
                      <span style={{
                        ...getStatusColor(getStatus(p)),
                        borderRadius: 6,
                        padding: "3px 14px",
                        fontWeight: 600,
                        fontSize: 14,
                        display: "inline-block"
                      }}>
                        {getStatus(p)}
                      </span>
                    </td>
                    <td style={{ padding: "10px 8px", textAlign: "center" }}>
                      <button style={{
                        background: "none",
                        border: "none",
                        color: "#222",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}>✏️ Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}