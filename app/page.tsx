import SlotMachineGame from '@/components/SlotMachineGame';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-4xl font-bold mb-8 text-white">Website Discovery Slot Machine</h1>
      <SlotMachineGame />
    </main>
  );
}