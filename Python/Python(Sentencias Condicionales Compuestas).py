print('Sistema para calcular el promedia del alumno.')
nombre= input('Ingresa el nombre del alumno: ')

matematicas = float(input('Ingresa la calificacacion de '+nombre +' de Matematicas: '))
quimica = float(input('Ingresa la calificacacion de '+nombre +' de Quimica: '))
biologia = float(input('Ingresa la calificacacion de '+nombre +' de Biologia: '))

promedio = (matematicas + quimica + biologia) / 3

if promedio >= 7:   
        print('El alumno  ' + nombre +  ' Aprobo  regularmente el semestre, con un promedio de : ' ,promedio)
        print('El alumno  ' + nombre +  ' Aprobo  regularmente el semestre, con un promedio de : ' ,round(promedio,2))
else :
    print("Lo sentimos " + nombre  + ' Has reprobado con un promedio de: ', promedio )
    print("Lo sentimos " + nombre  + ' Has reprobado con un promedio de: ', round(promedio,2))
    
print("Fin.")