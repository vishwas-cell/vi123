#!/bin/bash

# Start development servers (Frontend + Backend)
echo "🚀 Starting Portfolio Development Servers"
echo "========================================="
echo ""

# Check if node_modules exist
if [ ! -d "node_modules" ]; then
  echo "📦 Installing frontend dependencies..."
  npm install
fi

if [ ! -d "backend/node_modules" ]; then
  echo "📦 Installing backend dependencies..."
  cd backend && npm install && cd ..
fi

echo ""
echo "✅ All dependencies installed!"
echo ""
echo "🎨 Frontend: http://localhost:5173"
echo "⚙️ Backend:  http://localhost:5000"
echo ""
echo "Starting servers..."
echo ""

# Start frontend in background
npm run dev &
FRONTEND_PID=$!

# Start backend in background
cd backend && npm start &
BACKEND_PID=$!

echo ""
echo "✨ Both servers running!"
echo "Press Ctrl+C to stop"
echo ""

# Wait for interruption
wait
