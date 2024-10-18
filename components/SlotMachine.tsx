"use client";

import React, { useState, useEffect } from 'react';

interface SlotMachineProps {
  items: string[];
  onSpinEnd: (item: string) => void;
}

const SlotMachine: React.FC<SlotMachineProps> = ({ items, onSpinEnd }) => {
  const [spinning, setSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    if (spinning) {
      const interval = setInterval(() => {
        setSelectedItem(items[Math.floor(Math.random() * items.length)]);
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setSpinning(false);
        const finalItem = items[Math.floor(Math.random() * items.length)];
        setSelectedItem(finalItem);
        onSpinEnd(finalItem);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [spinning, items, onSpinEnd]);

  return (
    <div className="w-64 h-64 border-4 border-yellow-400 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
      <div className={`text-4xl font-bold text-white ${spinning ? 'animate-pulse' : ''}`}>
        {selectedItem || 'Spin!'}
      </div>
    </div>
  );
};

export default SlotMachine;