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