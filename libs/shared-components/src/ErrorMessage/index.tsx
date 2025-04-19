import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = 'Something went wrong',
  message = 'We encountered an error while processing your request. Please try again later.',
  retryLabel = 'Try Again',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-900 shadow-md overflow-hidden">
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 border-0 p-0">
              {title}
            </h3>
          </div>
        </div>

        <div className="p-4">
          <p className="text-gray-600 dark:text-gray-300 leading-tight">
            {message}
          </p>
        </div>

        {onRetry && (
          <div className="p-4 pt-0">
            <button
              onClick={onRetry}
              className="px-4 py-2 rounded-md border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              {retryLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
