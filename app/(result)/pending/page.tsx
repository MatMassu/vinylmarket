import Link from "next/link";

export default function PendingPage() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 gap-4 py-24 text-center px-4">
      <h1 className="text-2xl font-semibold">Pago en proceso</h1>
      <p className="text-gray-500 text-sm max-w-sm">
        Tu pago está siendo procesado. Te notificaremos cuando sea confirmado.
      </p>
      <Link
        href="/"
        className="bg-blue-900 font-semibold text-sm px-6 py-2 text-white rounded-lg hover:opacity-70 transition-opacity mt-2"
      >
        Volver a la tienda
      </Link>
    </main>
  );
}
