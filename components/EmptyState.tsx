interface EmptyStateProps {
    message?: string;
}

export default function EmptyState({
    message = "Oops, nothing here. Tap + to start adding entries."
}: EmptyStateProps) {
    return (
        <div className="empty-state">
            <p>{message}</p>
        </div>
    );
}
