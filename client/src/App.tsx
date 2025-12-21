import { useEffect, useState } from 'react'

function App() {
    const [status, setStatus] = useState<string>("loading...");

    useEffect(() => {
        fetch("http://localhost:3000/health")
            .then((res) => res.json())
            .then((data) => setStatus(data.status))
            .catch(() => setStatus("error"));
    }, []);

    return (
        <div className="bg-red-500 p-10">
        <h1 className="text-3xl font-bold text-blue-600">
            Chess Platform
        </h1>
        <p>Backend status: {status}</p>
        </div>
        
    );
}

export default App;

