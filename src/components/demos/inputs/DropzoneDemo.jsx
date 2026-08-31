import { useRef, useState } from 'react';
import { Upload, FileText, Check } from 'lucide-react';

export default function DropzoneDemo({ activeOptions }) {
  const inputRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [files, setFiles] = useState([]);
  const showPreview  = activeOptions.has('preview');
  const highlightDrag = activeOptions.has('drag');

  const chooseFiles = (fileList) => {
    const nextFiles = Array.from(fileList || []);
    if (nextFiles.length) setFiles(nextFiles);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDrag(false);
    chooseFiles(event.dataTransfer.files);
  };

  const formatSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const previewFiles = files.length
    ? files
    : showPreview
      ? [{ name: 'example-report.pdf', size: 1.2 * 1024 * 1024 }]
      : [];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <input
        ref={inputRef}
        type="file"
        multiple
        className="sr-only"
        aria-label="Choose files to upload"
        onChange={(event) => chooseFiles(event.target.files)}
      />
      <button
        type="button"
        className={`w-full max-w-xl aspect-video border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/25 ${isDrag && highlightDrag ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 scale-[1.02] shadow-xl' : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800'}`}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => { event.preventDefault(); setIsDrag(true); }}
        onDragOver={(event) => { event.preventDefault(); setIsDrag(true); }}
        onDragLeave={(event) => {
          event.preventDefault();
          if (!event.currentTarget.contains(event.relatedTarget)) setIsDrag(false);
        }}
        onDrop={handleDrop}
      >
        <Upload size={48} className={`mb-4 ${isDrag ? 'text-indigo-600 animate-bounce' : 'text-zinc-400'}`} />
        <span className="text-xl font-semibold text-zinc-700 dark:text-zinc-200">
          {isDrag ? 'Drop the files here' : 'Drag files here or click to browse'}
        </span>
        <span className="mt-2 text-base text-zinc-500 dark:text-zinc-400">PDF, PNG, or JPG up to 10 MB</span>
      </button>
      <p className="mt-4 text-center text-base text-zinc-500 dark:text-zinc-300" aria-live="polite">
        {files.length ? `${files.length} ${files.length === 1 ? 'file' : 'files'} selected.` : highlightDrag ? 'Drag State is on. Drag a file over the box to see the highlight.' : 'Select Drag State above, then drag a file over the box to compare.'}
      </p>
      {previewFiles.length > 0 && (
        <div className="mt-5 w-full max-w-xl space-y-3" aria-label="Selected files">
          {previewFiles.map((file) => (
            <div key={`${file.name}-${file.size}`} className="bg-white dark:bg-zinc-800 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center gap-4 animate-slide-in-up shadow-sm">
              <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center">
                <FileText size={28} className="text-zinc-500" />
              </div>
              <div className="flex-1 text-base text-left">
                <div className="font-bold text-zinc-900 dark:text-zinc-100">{file.name}</div>
                <div className="text-zinc-500 text-sm mt-0.5">{formatSize(file.size)}</div>
              </div>
              <Check size={24} className="text-green-500" aria-label="Ready" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
