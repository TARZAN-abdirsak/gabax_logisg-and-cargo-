interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  company?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
}: TestimonialCardProps) {
  return (
    <div className="rounded-lg border p-6">
      <blockquote className="text-sm text-gray-700">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-4">
        <p className="text-sm font-semibold">{author}</p>
        {(role || company) && (
          <p className="text-xs text-gray-500">
            {role}{role && company && ', '}{company}
          </p>
        )}
      </div>
    </div>
  );
}
