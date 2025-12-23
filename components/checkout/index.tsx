import CheckoutRoot from './Checkout';
import TransferTabs from './Checkout.TransferType';
import Body from './Checkout.Body';
import CryptoToCash from './Checkout.CryptoToCash';
import CryptoToFiat from './Checkout.CryptoToFiat';
import CashToCrypto from './Checkout.CashToCrypto';

const Checkout = CheckoutRoot as typeof CheckoutRoot & {
    TransferTabs: typeof TransferTabs;
    Body: typeof Body;
    CryptoToCash: typeof CryptoToCash;
    CashToCrypto: typeof CashToCrypto;
    CryptoToFiat: typeof CryptoToFiat;
  };

Checkout.TransferTabs = TransferTabs;
Checkout.Body = Body;
Checkout.CryptoToCash = CryptoToCash;
Checkout.CashToCrypto = CashToCrypto;
Checkout.CryptoToFiat = CryptoToFiat;

export default Checkout;