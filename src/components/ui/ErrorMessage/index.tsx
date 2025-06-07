interface ErrorMessageProps {
    message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className="flex-1 flex items-center justify-center text-red-500">
            <p>{message}</p>
        </div>
    );
} 