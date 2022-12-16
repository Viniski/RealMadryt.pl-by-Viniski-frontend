import { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
    };

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }    

    componentDidCatch(error, errrInfo) {
    }

    render() {
        if (this.state.hasError) {
            return <h1>Wystąpił jakiś problem</h1>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;