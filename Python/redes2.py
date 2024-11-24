import socket
import subprocess

def obtener_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip_local = s.getsockname()[0]
        s.close()
        return ip_local
    except Exception as e:
        return f"Error obteniendo la IP: {e}"

def obtener_gateway():
    try:
        # Ejecutar el comando 'ipconfig' para obtener la puerta de enlace en Windows
        result = subprocess.run(['ipconfig'], capture_output=True, text=True)
        output = result.stdout
        
        print("Salida de 'ipconfig':\n", output)  # Imprimir la salida para depuración
        
        # Buscar la puerta de enlace
        gateway = "No se pudo obtener el gateway"
        lines = output.splitlines()
        for i, line in enumerate(lines):
            if 'Puerta de enlace predeterminada' in line or 'Default Gateway' in line:
                # Extraer el valor de la puerta de enlace
                if i + 1 < len(lines):
                    gateway = lines[i + 1].strip()
                    break
        return gateway
    except Exception as e:
        return f"Error obteniendo el gateway: {e}"

if __name__ == "__main__":
    ip = obtener_ip()
    gateway = obtener_gateway()
    print(f"Tu dirección IP es: {ip}")
    print(f"Tu gateway (puerta de enlace) es: {gateway}")
