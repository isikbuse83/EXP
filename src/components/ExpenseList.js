
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetExpenses } from '../services/expenses';
import { Button, Row, Col } from 'react-bootstrap';
import ExpenseForm from './ExpenseForm';

const ExpenseList = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses.expenses);
  console.log('expenses:', expenses);

  useEffect(() => {
    console.log('Dispatch function:', dispatch);
    GetExpenses(dispatch);
  }, [dispatch]); 

  return (
    <div>
      {expenses.length > 0 ? (
        expenses.map(expense => (
          <div key={expense.id} style={{ marginBottom: '20px' }}>
            <ListRow expense={expense} />
          </div>
        ))
      ) : (
        <p>Henüz gider bulunmuyor.</p>
      )}
    </div>
  );
}

const ListRow = ({ expense }) => {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing 
    ? <ExpenseForm expense={expense} setIsEditing={setIsEditing} />
    : (
      <div>
        <Row>
          <Col>{expense.description}</Col>
          <Col>₺{expense.amount}</Col>
          <Button variant="warning" onClick={() => setIsEditing(!isEditing)}>
            Edit
          </Button>
        </Row>
        <hr />
      </div>
    );
}

export default ExpenseList;
