import os
import time
import subprocess

# Configurações
FILE_NAME = "database.json"

def check_setup():
    print("--- Verificando Ambiente ---")
    if not os.path.exists(FILE_NAME):
        print(f"❌ ERRO: O arquivo '{FILE_NAME}' não foi encontrado na pasta!")
        return False
    
    if not os.path.exists(".git"):
        print("❌ ERRO: Esta pasta não é um repositório Git. Você deu 'git init'?")
        return False
    
    print("✅ Tudo pronto para começar!")
    return True

def sync():
    print(f"🚀 [{time.strftime('%H:%M:%S')}] Vigiando {FILE_NAME}...")
    try:
        # Tenta adicionar o arquivo
        subprocess.run(["git", "add", FILE_NAME], check=True)
        # Tenta fazer o commit
        result = subprocess.run(["git", "commit", "-m", "update ranking"], capture_output=True, text=True)
        
        if "nothing to commit" in result.stdout:
            print("😴 Sem mudanças novas.")
        else:
            print("📤 Mudança detectada! Enviando para o GitHub...")
            subprocess.run(["git", "push"], check=True)
            print("✅ Atualizado!")
            
    except Exception as e:
        print(f"⚠️ Erro durante o processo: {e}")

if __name__ == "__main__":
    if check_setup():
        while True:
            sync()
            time.sleep(30)
    else:
        input("\nPressione Enter para fechar...")