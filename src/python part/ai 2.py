import os
import sys
import json
import logging
from anthropic import Client  # Anthropic istemcisi için gereken kütüphaneyi import ediniz



logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def call_anthropic_api(content):
    logger.info("API anahtarı ortam değişkeninden yükleniyor...")
    api_key = os.environ.get("REACT_APP_CLAUDE_AI_API_KEY")
    if not api_key:
        error_message = "API anahtarı bulunamadı. REACT_APP_CLAUDE_AI_API_KEY ortam değişkeni olarak ayarlandığından emin olun."
        logger.error(error_message)
        return json.dumps({"error": error_message})
    
    logger.info("API anahtarı başarıyla yüklendi.")
    logger.info("Anthropic istemcisi başlatılıyor...")
    client = Client(api_key=api_key)
    logger.info("Anthropic istemcisi başlatıldı.")
    logger.info(f"Anthropic API'ye şu içerikle mesaj gönderiliyor: {content}")
    
    try:
        message = client.messages.create(
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": content,
                }
            ],
            model="claude-3-5-sonnet-20240620",
        )
        logger.info("Anthropic API'den mesaj alındı.")
        
        # Yanıttan metin içeriğini ayıklama
        raw_response = message.content
        logger.info(f"Anthropic API'den gelen ham yanıt: {raw_response}")
        if "text=" in raw_response:
            text_start = raw_response.find("text=") + len("text=")
            text_end = raw_response.find(",", text_start)
            extracted_text = raw_response[text_start:text_end]
        else:
            extracted_text = "Metin içeriği ayıklanamadı."
        
        response_data = {
            "content": extracted_text
        }
        return json.dumps(response_data)
    
    except Exception as e:
        error_message = f"Anthropic API ile iletişimde bir hata oluştu: {e}"
        logger.error(error_message)
        return json.dumps({"error": error_message})

if __name__ == "__main__":
    logger.info("Script başlatıldı.")
    if len(sys.argv) < 2:
        error_message = "Kullanım: python anthropic_api_script.py <message_content>"
        logger.error(error_message)
        print(json.dumps({"error": error_message}))
        sys.exit(1)
    
    content = sys.argv[1]
    logger.info(f"Gelen içerik: {content}")
    result = call_anthropic_api(content)
    logger.info(f"API çağrı sonucu: {result}")
    print(result)




# bu kodu tanımlanmış mı anahtarımız kontrol etmek için kullandık eğer none aldıysan tanımlanmamıştır 
# import os
# print(os.getenv('ANTHROPIC_API_KEY'))

