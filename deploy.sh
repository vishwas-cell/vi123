#!/bin/bash

# Portfolio Deployment Quick Setup Script
# This script helps you prepare your project for deployment

echo "🚀 Portfolio Deployment Setup"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "📦 Initializing Git repository..."
  git init
  echo "✅ Git initialized"
else
  echo "✅ Git already initialized"
fi

echo ""
echo "📝 Next steps:"
echo "1. Create a GitHub account if you don't have one"
echo "2. Create a new repository named 'portfolio'"
echo "3. Run these commands:"
echo ""
echo "   git add ."
echo "   git commit -m 'Portfolio with chat and all features'"
echo "   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. Go to https://vercel.com and deploy!"
echo ""
echo "📚 See DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""
echo "✨ Your portfolio will be live in minutes!"
