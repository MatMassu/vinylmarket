type Props = {
  sql: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
  error: string;
};

export default function SqlPreview({ sql, onConfirm, onCancel, loading, error }: Props) {
  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto p-6">
      <h2 className="font-medium text-lg">Revisar antes de insertar</h2>
      <pre className="bg-gray-50 border p-4 text-xs overflow-auto max-h-[60vh] whitespace-pre-wrap font-mono">
        {sql}
      </pre>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex gap-3">
        <button
          onClick={onConfirm}
          disabled={loading}
          className="bg-black text-white px-5 py-2 text-sm disabled:opacity-50"
        >
          {loading ? "Insertando..." : "Confirmar e insertar"}
        </button>
        <button
          onClick={onCancel}
          disabled={loading}
          className="border px-5 py-2 text-sm disabled:opacity-50"
        >
          Cancelar
        </button>
      </div>
      <p className="text-xs text-gray-400">
        Las imágenes ya fueron subidas al Blob. Cancelar no las elimina.
      </p>
    </div>
  );
}
