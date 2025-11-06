'use client';

import { useState, useEffect } from 'react';
import AdminNav from '@/components/AdminNav';
import { QrCode, Plus, Download, Printer } from 'lucide-react';
import QRCode from 'qrcode';
import toast from 'react-hot-toast';

interface Table {
  id: string;
  number: string;
  qrCode: string;
  capacity: number;
}

export default function TablesPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState('');
  const [newTableCapacity, setNewTableCapacity] = useState(4);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await fetch('/api/tables');
      if (response.ok) {
        const data = await response.json();
        setTables(data.tables || []);
      }
    } catch (error) {
      console.error('Failed to fetch tables:', error);
    }
  };

  const generateQRCode = async (tableId: string, tableNumber: string) => {
    try {
      const url = `${window.location.origin}/qr-menu/${tableId}`;
      const qrCodeDataURL = await QRCode.toDataURL(url, {
        width: 512,
        margin: 2,
        color: {
          dark: '#1B4332',
          light: '#FFFFFF',
        },
      });
      return qrCodeDataURL;
    } catch (error) {
      console.error('QR Code generation error:', error);
      return null;
    }
  };

  const handleAddTable = async () => {
    if (!newTableNumber) {
      toast.error('Please enter a table number');
      return;
    }

    try {
      const response = await fetch('/api/tables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number: newTableNumber,
          capacity: newTableCapacity,
        }),
      });

      if (response.ok) {
        toast.success('Table added successfully!');
        setShowAddModal(false);
        setNewTableNumber('');
        setNewTableCapacity(4);
        fetchTables();
      } else {
        toast.error('Failed to add table');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDownloadQR = async (table: Table) => {
    const qrCode = await generateQRCode(table.id, table.number);
    if (qrCode) {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = `table-${table.number}-qr.png`;
      link.click();
      toast.success('QR Code downloaded!');
    }
  };

  const handlePrintQR = async (table: Table) => {
    const qrCode = await generateQRCode(table.id, table.number);
    if (qrCode) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Table ${table.number} QR Code</title>
              <style>
                body {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  height: 100vh;
                  margin: 0;
                  font-family: Arial, sans-serif;
                }
                h1 { color: #1B4332; margin-bottom: 20px; }
                img { max-width: 400px; }
                p { margin-top: 20px; color: #666; }
              </style>
            </head>
            <body>
              <h1>Table ${table.number}</h1>
              <img src="${qrCode}" alt="QR Code" />
              <p>Scan to view menu and order</p>
              <p>Sherlock Holmes Pub</p>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-100">
      <AdminNav />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-pub-green">
              Tables & QR Codes
            </h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New Table
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tables.map((table) => (
              <div key={table.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-pub-green">Table {table.number}</h3>
                    <p className="text-sm text-neutral-600">Capacity: {table.capacity} guests</p>
                  </div>
                  <QrCode className="w-8 h-8 text-pub-brass" />
                </div>

                <div className="bg-neutral-100 rounded-lg p-4 mb-4">
                  <div className="aspect-square flex items-center justify-center">
                    <img
                      src={table.qrCode || '/api/placeholder/200/200'}
                      alt={`Table ${table.number} QR`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownloadQR(table)}
                    className="flex-1 btn-outline text-sm py-2 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => handlePrintQR(table)}
                    className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                </div>
              </div>
            ))}
          </div>

          {tables.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <QrCode className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <p className="text-xl text-neutral-600 mb-4">No tables added yet</p>
              <button onClick={() => setShowAddModal(true)} className="btn-primary">
                Add Your First Table
              </button>
            </div>
          )}

          {/* Add Table Modal */}
          {showAddModal && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setShowAddModal(false)}
              />
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-8 z-50 w-full max-w-md">
                <h2 className="text-2xl font-serif font-bold text-pub-green mb-6">Add New Table</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Table Number
                    </label>
                    <input
                      type="text"
                      value={newTableNumber}
                      onChange={(e) => setNewTableNumber(e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-pub-green"
                      placeholder="e.g., 1, 2, 3, A1, B2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Capacity (guests)
                    </label>
                    <input
                      type="number"
                      value={newTableCapacity}
                      onChange={(e) => setNewTableCapacity(parseInt(e.target.value))}
                      min="1"
                      max="20"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-pub-green"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTable}
                    className="flex-1 btn-primary"
                  >
                    Add Table
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
