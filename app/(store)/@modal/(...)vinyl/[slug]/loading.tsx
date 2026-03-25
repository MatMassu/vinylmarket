export default function ModalLoading() {
  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 px-6">
      <div className="bg-white p-6 rounded w-full max-w-[90vw] sm:max-w-md md:max-w-lg flex items-center justify-center min-h-64">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
