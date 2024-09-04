import requests
import os
from dotenv import load_dotenv

# .env dosyasından API anahtarını yükle
load_dotenv()
API_KEY = os.getenv("your api key")

# API endpoint'i (bu örnek URL'dir, gerçek URL farklı olacaktır)
API_URL = "https://api.anthropic.com/v1/completions"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

data = {
    "prompt": "Merhaba, bu bir test mesajıdır.",
    "max_tokens_to_sample": 100,
    "model": "claude-v1"  # veya Anthropic'in önerdiği model adı
}

try:
    response = requests.post(API_URL, headers=headers, json=data)
    response.raise_for_status()  # HTTP hatalarını kontrol et
    
    if response.status_code == 200:
        result = response.json()  # JSON yanıtını parse et
        generated_text = result.get('completion', '')  # 'completion' alanını al, yoksa boş string döndür
        print("Oluşturulan Metin:", generated_text)
    else:
        print("Hata Kodu:", response.status_code)
        print("Hata Mesajı:", response.text)
except requests.exceptions.RequestException as e:
    print("API çağrısı sırasında bir hata oluştu:", e)