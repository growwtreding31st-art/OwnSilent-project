"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Car, Plus, Edit, Trash2, ShieldCheck, X } from 'lucide-react';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  vin: string;
  isDefault: boolean;
  image: string;
}

const initialVehicles: Vehicle[] = [
  { id: 1, brand: 'BMW', model: 'M4 Competition', year: 2023, vin: 'WBS123...', isDefault: true, image: '/images/cars/bmw-m4.png' },
  { id: 2, brand: 'Porsche', model: '911 GT3', year: 2022, vin: 'WP0456...', isDefault: false, image: '/images/cars/porsche-911.png' },
];

const VehicleModal = ({ isOpen, onClose, onSave, vehicle }: { isOpen: boolean, onClose: () => void, onSave: (vehicleData: any) => void, vehicle: Vehicle | null }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <header className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">{vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100"><X className="w-6 h-6 text-slate-600"/></button>
        </header>
        <form className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-semibold text-slate-600 mb-1 block">Brand</label>
                    <select defaultValue={vehicle?.brand} className="w-full bg-slate-100 rounded-lg p-3 outline-none focus:ring-2 focus:ring-amber-500"><option>BMW</option><option>Porsche</option></select>
                </div>
                <div>
                    <label className="text-sm font-semibold text-slate-600 mb-1 block">Model</label>
                    <input type="text" defaultValue={vehicle?.model} className="w-full bg-slate-100 rounded-lg p-3 outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-semibold text-slate-600 mb-1 block">Year</label>
                    <input type="number" defaultValue={vehicle?.year} className="w-full bg-slate-100 rounded-lg p-3 outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                 <div>
                    <label className="text-sm font-semibold text-slate-600 mb-1 block">VIN Number</label>
                    <input type="text" defaultValue={vehicle?.vin} className="w-full bg-slate-100 rounded-lg p-3 outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
            </div>
            <footer className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="bg-slate-100 text-slate-700 font-semibold py-2.5 px-6 rounded-lg hover:bg-slate-200">Cancel</button>
                <button type="submit" className="bg-slate-900 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-slate-700">Save Vehicle</button>
            </footer>
        </form>
      </div>
    </div>
  );
};

export default function MyGaragePage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

    const handleOpenModal = (vehicle: Vehicle | null = null) => {
        setEditingVehicle(vehicle);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <VehicleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={() => {}} vehicle={editingVehicle} />
            <div>
                <h1 className="text-3xl font-bold text-slate-800">My Garage</h1>
                <p className="text-slate-500 mt-1">Manage your vehicles to find compatible parts faster.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {vehicles.map(vehicle => (
                    <div key={vehicle.id} className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 flex flex-col group">
                        <div className="relative p-6 bg-slate-100 rounded-t-2xl">
                            <Image src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} width={300} height={200} className="w-full h-40 object-contain"/>
                             {vehicle.isDefault && (
                                <div className="absolute top-4 right-4 text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full flex items-center gap-1">
                                    <ShieldCheck className="w-4 h-4" /> Default
                                </div>
                            )}
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                            <h3 className="font-bold text-slate-800 text-xl">{vehicle.brand} {vehicle.model}</h3>
                            <p className="text-slate-500">{vehicle.year}</p>
                            <div className="mt-6 flex-grow">
                                <button className="w-full bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-700 transition-colors">
                                    Shop Parts for this Vehicle
                                </button>
                            </div>
                            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200">
                                <button onClick={() => handleOpenModal(vehicle)} className="flex items-center gap-1 text-sm font-semibold text-slate-600 p-2 rounded-md hover:bg-slate-100"><Edit className="w-4 h-4"/> Edit</button>
                                <button className="flex items-center gap-1 text-sm font-semibold text-red-600 p-2 rounded-md hover:bg-red-50"><Trash2 className="w-4 h-4"/> Delete</button>
                            </div>
                        </div>
                    </div>
                ))}

                <button onClick={() => handleOpenModal(null)} className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl border-2 border-dashed border-slate-300 text-slate-500 hover:border-amber-500 hover:text-amber-600 transition-colors">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                       <Plus className="w-8 h-8"/>
                    </div>
                    <span className="font-semibold text-lg">Add New Vehicle</span>
                </button>
            </div>
        </div>
    );
}