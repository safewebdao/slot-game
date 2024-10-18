"use client";

import React, { useState, useEffect } from 'react';
import SlotMachine from './SlotMachine';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { parse } from 'csv-parse/sync';
import { Loader2 } from 'lucide-react';

interface Website {
  unique_visitors: number;
  title: string;
  description: string;
  url: string;
  screenshot: string;
}

const SlotMachineGame: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    fetch('/websites.csv')
      .then((response) => response.text())
      .then((csvData) => {
        const parsedData = parse(csvData, { columns: true, skip_empty_lines: true });
        setWebsites(parsedData);
      });
  }, []);

  const handleSpin = () => {
    setIsSpinning(true);
  };

  const handleSpinEnd = (title: string) => {
    const website = websites.find(w => w.title === title);
    setSelectedWebsite(website || null);
    setIsSpinning(false);
  };

  return (
    <div className="flex flex-col items-center">
      <SlotMachine 
        items={websites.map(w => w.title)} 
        onSpinEnd={handleSpinEnd} 
      />
      <Button
        onClick={handleSpin}
        disabled={isSpinning}
        className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
      >
        {isSpinning ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Spinning...
          </>
        ) : (
          'Spin!'
        )}
      </Button>
      {selectedWebsite && (
        <Card className="mt-8 w-full max-w-md">
          <CardHeader>
            <CardTitle>{selectedWebsite.title}</CardTitle>
            <CardDescription>{selectedWebsite.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src={selectedWebsite.screenshot}
              alt={selectedWebsite.title}
              className="w-full h-48 object-cover rounded-md"
            />
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => window.open(selectedWebsite.url, '_blank')}
              className="w-full"
            >
              Visit Website
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default SlotMachineGame;