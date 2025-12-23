import Checkout from "@/components/checkout";
import CheckoutScreen from "@/components/checkout";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-dvh m-auto flex justify-center items-center p-4 sm:p-0">

    <Checkout>
      <Checkout.TransferTabs />
      <Checkout.Body>
        <Checkout.CryptoToCash when="crypto-to-cash" />
        <Checkout.CashToCrypto when="cash-to-crypto" />
        <Checkout.CryptoToFiat when="crypto-to-fiat-loan" />
      </Checkout.Body>

    </Checkout>

    </main>
  );
}
