export default function ModalWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 px-6 py-6">
      <div className="bg-white p-8 pr-15 pb-15 rounded w-full max-w-[100vw] md:max-w-3xl lg:max-w-4xl overflow-hidden">{children}</div>
    </div>
  );
}
