#!/bin/bash

echo "🚀 Resume Creator Deployment Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Build the application
echo "📦 Building the application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ Build completed successfully!"

# Ask user for deployment preference
echo ""
echo "Choose your deployment method:"
echo "1) Vercel (Recommended - Easiest)"
echo "2) Netlify"
echo "3) GitHub Pages"
echo "4) Just build (no deploy)"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "🚀 Deploying to Vercel..."
        if ! command -v vercel &> /dev/null; then
            echo "📥 Installing Vercel CLI..."
            npm install -g vercel
        fi
        vercel --prod
        ;;
    2)
        echo "🌐 Deploying to Netlify..."
        if ! command -v netlify &> /dev/null; then
            echo "📥 Installing Netlify CLI..."
            npm install -g netlify-cli
        fi
        netlify deploy --prod --dir=build
        ;;
    3)
        echo "📚 Deploying to GitHub Pages..."
        echo "⚠️  Make sure you've:"
        echo "   - Created a GitHub repository"
        echo "   - Updated the homepage URL in package.json"
        echo "   - Pushed your code to GitHub"
        echo ""
        read -p "Continue with GitHub Pages deployment? (y/n): " confirm
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            npm run deploy
            echo "✅ Deployed to GitHub Pages!"
            echo "🔗 Your site will be available at: https://yourusername.github.io/MyResumeCreator"
        fi
        ;;
    4)
        echo "✅ Build completed. Ready for manual deployment."
        echo "📁 Your build files are in the 'build' directory."
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo "📖 Check DEPLOYMENT.md for detailed instructions and troubleshooting." 