""" 
LAS SENTENCIAS CONDICIONALES ANIDADAS

Se presentan cuando por el camino de verdadero o falso
de una sentencia condicional HAY OTRA SENTENCIA CONDICIONAL

Cuando trabajamos con sentencias condicionales SIMPLES, 
COMPUESTAS O MULTIPLES, podemos colocar dentro de la instruccion
a ejecutar de cada una de estas sentencias, OTRA SENTENCIA CONDICIONAL

"""
print('=========================')
print('Conversor')
print('=========================')
print('Menu de opciones: \n')

print("Presiona 1 para convertir numero a palabra. ")
print("Presiona 2 para convertir palabra a numero. ")

opcion = int(input('Cual es tu opcion deseada?'))

if opcion == 1:
    print("\n Conversor de numero a palabra. \n")
    opcion_uno = int(input("Cual es el numero que deseas convertir a palabra?: "))
    if opcion_uno == 1:
        print('El numero es UNO')
    elif opcion_uno ==2:
        print('El numero es DOS') 
    elif opcion_uno ==3:
        print('El numero es TRES') 
    elif opcion_uno ==4:
        print('El numero es CUATRO')
    elif opcion_uno ==5:
        print('El numero es CINCO')  
elif opcion == 2:
    print("\n Conversor de palabra a numero \n")
    opcion_dos = input("Cual es el palabra que deseas convertir a numero?: ")
    opcion_dos = opcion_dos.lower()
    if opcion_dos == "uno":
        print('El numero es 1 ')
    elif opcion_dos == "dos":
        print('El numero es 2 ')
    elif opcion_dos == "tres":
        print('El numero es 3 ')
    elif opcion_dos == "cinco":
        print('El numero es 5 ')
    else:
        print('La opcion no esta disponible')
else:
    print('Opcion no disponible')