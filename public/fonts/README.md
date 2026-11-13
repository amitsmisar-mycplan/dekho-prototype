# Bundled fonts

App typography uses `next/font/local`, so production builds do not fetch Google Fonts CSS or parse remote font URLs. The fonts remain Bricolage Grotesque, Inter and Mukta. Existing TTF files continue to serve social-card rendering.

WOFF2 sources are the Google Fonts repository (`https://github.com/google/fonts/tree/main/ofl`):

- `bricolagegrotesque/BricolageGrotesque[opsz,wdth,wght].ttf`
- `inter/Inter[opsz,wght].ttf`
- `mukta/Mukta-Regular.ttf` and `mukta/Mukta-SemiBold.ttf`

Bricolage keeps its weight axis (200–800), with optical size 14 and width 100 pinned. Inter keeps weights 100–900, with optical size 14 pinned. Their web subsets retain Latin/Latin Extended, common punctuation, currency (including ₹), arrows and symbols. Mukta retains full Devanagari/Latin coverage and is not preloaded. Conversion used temporary FontTools/Brotli tooling outside the app; no runtime or build dependency was added. SIL OFL licences are included beside the fonts.

To update these assets, download the upstream TTFs, instantiate the non-weight axes as above, subset the Latin fonts, and save WOFF2. Commit the resulting assets and licences; never fetch them during deployment.
