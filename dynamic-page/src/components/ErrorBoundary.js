import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
     
      return (
        <div className="flex justify-center items-center min-h-screen bg-red-100">
          <h1 className="text-xl text-red-600 font-semibold">
            Something went wrong. Please try again later.
          </h1>
        </div>
      );
    }

  
    return this.props.children;
  }
}

export default ErrorBoundary;
