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
print_pdf_content(r'C:\Users\isikb\OneDrive\Masaüstü\ekstreler\2024 Şubat ayı hesap özetiniz.pdf')