<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# create me an instructional md for my coding assistant to pick up where you have left off,

Below is an `INSTRUCTIONS.md` you can drop into your repo for another coding assistant to continue the Digital Khalsa project.

***

# INSTRUCTIONS.md — Digital Khalsa Coding Assistant

## 1. Role and goals

You are an AI coding assistant joining an in-progress project called **Digital Khalsa**, an online, geo-optimized directory of resources for the Sikh community.
Your primary goals:

- Implement a fast, accessible web app that:
    - Curates Sikh resources (sites, tools, orgs, media) in a structured directory.
    - Supports geo-optimized content so users in different regions see relevant resources first.
- Keep the codebase clean, well-documented, and easy to extend.

When in doubt, prioritize: correctness → clarity → performance → cleverness.

***

## 2. Current product vision (high level)

- Digital Khalsa is a **curated directory**, not just a raw link dump.
- Each resource should have structured metadata, including (at minimum):
    - Title, description, URL
    - Category (e.g., Gurbani, Learning, Kids, Advocacy, Media)
    - Audience (e.g., beginner, advanced, kids, parents, educators, researchers)
    - Geo relevance (global, country, region, or city tags)
    - Languages available (e.g., en, pa, hi, etc.).
- The site should be **geo-optimized**:
    - Users in different regions see locally relevant resources and pages prioritized.
    - Search engines understand which pages/sections are for which language/region (international/geo SEO best practices).[^1][^2]

***

## 3. Architecture \& stack (to be confirmed / updated)

If a stack already exists in this repo, follow it. Otherwise, default recommendations:

- Frontend framework: a modern JS framework (e.g., Next.js / React) with SSR or SSG.
- Styling: Tailwind CSS or an equivalent utility-based system.
- Data:
    - Start with a static JSON / YAML / MDX dataset for resources.
    - Plan for later migration to a DB (e.g., Postgres with Prisma) if needed.
- Internationalization / localization (i18n): use framework-native i18n where possible.
- SEO:
    - Semantic HTML, clean URLs, meta tags per page.
    - Support for hreflang and canonical tags for localized pages.[^3][^4]

When modifying architecture, explain decisions in comments or in `docs/architecture-notes.md` if present.

***

## 4. Geo-optimization requirements

Implement and refine geo-optimization with the following constraints:

1. **URL structure**
    - Use language/region-aware subpaths, for example:
        - `/en/` for global English
        - `/pa/` for Punjabi
        - Optional region-specific variants such as `/en-uk/`, `/en-ca/` if needed later.[^5][^6]
    - Mirror the same directory structure across locales (e.g., `/en/resources/gurbani`, `/pa/resources/gurbani`) so pages are clearly related.[^2][^7]
2. **Localized content and metadata**
    - For core pages (homepage, major categories, “about”, and key landing pages), create localized copies with:
        - Localized titles, meta descriptions, headings.
        - Geo terms where appropriate (e.g., “Sikh resources in Canada”).[^8][^9]
    - Content should respect spiritual/ethical context while being region-specific in examples and links.
3. **Technical SEO**
    - Implement **hreflang tags** between language/region variants with an `x-default` global version.[^4][^3]
    - Ensure canonical URLs are set correctly and consistent across localized versions.[^10][^5]
    - Avoid auto-redirecting purely by IP; instead, suggest local versions with a non-intrusive banner.[^1][^4]
4. **UX for geo**
    - Provide a visible language/region switcher in the header (or top-level nav) that:
        - Reflects the current locale.
        - Allows switching locale while staying on a related page when possible.[^11][^5]
    - If any geolocation is used:
        - Use it only to suggest a locale, never to hard-force.
        - Respect and persist the user’s manual choice (cookie/localStorage).[^4][^1]

***

## 5. Data model for resources

Design and maintain a resource schema along these lines (adjust to match actual code):

```ts
type Audience =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'kids'
  | 'parents'
  | 'educators'
  | 'researchers';

type Category =
  | 'gurbani'
  | 'learning'
  | 'kids_family'
  | 'advocacy'
  | 'media'
  | 'history_archives'
  | 'community_services';

type RegionScope =
  | 'global'
  | 'country'
  | 'region'
  | 'city';

interface GeoTag {
  scope: RegionScope;
  countryCode?: string;  // e.g., 'IN', 'CA'
  regionCode?: string;   // e.g., 'ON', 'PB'
  city?: string;         // e.g., 'Toronto'
}

interface Resource {
  id: string;
  title: string;
  url: string;
  description: string;
  category: Category;
  audience: Audience[];
  languages: string[];   // e.g., ['en', 'pa']
  geoTags: GeoTag[];     // one or more, including 'global'
  isOfficial?: boolean;  // optionally mark verified/trusted
  active?: boolean;      // soft delete / deprecation flag
}
```

