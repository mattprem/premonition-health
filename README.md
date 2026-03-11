# Premonition Health Static Site

This repository now contains a static multi-page site intended for GitHub Pages hosting.

## Main files

- `index.html`
- `primary-care.html`
- `membership-pricing.html`
- `weight-loss.html`
- `meet-the-team.html`
- `contact.html`
- `faq.html`
- `patient-portal.html`
- `privacy-policy.html`
- `assets/css/styles.css`
- `assets/js/site.js`

## Local preview

Any static file server will work. For example:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

1. Push `main` to GitHub.
2. In GitHub repo settings, enable Pages from the root of the `main` branch.
3. After Pages is live, point the Wix-managed domain DNS records to the GitHub Pages target.
4. Add a `CNAME` file once the final custom domain is chosen.

## Notes

- The current contact form opens the visitor's email app instead of posting to a backend.
- The `src/` Wix files remain in the repository for reference during migration, but the static site lives at the repository root.
