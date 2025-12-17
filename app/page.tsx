import CheckoutScreen from "@/components/checkout";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-dvh m-auto flex justify-center items-center p-4 sm:p-0">

      <CheckoutScreen />
    </main>
  );
}
