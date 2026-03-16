/*
  tokens/typography.ts
  Author: Mirabelle Doiron

  Typography tokens and font loading.
  This file injects global CSS for typography:
     - @font-face declarations for IBM Plex Mono (400, 500, 700)
     - CSS custom properties for font family, size, weight, line height, letter spacing
     - .type-* utility classes used across all components

  Components should NOT import this file directly. 
  Instead, call injectTypography() once in the app entry point (e.g. index.tsx) to load the font and inject the CSS.
  This is because:
    - The font files are large and should be loaded as early as possible.
    - The CSS it injects is global and should only be injected once.
    - It’s simpler to manage the font loading and global CSS in one place.
    - removed import google font - as it is slower to load. 
*/

export const fontTokens = {
  family:               "'IBM Plex Mono', ui-monospace, Consolas, monospace",

  sizeBody:             '16px',
  sizeSubheader:        '18px',
  sizeHeader:           '24px',

  weightRegular:        '400',

  lineHeightHeader:     '24px',
  lineHeightSubheader:  '27px',
  lineHeightBody:       '24px',

  letterSpacingHeader:    '0',
  letterSpacingSubheader: '0',
  letterSpacingBody:      '0.32px',
} as const

export function injectTypography(): void {
  const style = document.createElement('style')
  style.textContent = `
    @font-face {
      font-family: 'IBM Plex Mono';
      src: url('/IBM_Plex_Mono/IBMPlexMono-Regular.ttf') format('truetype');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'IBM Plex Mono';
      src: url('/IBM_Plex_Mono/IBMPlexMono-Italic.ttf') format('truetype');
      font-weight: 400;
      font-style: italic;
      font-display: swap;
    }

    @font-face {
      font-family: 'IBM Plex Mono';
      src: url('/IBM_Plex_Mono/IBMPlexMono-Medium.ttf') format('truetype');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'IBM Plex Mono';
      src: url('/IBM_Plex_Mono/IBMPlexMono-MediumItalic.ttf') format('truetype');
      font-weight: 500;
      font-style: italic;
      font-display: swap;
    }

    @font-face {
      font-family: 'IBM Plex Mono';
      src: url('/IBM_Plex_Mono/IBMPlexMono-Bold.ttf') format('truetype');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'IBM Plex Mono';
      src: url('/IBM_Plex_Mono/IBMPlexMono-BoldItalic.ttf') format('truetype');
      font-weight: 700;
      font-style: italic;
      font-display: swap;
    }

    :root {
      --font-family:             ${fontTokens.family};
      --font-size-body:          ${fontTokens.sizeBody};
      --font-size-subheader:     ${fontTokens.sizeSubheader};
      --font-size-header:        ${fontTokens.sizeHeader};
      --font-weight-regular:     ${fontTokens.weightRegular};
      --line-height-header:      ${fontTokens.lineHeightHeader};
      --line-height-subheader:   ${fontTokens.lineHeightSubheader};
      --line-height-body:        ${fontTokens.lineHeightBody};
      --letter-spacing-header:   ${fontTokens.letterSpacingHeader};
      --letter-spacing-subheader:${fontTokens.letterSpacingSubheader};
      --letter-spacing-body:     ${fontTokens.letterSpacingBody};
    }

    .type-header {
      font-family:     var(--font-family);
      font-size:       var(--font-size-header);
      font-style:      normal;
      font-weight:     var(--font-weight-regular);
      line-height:     var(--line-height-header);
      letter-spacing:  var(--letter-spacing-header);
      color:           var(--content);
    }

    .type-subheader {
      font-family:     var(--font-family);
      font-size:       var(--font-size-subheader);
      font-style:      normal;
      font-weight:     var(--font-weight-regular);
      line-height:     var(--line-height-subheader);
      letter-spacing:  var(--letter-spacing-subheader);
      color:           var(--content);
    }

    .type-body {
      font-family:     var(--font-family);
      font-size:       var(--font-size-body);
      font-style:      normal;
      font-weight:     var(--font-weight-regular);
      line-height:     var(--line-height-body);
      letter-spacing:  var(--letter-spacing-body);
      color:           var(--content);
    }
  `
  document.head.appendChild(style)
}
