import re
import pandas as pd
from datetime import datetime

def extract_transactions(text):
    # Updated pattern to capture new date format and two amounts (cash back and charge amount)
    pattern = r'(\d{2} [a-z]{3} \d{4}) (\d{2}:\d{2}) (.*?) \$([\d\.]+) \$([\d\.]+)'
    transactions = re.findall(pattern, text.replace('\n', ' '), flags=re.DOTALL)
    
    transactions_data = []
    for transaction in transactions:
        date, time, description, cash_back, charge_amount = transaction
        # Convert date from "dd MMM yyyy" format to "dd/mm/yyyy"
        date = datetime.strptime(date, '%d %b %Y').strftime('%d/%m/%Y')
        
        # Append two separate records for cash back and charge amount
        if float(cash_back) > 0:
            transactions_data.append({
                'Date': date,
                'Description': description.strip(),
                'Amount': f'-${cash_back}',
                'Type': 'Cash Back'
            })
        if float(charge_amount) > 0:
            transactions_data.append({
                'Date': date,
                'Description': description.strip(),
                'Amount': f'${charge_amount}',
                'Type': 'Charge'
            })
    
    transactions_df = pd.DataFrame(transactions_data)
    
    # Convert 'Amount' to numeric after removing '$' and handling negative for cash back
    if not transactions_df.empty:
        transactions_df['Amount'] = pd.to_numeric(transactions_df['Amount'].replace(r'[\$,]', '', regex=True), errors='coerce')
    
    return transactions_df