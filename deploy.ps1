# Retrieve the latest changes
# git pull

# Build the Angular app
npm ci
ng build --base-href="moving-list" --output-path="docs/"

# Push the new changes to GitHub
git add docs/
git commit -m "Update GitHub page's content"
# git push
