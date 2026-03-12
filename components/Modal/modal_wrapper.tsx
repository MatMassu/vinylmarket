export default function ModalWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-[90vw] sm:max-w-sm md:max-w-md overflow-hidden">{children}</div>
    </div>
  );
}