Core requirements:

- Every resource has at least one `geoTags` entry (`global` if nothing else).
- Search / filter UI should let users filter by category, audience, language, and geo (where data is available).
- Keep data in a single source of truth (e.g., `/data/resources.json`).

***

## 6. Coding style and quality

- Prefer small, focused components and functions.
- TypeScript is preferred if the stack supports it.
- Add basic tests (unit/integration) for:
    - URL/locale resolution logic.
    - Hreflang/canonical generation.
    - Filtering logic for geo + category + audience.

When generating code:

- Include concise docstrings or comments only where logic is non-obvious.
- Avoid large, monolithic functions.
- Favor explicitness over magic.

***

## 7. How to work with this file

When future changes are made, the coding assistant should:

1. Read this file and any `README` / `ARCHITECTURE` docs before major changes.
2. When implementing a feature, briefly describe:
    - What changed
    - Why it changed
    - Any follow-up TODOs
in either commit messages or a short section inside `docs/ACTIVE.md` (if present).[^12]
3. Leave `TODO:` comments in code where further human review or domain decisions are needed.

***

## 8. What to prioritize next (suggested)

For the next assistant session, suggested next steps:

1. Implement or refine the **resource schema** and seed data file(s).
2. Implement a basic **resources listing page** with filters (category, audience, language, geo).
3. Add **locale-aware routing** and a simple **language/region switcher**.
4. Implement **hreflang/canonical tag generation** for localized pages.[^2][^3]
5. Add minimal tests for routing, hreflang logic, and filtering.

***

End of `INSTRUCTIONS.md`.
<span style="display:none">[^13][^14][^15][^16][^17][^18][^19][^20][^21][^22][^23][^24][^25][^26][^27][^28][^29][^30][^31]</span>

<div align="center">⁂</div>

[^1]: https://geotargetly.com/blog/geo-targeting-seo

[^2]: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites

[^3]: https://www.digitalauthority.me/resources/localize-seo-content-with-hreflang-tags/

[^4]: https://developers.google.com/search/docs/specialty/international/localized-versions

[^5]: https://error404.atomseo.com/blog/multiregional-seo

[^6]: https://www.aumcore.com/blog/seo-guide-for-multi-regional-and-multilingual-sites/

[^7]: https://lingohub.com/blog/seo-for-multilingual-websites

[^8]: https://www.infidigit.com/blog/what-is-geo-targeting/

[^9]: https://leadorigin.com/geo-targeting-seo/

[^10]: https://geotargetly.com/blog/hreflang-tag-seo-guide

[^11]: https://www.composite.global/news/international-seo-in-webflow

[^12]: https://www.linkedin.com/pulse/emerging-practice-ai-assisted-coding-persistent-prompt-jessica-kerr-r4wec

[^13]: https://docs.continue.dev/customize/deep-dives/prompts

[^14]: https://dev.to/anita_ihuman/the-ideal-way-to-prompt-your-ai-coding-assistant-for-90-accuracy-1f09

[^15]: https://community.openai.com/t/sourcing-useful-chatgpt-coding-prompts-to-feature/1357452

[^16]: https://addyo.substack.com/p/the-prompt-engineering-playbook-for

[^17]: https://figr.design/blog/developer-handoff-playbook-tools-templates-and-best-practices-for-cross-functional-teams

[^18]: https://learnprompting.org/docs/basics/prompt_structure

[^19]: https://www.reddit.com/r/ChatGPTPromptGenius/comments/13ay19l/coding_assistant_prompt/

[^20]: https://zuplo.com/learning-center/document-apis-with-markdown

[^21]: https://www.reddit.com/r/PromptEngineering/comments/1nk83di/the_perfect_structure_for_ai_coding_prompts/

[^22]: https://www.reddit.com/r/ChatGPTCoding/comments/1gbvtmg/my_custom_instructions_for_coding_and_anything/

[^23]: https://www.figma.com/community/file/1317913991345518184/developer-handoff-file-template

[^24]: https://aimaker.substack.com/p/the-10-step-system-prompt-structure-guide-anthropic-claude

[^25]: https://prpm.dev/blog/continue-deep-dive

[^26]: https://daily.dev/blog/5-best-documentation-templates-for-developer-guides

[^27]: https://cline.bot/blog/system-prompt

[^28]: https://leaddev.com/software-quality/7-prompting-strategies-to-sharpen-your-ai-assisted-code

[^29]: https://www.reddit.com/r/technicalwriting/comments/1kx98cp/do_you_use_git_and_markdown_in_your_documentation/

[^30]: https://platform.openai.com/docs/guides/prompt-engineering

[^31]: https://pub.towardsai.net/the-prompts-i-actually-use-to-code-with-ai-assistants-a442597bd6c0

