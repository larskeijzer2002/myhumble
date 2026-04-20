#!/bin/zsh

set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

echo ""
echo "My Humble publish workflow gestart..."
echo ""

if ! command -v git >/dev/null 2>&1; then
  echo "Git is niet beschikbaar op deze Mac."
  echo ""
  read "?Druk op Enter om af te sluiten..."
  exit 1
fi

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo main)"
TIMESTAMP="$(date '+%Y-%m-%d %H:%M')"
COMMIT_MESSAGE="Publish update ${TIMESTAMP}"

echo "Branch: $CURRENT_BRANCH"
echo "Project: $PROJECT_DIR"
echo ""

if command -v ~/Library/pnpm/pnpm >/dev/null 2>&1; then
  echo "Build controleren..."
  ~/Library/pnpm/pnpm build
  echo ""
else
  echo "pnpm niet gevonden, buildcontrole wordt overgeslagen."
  echo ""
fi

git add -A

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Nieuwe wijzigingen gevonden. Commit wordt gemaakt..."
  git commit -m "$COMMIT_MESSAGE"
  echo ""
else
  echo "Geen nieuwe wijzigingen gevonden. Alleen push wordt geprobeerd."
  echo ""
fi

echo "Pushing naar GitHub..."
git push origin "$CURRENT_BRANCH"
echo ""
echo "Klaar. De wijzigingen staan nu op GitHub."
echo "Vercel zal daarna automatisch een nieuwe deploy starten."
echo ""

read "?Druk op Enter om af te sluiten..."
