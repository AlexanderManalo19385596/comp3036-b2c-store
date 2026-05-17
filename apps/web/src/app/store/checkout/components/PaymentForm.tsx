import { useState } from "react";

type PaymentFormProps = {
  onPay: () => void;
  loading: boolean;
};

export function PaymentForm({ onPay, loading }: PaymentFormProps) {
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const formatCard = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 2) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPay();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h3 className="font-bold text-base text-gray-900 mb-4 pb-3 border-b border-gray-100">
        Payment Details
      </h3>

      {/* Demo hint */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-5">
        <p className="text-xs font-semibold text-blue-700 mb-1">Demo card details:</p>
        <p className="text-xs text-blue-600">Card: 4242 4242 4242 4242</p>
        <p className="text-xs text-blue-600">Expiry: 12/26 — CVV: 123</p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Name on card */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Name on Card
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Smith"
            required
            aria-label="Name on card"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none bg-gray-50"
          />
        </div>

        {/* Card number */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Card Number
          </label>
          <input
            type="text"
            value={card}
            onChange={(e) => setCard(formatCard(e.target.value))}
            placeholder="4242 4242 4242 4242"
            required
            aria-label="Card number"
            maxLength={19}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none bg-gray-50 font-mono"
          />
        </div>

        {/* Expiry + CVV */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Expiry Date
            </label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              required
              aria-label="Expiry date"
              maxLength={5}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              CVV
            </label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
              placeholder="123"
              required
              aria-label="CVV security code"
              maxLength={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none bg-gray-50"
            />
          </div>
        </div>

        {/* Pay button */}
        <button
          type="submit"
          disabled={loading}
          aria-label="Complete payment"
          className={`w-full py-3.5 rounded-xl font-bold text-base text-white border-none transition-all ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-wsu-red cursor-pointer hover:opacity-90"
          }`}
        >
          {loading ? "Processing payment..." : "Pay Now"}
        </button>

        <p className="text-center text-xs text-gray-400 mt-3">
           Secured gateway
        </p>

      </form>
    </div>
  );
}