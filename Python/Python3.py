#Primera Parte
print("Uso de operador +=")
mensaje ="Hola"
mensaje+=" "
mensaje+="Angel"
print(mensaje)

"""
El Opredado de += se puede usar para concatenar el nombre
por lo que el valor mensaje tiene un valor de "Hola" y en
la segunda asignacion de variables al usar e; =+ tomara el
Hola mas el espacio Quedaria Hola(spacio), y en las segunda
asignacion le estamos agregando el nombre de Angel, lo que 
dara como resultado o quedara como como valor mensaje de la 
variable mensaje "Hola Angel".  

"""
#Segunda parte
print("Concatenacion simple")
mensaje = "Hola"
espacio = " "
nombre = "Angel2"
print (mensaje+espacio+nombre)


numero_uno= 4
numero_dos = 6
resultado = numero_uno+numero_dos
resultado = str(resultado)
print("El resultado d ela suma es: " + resultado)

"""
el comando es un str el indica que estamos convirtiendo un valor
numerico a un valo string por lo que si no lo hacemos asi nos genera 
un problema ya que al imprimirlo estamos juntado valores de tipo string 
con valores numericos lo cual esto no es posible

"""

#Parte 3
print("Uso del metodo de find")
mensaje = "Hola Angel"
buscar_subcadena= mensaje.find("Angel")
print (buscar_subcadena)

"""
El metodo predefinido en el lenguaje d ePython llamado y utilizado en Pythin
"find" hace la busqueda de cadenas, pro en la forma que se utiliza en ela tercera parte 
se usa para encontrar la letra "A" ya qie es lo principal que encuntra, y ademas indica een la posicion


H o l a   A n g e l
^ ^ ^ ^ ^ ^ ^ ^ ^ ^
0 1 2 3 4 5 6 7 8 9
"""

#Cuarta Parte
mensaje="Hola Angel"
extraer_subcadena2 = mensaje[1:8]
print(extraer_subcadena2)

"""
Las EXTRACCIONES em phyoton se hacen usando corchetes [] y colocando un punto de u=inicio y un punto final,
Como se muestra en el ejemplo del [1:8] se imprimiran esos calacteres
ose imprimira esto 

o l a   A n g
^ ^ ^ ^ ^ ^ ^ 
1 2 3 4 5 6 7 
"""

#Quita parte 

print("Operador de comparacion ==")
mensaje_uno = "Hola"
mensaje_dos = "Hola"
print(mensaje_dos == mensaje_uno)