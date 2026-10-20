import { useState, useEffect } from 'react';

function TransactionApp() {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/transactions');
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error('Error al obtener las transacciones:', error);
        }
    };

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/transactions');
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error('Error al obtener las transacciones:', error);
            }
        };

        fetchTransactions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!amount || !description) return;

        if (Number(amount) <= 0) {
        alert("El monto de la transacción debe ser mayor a 0.");
        return;
    }

    const newTransaction = {
        amount: Number(amount),
        description
        };

        try {
            const response = await fetch('http://localhost:3000/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTransaction),
            });

            if (response.ok) {
                setAmount('');
                setDescription('');
                fetchTransactions();
            }
        } catch (error) {
            console.error('Error al guardar la transacción:', error);
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '600px' }}>
            <h2 className="mb-3 text-center">Gestor de Transacciones</h2>

            
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
                <div className="mb-3">
                    <label className="form-label">Monto de la Transacción:</label>
                    <input 
                        type="number" 
                        value={amount} 
                        className="form-control"
                        onChange={(e) => setAmount(e.target.value)} 
                        placeholder="Ej. 1500"
                        min="0.01"
                        step="any"
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Descripción:</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Ej. Compra de libros"
                        required 
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Registrar Transacción</button>
            </form>

            
            <h3 className="mb-3">Historial de Transacciones</h3>
            {transactions.length === 0 ? (
                <p className="text-muted">No hay transacciones registradas todavía.</p>
            ) : (
                <ul className="list-group">
                    {transactions.map((tx, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{tx.description}</span>
                            <span className="badge bg-success rounded-pill fs-6">${tx.amount}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TransactionApp;