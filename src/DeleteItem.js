import React, { useState } from 'react';
import axios from 'axios';

function DeleteItem() {
  const [itemId, setItemId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setItemId(e.target.value);
    setError(null); // Clear any previous errors when the input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Check if the item exists before making the delete request
      const response = await axios.get(`http://localhost:5000/items/${itemId}`);
      const itemExists = response.status === 200;

      if (itemExists) {
        await axios.delete(`http://localhost:5000/delete-item/${itemId}`);
        console.log('Item deleted successfully');
      } else {
        setError('Item not found');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Error deleting item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Delete an Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="itemId">Item ID:</label>
          <input type="text" id="itemId" value={itemId} onChange={handleChange} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Deleting...' : 'Delete Item'}
        </button>
      </form>
    </div>
  );
}

export default DeleteItem;


