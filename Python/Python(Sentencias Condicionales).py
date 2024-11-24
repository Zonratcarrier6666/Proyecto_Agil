print('Sistema para calcular el promedia del alumno.')
nombre= input('Ingresa el nombre del alumno: ')

matematicas = int(input('Ingresa la calificacacion de '+nombre +' de Matematicas: '))
quimica = int(input('Ingresa la calificacacion de '+nombre +' de Quimica: '))
biologia = int(input('Ingresa la calificacacion de '+nombre +' de Biologia: '))

promedio = (matematicas + quimica + biologia) // 3

if promedio >= 7:   
        print('El alumno  ' + nombre +  ' Aprobo  regularmente el semestre, con un promedio de : ' ,promedio)
print('Fin.')
