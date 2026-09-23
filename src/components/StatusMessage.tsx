interface StatusMessageProps {
  isLoading: boolean;
  error: string | null;
}

function StatusMessage({
  isLoading,
  error,
}: StatusMessageProps) {
  if (isLoading) {
    return (
      <p className="status-message" role="status" aria-live="polite">
        Loading IP information...
      </p>
    );
  }

  if (error) {
    return (
      <p className="status-message status-error" role="alert">
        {error}
      </p>
    );
  }

  return null;
}

export default StatusMessage;