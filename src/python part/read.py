import os
import re
import pypdf
import pandas as pd

# Function to print the content of a PDF document
def print_pdf_content(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = pypdf.PdfReader(file)
        for page_num in range(len(reader.pages)):
            print(f"Page {page_num + 1}:\n")
            page = reader.pages[page_num]
            page_text = page.extract_text()
            print(page_text)
            print("\n" + "#" * 100 + "\n")  # Print a separator between pages


# Now call the function to print the content of the document
print_pdf_content(r'C:\Users\isikb\OneDrive\Masaüstü\ekstreler\kk_hesap_ekstresi_mail.pdf')



import pypdf

# Step 1: Initialize and Read PDF
def read_pdf(file_path):
    print(f"\nProcessing file: {file_path}\n")
    text_content = []
    with open(file_path, 'rb') as file:
        pdf_reader = pypdf.PdfReader(file)  
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text_content.append(page.extract_text() if page.extract_text() else '')  # Handle None return
    return text_content

# Step 2: Concatenate and Preprocess Text
def preprocess_text(text_pages):
    full_text = ' '.join(text_pages)
    # Normalize text (e.g., remove excessive whitespace, lowercase)
    full_text = ' '.join(full_text.split()).lower()
    return full_text

# Main function to process the PDF
def process_pdf(file_path):
    print(f"\n==== Processing PDF: {file_path} ====\n")
    text_content = read_pdf(file_path)
    processed_text = preprocess_text(text_content)
    return processed_text


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


processed_text = process_pdf(r'C:\Users\isikb\OneDrive\Masaüstü\ekstreler\kk_hesap_ekstresi_mail.pdf')

import textwrap

wrapped_content = textwrap.fill(processed_text, width=100)  # Wrap content to 50 characters
print(f"Content (snippet):\n{wrapped_content}\n{'=' * 80}\n")


transactions_df = extract_transactions(processed_text)
print(transactions_df)
