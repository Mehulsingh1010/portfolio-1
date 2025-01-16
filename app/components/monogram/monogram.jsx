import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="96"  // Increased size
      height="58" // Increased size
      viewBox="0 0 64 64"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M0 0h6.5a6 6 0 0 1 5.2 3.1L19.4 17l4-9L19 0h6.5a6 6 0 0 1 5.2 3.1L39.5 19 35 29 24.5 10 16 29 0 0Zm46.7 2.8A2 2 0 0 0 45 0h-7l5.5 10 3.2-7.2Z" />
        </clipPath>
      </defs>

      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
      <g transform="rotate(180 32 32)">
        {/* Updated to dynamically change color based on the theme */}
        <path
          id="favicon"
          d="M3.03 14h7.8a7.24 7.24 0 0 1 6.34 3.74l9.25 16.78 4.87-10.86L25.97 14h7.79a7.24 7.24 0 0 1 6.34 3.74l10.59 19.2L45.28 49 32.62 26.07 22.34 49 3.04 14Zm56.41 3.4a2.4 2.4 0 0 0-2.2-3.4H48.9l6.66 12.07 3.88-8.67Z"
          // This makes the logo color follow the current text color (theme-based)
        />
      </g>
    </svg>
  );
});
