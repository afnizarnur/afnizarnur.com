import type { PostCardProps } from '../types';
import { Card } from './Card';

/**
 * PostCard component for displaying blog post previews
 * Used in blog index page
 */
export function PostCard({
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage,
  coverImageAlt,
  tags,
}: PostCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card href={`/blog/${slug}`} className="group">
      {coverImage && (
        <div className="mb-4 overflow-hidden rounded-md">
          <img
            src={`${coverImage}?w=800&h=400&fit=crop&auto=format`}
            alt={coverImageAlt || title}
            className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <div className="space-y-2">
        <time className="text-sm text-neutral-500" dateTime={publishedAt}>
          {formattedDate}
        </time>

        <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600">
          {title}
        </h3>

        <p className="text-neutral-600">{excerpt}</p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <span
                key={tag.slug}
                className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700"
              >
                {tag.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
