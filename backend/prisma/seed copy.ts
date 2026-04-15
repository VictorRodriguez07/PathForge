INSERT INTO concepts (
  id, name, slug, level, description, "whyMatters", explanation,
  "codeExample", "practicalTips", "commonMistakes", resources, "subjectId"
) VALUES

(
  gen_random_uuid(),
  'Python: filosofía, instalación y primeros pasos',
  'python-philosophy-and-setup',
  'BEGINNER',
  'Entiende qué es Python, por qué se diseñó así, cómo instalarlo correctamente y cómo ejecutar tu primer programa.',
  'Python tiene una filosofía de diseño explícita que influye en cómo se escribe código. Conocerla desde el inicio te ahorra malos hábitos y te explica por qué la comunidad prefiere ciertas formas de hacer las cosas sobre otras.',
  'Python es un lenguaje de programación de propósito general creado por Guido van Rossum y publicado en 1991. Su diseño prioriza la legibilidad del código: la idea central es que el código se lee muchas más veces de las que se escribe, por lo tanto debe ser claro antes que compacto.

La filosofía de Python está resumida en un documento llamado PEP 20, conocido como "The Zen of Python". Algunos de sus principios más relevantes son:
- Explícito es mejor que implícito.
- Simple es mejor que complejo.
- La legibilidad cuenta.
- Debe haber una, y preferiblemente solo una, manera obvia de hacer las cosas.

Puedes leer este documento ejecutando import this en cualquier intérprete de Python.

Python es un lenguaje interpretado, lo que significa que el código se ejecuta línea por línea sin necesidad de compilar. Esto hace que el ciclo de desarrollo sea rápido: escribes, ejecutas, ves el resultado de inmediato.

INSTALACIÓN

La forma recomendada es descargar Python desde python.org. Durante la instalación en Windows, marca la opción "Add Python to PATH" para poder ejecutarlo desde la terminal.

Verifica la instalación:

  python --version

En macOS y Linux, es posible que el sistema ya tenga Python instalado, pero generalmente es una versión antigua. Se recomienda instalar la versión más reciente con el instalador oficial o con un gestor como pyenv.

ENTORNOS VIRTUALES

Python instala paquetes de forma global por defecto. Esto genera conflictos cuando distintos proyectos necesitan versiones diferentes del mismo paquete. La solución son los entornos virtuales: carpetas aisladas que contienen su propia instalación de Python y sus propios paquetes.

  python -m venv nombre_del_entorno

Activas el entorno antes de trabajar en el proyecto y desactivas cuando terminas. Esto es una práctica estándar en cualquier proyecto Python profesional.

EL INTÉRPRETE INTERACTIVO (REPL)

Al escribir python en la terminal sin argumentos, se abre el REPL (Read-Eval-Print Loop). Es un entorno interactivo donde puedes escribir código y ver el resultado inmediatamente. Es ideal para explorar, probar ideas y aprender.',
  '# Verificar la versión instalada
python --version

# Abrir el intérprete interactivo
python

# Dentro del intérprete, leer la filosofía de Python
import this

# Salir del intérprete
exit()

# Crear un entorno virtual llamado venv
python -m venv venv

# Activar el entorno virtual (Windows)
venv\Scripts\activate

# Activar el entorno virtual (macOS / Linux)
source venv/bin/activate

# Verificar que el entorno está activo (el prompt cambia)
# (venv) usuario@maquina:~$

# Desactivar el entorno virtual
deactivate

# Crear y ejecutar el primer archivo
# archivo: hola.py
print("Hola, mundo")

# Ejecutar desde la terminal
python hola.py',
  ARRAY[
    'Usa siempre un entorno virtual por proyecto. Es un hábito que te evitará conflictos de dependencias desde el primer día.',
    'El REPL es tu mejor herramienta de aprendizaje. Antes de escribir código en un archivo, prueba la idea en el intérprete para ver el resultado de inmediato.',
    'Lee el Zen of Python (import this) una vez por semana durante el primer mes. Con el tiempo, sus principios se vuelven intuición.',
    'Instala la extensión de Python para VS Code. Ofrece autocompletado, detección de errores en tiempo real y ejecución directa desde el editor.'
  ],
  ARRAY[
    'No agregar Python al PATH durante la instalación en Windows. Resulta en que la terminal no reconoce el comando python.',
    'Instalar paquetes globalmente sin activar un entorno virtual. A medida que acumulas proyectos, los conflictos de versiones se vuelven inevitables.',
    'Confundir Python 2 con Python 3. Python 2 llegó a su fin de vida en 2020 y no debe usarse en proyectos nuevos. Verifica siempre que estás usando Python 3.',
    'Nombrar el archivo del proyecto python.py. Python intenta importar su propio módulo estándar y falla de forma confusa.'
  ],
  '[{"type":"article","title":"The Zen of Python (PEP 20)","url":"https://peps.python.org/pep-0020/"},{"type":"article","title":"Python.org - Downloads","url":"https://www.python.org/downloads/"},{"type":"article","title":"Python Virtual Environments: A Primer","url":"https://realpython.com/python-virtual-environments-a-primer/"}]'::jsonb,
  'a1e56981-d263-463b-a35d-a5f1380d8f00'
),

(
  gen_random_uuid(),
  'Tipos, variables, operadores y strings',
  'python-types-variables-operators-strings',
  'BEGINNER',
  'Aprende cómo Python maneja los datos: qué tipos existen, cómo se declaran variables, qué operadores hay disponibles y cómo trabajar con texto.',
  'Toda aplicación, sin importar su complejidad, se reduce a manipular datos. Entender los tipos de datos y cómo operar con ellos es el vocabulario básico del lenguaje. Sin esto, nada de lo demás tiene sentido.',
  'VARIABLES Y TIPADO DINÁMICO

En Python, una variable es un nombre que apunta a un valor. No se declara el tipo de la variable: Python lo infiere automáticamente según el valor asignado. Esto se llama tipado dinámico.

  nombre = "Ana"
  edad = 28
  activo = True

Python es también un lenguaje de tipado fuerte: aunque no declares el tipo, Python no mezcla tipos de forma silenciosa. Sumar un número con un texto genera un error, no un resultado inesperado.

TIPOS PRIMITIVOS

Los tipos de datos fundamentales en Python son:

- int: números enteros, sin límite de tamaño. Ejemplos: 0, 42, -7
- float: números con decimales. Ejemplos: 3.14, -0.5, 2.0
- bool: valores lógicos. Solo puede ser True o False. Internamente, True es 1 y False es 0.
- str: cadenas de texto, siempre entre comillas simples o dobles.
- NoneType: el tipo del valor especial None, que representa la ausencia de valor.

Puedes verificar el tipo de cualquier valor con la función type():
  type(42)      # <class int>
  type("hola")  # <class str>

OPERADORES

Aritméticos: + - * / // % **
  - / siempre devuelve float aunque dividas enteros.
  - // es la división entera (descarta decimales).
  - % es el módulo (resto de la división).
  - ** es la potencia.

De comparación: == != > < >= <=
Devuelven True o False.

Lógicos: and, or, not
Operan sobre valores booleanos o cualquier valor que Python pueda interpretar como verdadero o falso.

De asignación: = += -= *= /= //= %= **=

STRINGS EN DETALLE

Los strings son inmutables: no puedes modificar un carácter dentro de un string existente, solo crear uno nuevo.

Operaciones esenciales:
- Concatenación: "hola" + " mundo"
- Repetición: "ab" * 3 → "ababab"
- Longitud: len("texto")
- Indexación: "texto"[0] → "t"
- Slicing: "texto"[1:4] → "ext"
- Métodos: .upper(), .lower(), .strip(), .replace(), .split(), .startswith(), .endswith()

F-STRINGS (CADENAS FORMATEADAS)

Introducidos en Python 3.6, los f-strings son la forma moderna y recomendada de insertar variables dentro de un string:

  nombre = "Ana"
  edad = 28
  print(f"Me llamo {nombre} y tengo {edad} años")

Puedes incluir expresiones dentro de las llaves:
  print(f"El doble de mi edad es {edad * 2}")',
  '# Tipos básicos
entero = 42
decimal = 3.14
texto = "Python"
activo = True
nada = None

print(type(entero))   # <class int>
print(type(decimal))  # <class float>
print(type(texto))    # <class str>
print(type(activo))   # <class bool>
print(type(nada))     # <class NoneType>

# Operadores aritméticos
print(10 / 3)    # 3.3333... (float)
print(10 // 3)   # 3 (entero)
print(10 % 3)    # 1 (resto)
print(2 ** 8)    # 256 (potencia)

# Operadores de comparación
print(5 > 3)     # True
print(5 == 5.0)  # True (mismo valor, distinto tipo)
print(5 != 3)    # True

# Operadores lógicos
print(True and False)  # False
print(True or False)   # True
print(not True)        # False

# Strings: indexación y slicing
lenguaje = "Python"
print(lenguaje[0])     # P
print(lenguaje[-1])    # n (índice negativo: desde el final)
print(lenguaje[0:3])   # Pyt
print(lenguaje[::-1])  # nohtyP (invertido)

# Métodos de string
frase = "  hola mundo  "
print(frase.strip())          # "hola mundo"
print(frase.strip().upper())  # "HOLA MUNDO"
print("hola mundo".split())   # ["hola", "mundo"]
print("hola".replace("l","r")) # "hora"

# F-strings
nombre = "Ana"
edad = 28
print(f"Me llamo {nombre} y tengo {edad} años.")
print(f"El año que viene tendré {edad + 1}.")',
  ARRAY[
    'Usa f-strings para todo lo que involucre insertar variables en texto. Son más legibles y eficientes que la concatenación con +.',
    'El slicing tiene la forma [inicio:fin:paso]. El fin es exclusivo. Aprende esto bien porque aplica también a listas.',
    'None no es lo mismo que False, 0 o una cadena vacía. Son valores distintos aunque en contextos booleanos todos se evalúen como falso.',
    'Usa la función repr() para ver la representación exacta de un string, incluyendo caracteres especiales. Es útil para depuración.'
  ],
  ARRAY[
    'Usar == para comparar con None. La forma correcta y recomendada es usar is None, porque None es un objeto único en Python.',
    'Confundir / con //. La división simple siempre produce float en Python 3, lo que sorprende a quienes vienen de otros lenguajes.',
    'Intentar modificar un carácter de un string directamente: texto[0] = "H" genera un TypeError porque los strings son inmutables.',
    'Olvidar que los índices empiezan en 0. El primer carácter de "Python" es "P" en la posición 0, no en la 1.'
  ],
  '[{"type":"article","title":"Python Data Types","url":"https://docs.python.org/3/library/stdtypes.html"},{"type":"article","title":"Python f-strings (PEP 498)","url":"https://peps.python.org/pep-0498/"},{"type":"article","title":"Real Python - Strings and Character Data","url":"https://realpython.com/python-strings/"}]'::jsonb,
  'a1e56981-d263-463b-a35d-a5f1380d8f00'
),

(
  gen_random_uuid(),
  'Control de flujo: condicionales y loops',
  'python-control-flow',
  'BEGINNER',
  'Aprende a controlar qué código se ejecuta y cuántas veces: toma de decisiones con if/elif/else e iteraciones con for y while.',
  'El control de flujo es lo que le da inteligencia a un programa. Sin él, el código simplemente ejecuta instrucciones de arriba hacia abajo sin poder reaccionar a datos ni repetir tareas. Es la base de cualquier lógica de programación.',
  'CONDICIONALES: if, elif, else

La instrucción if evalúa una condición y ejecuta un bloque de código solo si esa condición es verdadera. En Python, los bloques se delimitan por indentación (4 espacios), no por llaves como en otros lenguajes.

  if condicion:
      # se ejecuta si condicion es True
  elif otra_condicion:
      # se ejecuta si la primera fue False y esta es True
  else:
      # se ejecuta si todas las anteriores fueron False

Python evalúa como False los siguientes valores: None, 0, 0.0, cadena vacía "", lista vacía [], diccionario vacío {}, conjunto vacío set(). Todo lo demás se evalúa como True.

OPERADOR TERNARIO

Python tiene una forma compacta de escribir un if/else en una sola línea:

  resultado = "mayor" if edad >= 18 else "menor"

LOOPS: for

El loop for en Python itera sobre cualquier objeto iterable: listas, strings, rangos, diccionarios, etc. No itera sobre índices por defecto como en C o Java.

  for elemento in coleccion:
      # código que se ejecuta para cada elemento

La función range() genera secuencias de números:
  range(5)      → 0, 1, 2, 3, 4
  range(2, 8)   → 2, 3, 4, 5, 6, 7
  range(0, 10, 2) → 0, 2, 4, 6, 8

Cuando necesitas el índice además del valor, usa enumerate():
  for indice, valor in enumerate(lista):

LOOPS: while

El loop while ejecuta un bloque mientras la condición sea verdadera. Se usa cuando no sabes de antemano cuántas iteraciones necesitas.

  while condicion:
      # código que se ejecuta mientras condicion sea True

CONTROL DE LOOPS: break, continue, else

- break: sale del loop inmediatamente.
- continue: salta a la siguiente iteración sin ejecutar el resto del bloque.
- else en loops: Python permite un bloque else en for y while que se ejecuta solo si el loop terminó sin un break. Es un patrón útil para búsquedas.

COMPRENSIÓN DE LISTAS (LIST COMPREHENSION)

Es la forma idiomática de Python para crear listas a partir de iteraciones:

  cuadrados = [x**2 for x in range(10)]
  pares = [x for x in range(20) if x % 2 == 0]',
  '# Condicionales básicos
edad = 20

if edad >= 18:
    print("Mayor de edad")
elif edad >= 13:
    print("Adolescente")
else:
    print("Niño")

# Valores que Python evalúa como False
valores_falsos = [None, 0, 0.0, "", [], {}, set()]
for v in valores_falsos:
    if not v:
        print(f"{repr(v)} se evalúa como False")

# Operador ternario
categoria = "mayor" if edad >= 18 else "menor"
print(categoria)

# for con range
for i in range(5):
    print(i)  # 0 1 2 3 4

# for con enumerate
frutas = ["manzana", "pera", "uva"]
for indice, fruta in enumerate(frutas):
    print(f"{indice}: {fruta}")

# while con break
intento = 0
while True:
    intento += 1
    if intento == 3:
        print("Encontrado en el intento", intento)
        break

# else en for (se ejecuta si no hubo break)
for fruta in frutas:
    if fruta == "kiwi":
        break
else:
    print("Kiwi no encontrado en la lista")

# continue: saltar números impares
for n in range(10):
    if n % 2 != 0:
        continue
    print(n)  # 0 2 4 6 8

# List comprehension
cuadrados = [x**2 for x in range(1, 6)]
print(cuadrados)  # [1, 4, 9, 16, 25]

pares = [x for x in range(20) if x % 2 == 0]
print(pares)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]',
  ARRAY[
    'La indentación en Python no es opcional ni estética: define la estructura del programa. Usa siempre 4 espacios, nunca tabulaciones mezcladas con espacios.',
    'Prefiere for sobre while siempre que puedas. While requiere que gestiones manualmente la condición de salida, lo que facilita los bucles infinitos por error.',
    'Usa enumerate() en lugar de range(len(lista)) cuando necesites el índice. Es más legible y es la forma idiomática de Python.',
    'Las list comprehensions son más rápidas que un for equivalente para construir listas. Úsalas cuando la lógica sea simple; si es compleja, un for normal es más legible.'
  ],
  ARRAY[
    'Crear loops infinitos con while True sin un break claramente definido. Si el programa se cuelga, lo más probable es un loop infinito.',
    'Modificar una lista mientras iteras sobre ella con for. El comportamiento es impredecible. Si necesitas modificarla, itera sobre una copia: for item in lista.copy().',
    'Confundir = con == dentro de una condición. El primero asigna, el segundo compara. Python detecta algunos casos pero no todos.',
    'Ignorar el bloque else del for. Es un patrón poco conocido pero muy útil en búsquedas para distinguir si el loop terminó normalmente o por un break.'
  ],
  '[{"type":"article","title":"Python Docs - Control Flow","url":"https://docs.python.org/3/tutorial/controlflow.html"},{"type":"article","title":"Real Python - List Comprehensions","url":"https://realpython.com/list-comprehension-python/"}]'::jsonb,
  'a1e56981-d263-463b-a35d-a5f1380d8f00'
),

(
  gen_random_uuid(),
  'Funciones, argumentos y scope',
  'python-functions-scope',
  'BEGINNER',
  'Aprende a definir funciones reutilizables, manejar distintos tipos de argumentos y entender cómo Python decide qué variable es visible en cada parte del código.',
  'Las funciones son la unidad básica de organización del código. Sin ellas, los programas son secuencias de instrucciones que no pueden reutilizarse. Entender el scope evita errores sutiles que son difíciles de depurar cuando el programa crece.',
  'DEFINICIÓN DE FUNCIONES

Una función es un bloque de código con nombre que puede recibir datos, procesarlos y devolver un resultado. Se define con la palabra clave def.

  def nombre_funcion(parametros):
      # cuerpo de la función
      return resultado

Si no se incluye return, la función devuelve None implícitamente.

TIPOS DE ARGUMENTOS

Python ofrece cuatro formas de pasar argumentos a una función:

1. Posicionales: se asignan según el orden en que se pasan.
2. Por nombre (keyword arguments): se especifica el nombre del parámetro al llamar la función, sin importar el orden.
3. Con valor por defecto: el parámetro tiene un valor predeterminado que se usa si no se pasa ninguno.
4. *args y **kwargs: permiten que una función acepte un número variable de argumentos.

  *args captura argumentos posicionales extra como una tupla.
  **kwargs captura argumentos con nombre extra como un diccionario.

ADVERTENCIA IMPORTANTE: Nunca uses un objeto mutable (lista, diccionario) como valor por defecto de un parámetro. El objeto se crea una sola vez cuando Python define la función, no en cada llamada, lo que genera comportamiento inesperado.

  # MAL
  def agregar(item, lista=[]):
      lista.append(item)
      return lista

  # BIEN
  def agregar(item, lista=None):
      if lista is None:
          lista = []
      lista.append(item)
      return lista

SCOPE (ALCANCE DE VARIABLES)

El scope define desde dónde es visible una variable. Python sigue la regla LEGB para resolver nombres:

- L (Local): dentro de la función actual.
- E (Enclosing): en funciones externas que envuelven la actual (closures).
- G (Global): en el módulo actual, fuera de cualquier función.
- B (Built-in): nombres predefinidos de Python como len, print, range.

Python busca el nombre en ese orden. Si no lo encuentra en ninguno, lanza NameError.

Las variables creadas dentro de una función son locales por defecto. Para modificar una variable global desde dentro de una función, se debe declarar con global. Para modificar una variable del scope envolvente, se usa nonlocal. En la práctica, ambas palabras clave deben evitarse: son señal de que la función tiene efectos secundarios.

FUNCIONES LAMBDA

Las funciones lambda son funciones anónimas de una sola expresión. Son útiles como argumentos para funciones como sorted(), map() y filter().

  doble = lambda x: x * 2
  print(doble(5))  # 10

DOCSTRINGS

La primera línea de una función puede ser un string que la documenta. Python usa esto para generar documentación automática.

  def sumar(a, b):
      """Devuelve la suma de a y b."""
      return a + b

  help(sumar)  # muestra el docstring',
  '# Función básica con return
def calcular_area(base, altura):
    """Calcula el área de un rectángulo."""
    return base * altura

print(calcular_area(5, 3))  # 15

# Argumentos posicionales y por nombre
def presentar(nombre, edad, ciudad="desconocida"):
    return f"{nombre}, {edad} años, de {ciudad}"

print(presentar("Ana", 28))                     # Ana, 28 años, de desconocida
print(presentar("Luis", ciudad="Bogotá", edad=35))  # Luis, 35 años, de Bogotá

# *args: número variable de argumentos posicionales
def sumar_todo(*numeros):
    return sum(numeros)

print(sumar_todo(1, 2, 3, 4, 5))  # 15

# **kwargs: número variable de argumentos con nombre
def mostrar_info(**datos):
    for clave, valor in datos.items():
        print(f"{clave}: {valor}")

mostrar_info(nombre="Ana", edad=28, lenguaje="Python")

# Argumento mutable como default (forma correcta)
def agregar_item(item, lista=None):
    if lista is None:
        lista = []
    lista.append(item)
    return lista

print(agregar_item("a"))  # ["a"]
print(agregar_item("b"))  # ["b"]  (no acumula entre llamadas)

# Scope: LEGB
x = "global"

def externa():
    x = "enclosing"
    def interna():
        x = "local"
        print(x)  # local
    interna()
    print(x)  # enclosing

externa()
print(x)  # global

# Lambda con sorted
personas = [("Ana", 28), ("Luis", 35), ("Mia", 22)]
ordenadas = sorted(personas, key=lambda p: p[1])
print(ordenadas)  # ordena por edad',
  ARRAY[
    'Escribe un docstring para cada función que definas. Es un hábito que mejora la mantenibilidad y te enseña a pensar en qué hace la función antes de cómo la implementas.',
    'Cuando una función necesita devolver varios valores, Python permite retornarlos separados por coma. Internamente Python los empaqueta como una tupla.',
    'Mantén las funciones cortas y con un único propósito. Si una función hace más de una cosa, divídela. Una buena función cabe en la pantalla sin necesidad de scroll.',
    'Usa *args y **kwargs cuando diseñes funciones utilitarias o decoradores. En funciones de dominio específico, los parámetros explícitos son siempre preferibles.'
  ],
  ARRAY[
    'Usar objetos mutables como valores por defecto de parámetros. Es uno de los errores más famosos de Python y el comportamiento resultante es muy difícil de rastrear.',
    'Abusar de global. Si necesitas modificar muchas variables globales desde una función, el diseño tiene un problema estructural que debe resolverse de otra forma.',
    'Confundir la definición de una función con su llamada. def solo define; para ejecutar, debes llamarla con paréntesis. Omitir los paréntesis pasa la función como objeto, no la ejecuta.',
    'No retornar nada explícitamente cuando la función debería devolver un valor. Python retorna None silenciosamente, lo que genera errores confusos más adelante.'
  ],
  '[{"type":"article","title":"Python Docs - Defining Functions","url":"https://docs.python.org/3/tutorial/controlflow.html#defining-functions"},{"type":"article","title":"Real Python - Python Scope and the LEGB Rule","url":"https://realpython.com/python-scope-legb-rule/"},{"type":"article","title":"Real Python - *args and **kwargs","url":"https://realpython.com/python-kwargs-and-args/"}]'::jsonb,
  'a1e56981-d263-463b-a35d-a5f1380d8f00'
),

(
  gen_random_uuid(),
  'Listas, tuplas, diccionarios y sets',
  'python-collections',
  'BEGINNER',
  'Domina las cuatro estructuras de datos fundamentales de Python: cuándo usar cada una, cómo manipularlas y qué operaciones ofrecen.',
  'Los programas reales raramente trabajan con datos aislados. Manejan colecciones: listas de usuarios, registros de ventas, configuraciones clave-valor. Elegir la estructura correcta para cada situación impacta directamente en la claridad y el rendimiento del código.',
  'LISTAS

Las listas son colecciones ordenadas y mutables. Pueden contener elementos de cualquier tipo, incluyendo otras listas. Se definen con corchetes.

  frutas = ["manzana", "pera", "uva"]

Son la estructura más versátil de Python. Los elementos tienen un índice que empieza en 0. El índice negativo accede desde el final: -1 es el último elemento.

Operaciones esenciales: append(), extend(), insert(), remove(), pop(), sort(), sorted(), reverse(), index(), count(), len(), in.

Las listas en Python no son arrays de tamaño fijo. Internamente son arrays dinámicos que se redimensionan automáticamente.

TUPLAS

Las tuplas son colecciones ordenadas e inmutables. Se definen con paréntesis (o sin ellos, separando con comas). Una vez creadas, no se pueden modificar.

  coordenadas = (40.7128, -74.0060)
  punto = 10, 20  # también es una tupla

Se usan cuando los datos no deben cambiar: coordenadas, registros de base de datos, valores de retorno múltiple de funciones. Son más eficientes en memoria y velocidad que las listas.

El unpacking (desempaquetado) es una de las características más elegantes de Python:
  x, y = coordenadas
  primero, *resto = [1, 2, 3, 4, 5]

DICCIONARIOS

Los diccionarios almacenan pares clave-valor. Son mutables y desde Python 3.7 mantienen el orden de inserción. Las claves deben ser inmutables (strings, números, tuplas).

  usuario = {"nombre": "Ana", "edad": 28, "activo": True}

Acceso: usuario["nombre"] → lanza KeyError si no existe.
Acceso seguro: usuario.get("email", "sin email") → devuelve el valor por defecto si no existe.

Métodos esenciales: keys(), values(), items(), update(), pop(), setdefault().

La iteración con .items() es el patrón más común:
  for clave, valor in usuario.items():

SETS

Los sets son colecciones desordenadas de elementos únicos. Son mutables. Se definen con llaves, pero sin pares clave-valor.

  colores = {"rojo", "verde", "azul"}
  set_vacio = set()  # NO {}; eso crea un diccionario vacío

Su principal uso es eliminar duplicados y realizar operaciones de conjuntos: unión (|), intersección (&), diferencia (-), diferencia simétrica (^).

CUÁNDO USAR CADA UNA

- Lista: cuando el orden importa y los datos pueden cambiar.
- Tupla: cuando los datos no deben cambiar o usas la colección como clave de diccionario.
- Diccionario: cuando necesitas asociar claves con valores y acceder por clave.
- Set: cuando necesitas unicidad o hacer operaciones de conjuntos.',
  '# LISTAS
frutas = ["manzana", "pera", "uva"]
frutas.append("kiwi")           # agrega al final
frutas.insert(1, "fresa")       # inserta en posición 1
frutas.remove("pera")           # elimina por valor
ultimo = frutas.pop()           # elimina y devuelve el último
print(len(frutas))              # longitud
print("uva" in frutas)          # True
frutas.sort()                   # ordena in-place
nueva = sorted(frutas)          # devuelve nueva lista ordenada

# Slicing
numeros = [0, 1, 2, 3, 4, 5]
print(numeros[1:4])    # [1, 2, 3]
print(numeros[::2])    # [0, 2, 4]
print(numeros[::-1])   # [5, 4, 3, 2, 1, 0]

# TUPLAS y unpacking
coordenadas = (40.7128, -74.0060)
lat, lon = coordenadas
print(f"Latitud: {lat}, Longitud: {lon}")

primero, *resto = [1, 2, 3, 4, 5]
print(primero)  # 1
print(resto)    # [2, 3, 4, 5]

# DICCIONARIOS
usuario = {"nombre": "Ana", "edad": 28}
print(usuario["nombre"])               # Ana
print(usuario.get("email", "N/A"))     # N/A (sin KeyError)
usuario["activo"] = True               # agregar clave
usuario.update({"edad": 29, "ciudad": "Bogotá"})

for clave, valor in usuario.items():
    print(f"{clave}: {valor}")

# Dict comprehension
cuadrados = {x: x**2 for x in range(1, 6)}
print(cuadrados)  # {1:1, 2:4, 3:9, 4:16, 5:25}

# SETS
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a | b)   # unión: {1,2,3,4,5,6}
print(a & b)   # intersección: {3,4}
print(a - b)   # diferencia: {1,2}

# Eliminar duplicados de una lista
con_duplicados = [1, 2, 2, 3, 3, 3, 4]
sin_duplicados = list(set(con_duplicados))
print(sin_duplicados)',
  ARRAY[
    'Para verificar si una clave existe en un diccionario, usa el operador in: "clave" in diccionario. Es más claro que verificar el resultado de .get().',
    'Cuando necesites un diccionario con valor por defecto para claves nuevas, considera collections.defaultdict. Evita verificar manualmente si la clave existe antes de asignar.',
    'El set es la estructura más eficiente para verificar pertenencia (in). Si tienes una lista grande sobre la que haces muchas búsquedas, conviértela a set primero.',
    'Usa tuple como clave de diccionario cuando necesites una clave compuesta (por ejemplo, coordenadas). Las listas no son válidas como claves porque son mutables.'
  ],
  ARRAY[
    'Crear un set vacío con {}. Eso crea un diccionario vacío, no un set. La forma correcta es set().',
    'Acceder a una clave de diccionario que no existe con corchetes. Usa .get() cuando no estás seguro de que la clave existe.',
    'Asumir que las listas son eficientes para búsquedas con in. Buscar un elemento en una lista requiere recorrerla entera. Un set hace lo mismo en tiempo constante.',
    'Modificar una lista mientras iteras sobre ella. Si necesitas filtrar, crea una nueva lista con list comprehension en lugar de eliminar elementos durante la iteración.'
  ],
  '[{"type":"article","title":"Python Docs - Data Structures","url":"https://docs.python.org/3/tutorial/datastructures.html"},{"type":"article","title":"Real Python - Dictionaries in Python","url":"https://realpython.com/python-dicts/"},{"type":"article","title":"Real Python - Sets in Python","url":"https://realpython.com/python-sets/"}]'::jsonb,
  'a1e56981-d263-463b-a35d-a5f1380d8f00'
),

(
  gen_random_uuid(),
  'Programación orientada a objetos en Python',
  'python-oop',
  'BEGINNER',
  'Aprende a modelar el mundo con clases y objetos: atributos, métodos, herencia, encapsulación y los métodos especiales de Python.',
  'La programación orientada a objetos permite organizar código complejo en unidades coherentes que representan conceptos del mundo real. Frameworks como Django y FastAPI están construidos sobre POO. Entenderla es obligatorio para trabajar con cualquier librería seria de Python.',
  'CLASES Y OBJETOS

Una clase es una plantilla que define la estructura y el comportamiento de un tipo de dato. Un objeto es una instancia concreta de esa clase.

  class Persona:
      def __init__(self, nombre, edad):
          self.nombre = nombre
          self.edad = edad

__init__ es el constructor: se ejecuta automáticamente cuando se crea un objeto. self es la referencia al objeto que se está creando o usando. Siempre es el primer parámetro de los métodos de instancia.

ATRIBUTOS Y MÉTODOS

- Atributos de instancia: datos específicos de cada objeto (self.nombre).
- Atributos de clase: datos compartidos por todos los objetos de la clase.
- Métodos de instancia: funciones que operan sobre el objeto (usan self).
- Métodos de clase (@classmethod): reciben la clase como primer argumento (cls). Útiles como constructores alternativos.
- Métodos estáticos (@staticmethod): no reciben ni self ni cls. Son funciones que conceptualmente pertenecen a la clase pero no necesitan acceder a ella.

ENCAPSULACIÓN

Python no tiene modificadores de acceso como public o private del modo en que los tienen Java o C++. Por convención:
- Un guion bajo al inicio (_atributo) indica que es de uso interno. No es una restricción técnica, es una señal para otros desarrolladores.
- Dos guiones bajos (__atributo) activan el name mangling: Python renombra el atributo internamente para dificultar el acceso accidental desde fuera, pero no lo hace imposible.

HERENCIA

Una clase puede heredar atributos y métodos de otra clase.

  class Empleado(Persona):
      def __init__(self, nombre, edad, empresa):
          super().__init__(nombre, edad)
          self.empresa = empresa

super() llama al método de la clase padre. Python soporta herencia múltiple.

MÉTODOS ESPECIALES (DUNDER METHODS)

Son métodos con doble guion bajo al inicio y al final. Permiten que los objetos se comporten como tipos nativos de Python.

Los más importantes:
- __init__: constructor.
- __str__: representación legible del objeto (usada por print()).
- __repr__: representación oficial del objeto (usada en el REPL).
- __len__: permite usar len() sobre el objeto.
- __eq__: define cómo comparar dos objetos con ==.
- __lt__, __gt__: permiten usar operadores de comparación y sorted().

DATACLASSES

Python 3.7 introdujo el decorador @dataclass, que genera automáticamente __init__, __repr__ y __eq__ basándose en los atributos declarados. Es la forma moderna de crear clases que principalmente almacenan datos.',
  '# Clase básica
class Persona:
    especie = "Homo sapiens"  # atributo de clase

    def __init__(self, nombre, edad):
        self.nombre = nombre        # atributo de instancia
        self._edad = edad           # convención: uso interno

    def saludar(self):
        return f"Hola, soy {self.nombre}"

    def cumpleanos(self):
        self._edad += 1

    @property
    def edad(self):
        return self._edad

    def __str__(self):
        return f"Persona({self.nombre}, {self._edad})"

    def __repr__(self):
        return f"Persona(nombre={self.nombre!r}, edad={self._edad!r})"

    def __eq__(self, otro):
        return self.nombre == otro.nombre and self._edad == otro._edad

    @classmethod
    def desde_dict(cls, datos):
        return cls(datos["nombre"], datos["edad"])

    @staticmethod
    def es_mayor_de_edad(edad):
        return edad >= 18


# Uso
p1 = Persona("Ana", 28)
print(p1.saludar())    # Hola, soy Ana
print(str(p1))         # Persona(Ana, 28)
print(p1.edad)         # 28 (usando property)

p2 = Persona.desde_dict({"nombre": "Luis", "edad": 35})
print(Persona.es_mayor_de_edad(16))  # False


# Herencia
class Empleado(Persona):
    def __init__(self, nombre, edad, empresa):
        super().__init__(nombre, edad)
        self.empresa = empresa

    def saludar(self):  # sobreescribe el método
        base = super().saludar()
        return f"{base}, trabajo en {self.empresa}"

e = Empleado("Mia", 30, "TechCorp")
print(e.saludar())
print(isinstance(e, Persona))   # True
print(isinstance(e, Empleado))  # True


# Dataclass
from dataclasses import dataclass, field

@dataclass
class Producto:
    nombre: str
    precio: float
    stock: int = 0
    etiquetas: list = field(default_factory=list)

p = Producto("Laptop", 999.99, stock=10)
print(p)  # Producto(nombre="Laptop", precio=999.99, stock=10, etiquetas=[])',
  ARRAY[
    'Implementa siempre __repr__ en tus clases. Cuando el objeto aparece en el REPL o en un mensaje de error, __repr__ es lo que ves. Un buen __repr__ hace la depuración mucho más rápida.',
    'Usa @dataclass para clases que principalmente almacenan datos. Te ahorra escribir __init__, __repr__ y __eq__ manualmente y reduce el riesgo de errores.',
    'El decorador @property te permite acceder a un método como si fuera un atributo. Es la forma correcta de añadir lógica de validación a atributos sin romper la interfaz pública de la clase.',
    'Aprende a leer el MRO (Method Resolution Order) con ClaseHija.__mro__. Cuando usas herencia múltiple, Python lo usa para decidir qué método ejecutar primero.'
  ],
  ARRAY[
    'Olvidar self como primer parámetro de los métodos de instancia. Python lanza TypeError indicando que la función recibió un argumento de más, lo que desorienta a los principiantes.',
    'Usar atributos de clase para datos mutables compartidos. Si una lista es atributo de clase, todos los objetos comparten la misma lista. Los cambios en un objeto afectan a todos.',
    'Sobreescribir __init__ en una subclase sin llamar a super().__init__(). Los atributos del padre no se inicializan y el objeto queda en un estado incompleto.',
    'Abusar de la herencia cuando la composición sería más apropiada. La regla general: herencia para relaciones "es un" (Empleado es una Persona), composición para relaciones "tiene un" (Coche tiene un Motor).'
  ],
  '[{"type":"article","title":"Python Docs - Classes","url":"https://docs.python.org/3/tutorial/classes.html"},{"type":"article","title":"Real Python - Object Oriented Programming","url":"https://realpython.com/python3-object-oriented-programming/"},{"type":"article","title":"Python Docs - dataclasses","url":"https://docs.python.org/3/library/dataclasses.html"}]'::jsonb,
  'a1e56981-d263-463b-a35d-a5f1380d8f00'
),

(
  gen_random_uuid(),
  'Archivos, excepciones y módulos',
  'python-files-exceptions-modules',
  'BEGINNER',
  'Aprende a leer y escribir archivos, manejar errores de forma controlada con excepciones, y organizar el código en módulos reutilizables.',
  'Cualquier aplicación real interactúa con el sistema de archivos, puede fallar por razones externas y necesita organizar su código en múltiples archivos. Estas tres habilidades son el puente entre los ejercicios de aprendizaje y los programas que funcionan en producción.',
  'MANEJO DE ARCHIVOS

Python provee la función built-in open() para trabajar con archivos. La forma recomendada es siempre usar el gestor de contexto with, que garantiza que el archivo se cierre correctamente aunque ocurra un error.

  with open("archivo.txt", "r", encoding="utf-8") as f:
      contenido = f.read()

Modos de apertura:
- "r": lectura (por defecto). Lanza FileNotFoundError si no existe.
- "w": escritura. Crea el archivo si no existe; lo sobreescribe si existe.
- "a": append. Agrega al final sin borrar el contenido existente.
- "x": creación exclusiva. Lanza FileExistsError si ya existe.
- "rb", "wb": modo binario (imágenes, PDFs, etc.).

Métodos principales de lectura:
- f.read(): lee el archivo completo como un string.
- f.readline(): lee una línea.
- f.readlines(): devuelve una lista con todas las líneas.
- Iterar directamente: for linea in f: es eficiente en memoria para archivos grandes.

MANEJO DE EXCEPCIONES

Las excepciones son la forma en que Python reporta errores en tiempo de ejecución. El bloque try/except captura esas excepciones y permite responder a ellas de forma controlada.

  try:
      resultado = 10 / divisor
  except ZeroDivisionError:
      print("No se puede dividir entre cero")
  except (TypeError, ValueError) as e:
      print(f"Error de tipo o valor: {e}")
  else:
      print("Todo salió bien")  # se ejecuta si no hubo excepción
  finally:
      print("Esto siempre se ejecuta")  # con o sin excepción

Las excepciones más comunes: ValueError, TypeError, KeyError, IndexError, FileNotFoundError, ZeroDivisionError, AttributeError, ImportError.

Para lanzar excepciones propias: raise ValueError("mensaje descriptivo").

Para crear excepciones personalizadas, se define una clase que hereda de Exception.

MÓDULOS Y PAQUETES

Un módulo es simplemente un archivo .py. Cuando importas un módulo, Python ejecuta ese archivo y pone sus definiciones a tu disposición.

Formas de importar:
  import math                    # importa el módulo completo
  from math import sqrt, pi      # importa nombres específicos
  from math import sqrt as raiz  # importa con alias

Un paquete es una carpeta que contiene un archivo __init__.py y uno o más módulos. __init__.py puede estar vacío; su presencia convierte la carpeta en un paquete de Python.

Cuando ejecutas python archivo.py, Python asigna a la variable __name__ el valor "__main__". Cuando el mismo archivo se importa como módulo, __name__ toma el nombre del módulo. El patrón if __name__ == "__main__" se usa para separar el código que debe ejecutarse solo cuando el archivo se corre directamente.',
  '# ARCHIVOS: lectura
with open("datos.txt", "r", encoding="utf-8") as f:
    for linea in f:             # eficiente en memoria
        print(linea.strip())    # strip elimina el salto de línea

# ARCHIVOS: escritura
lineas = ["primera linea", "segunda linea", "tercera linea"]
with open("salida.txt", "w", encoding="utf-8") as f:
    for linea in lineas:
        f.write(linea + "\n")

# ARCHIVOS: JSON (muy común en aplicaciones reales)
import json

datos = {"nombre": "Ana", "edad": 28, "activo": True}

# Escribir JSON
with open("usuario.json", "w", encoding="utf-8") as f:
    json.dump(datos, f, indent=2)

# Leer JSON
with open("usuario.json", "r", encoding="utf-8") as f:
    cargado = json.load(f)
    print(cargado["nombre"])  # Ana


# EXCEPCIONES
def leer_archivo(ruta):
    try:
        with open(ruta, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        print(f"El archivo {ruta} no existe")
        return None
    except PermissionError:
        print("No tienes permisos para leer ese archivo")
        return None

# Excepción personalizada
class SaldoInsuficienteError(Exception):
    def __init__(self, saldo, monto):
        super().__init__(f"Saldo insuficiente: tienes {saldo}, intentas retirar {monto}")
        self.saldo = saldo
        self.monto = monto

def retirar(saldo, monto):
    if monto > saldo:
        raise SaldoInsuficienteError(saldo, monto)
    return saldo - monto

try:
    nuevo_saldo = retirar(100, 200)
except SaldoInsuficienteError as e:
    print(e)

# MÓDULOS
# archivo: calculos.py
def sumar(a, b):
    return a + b

if __name__ == "__main__":
    # Este bloque solo se ejecuta si corres calculos.py directamente
    print(sumar(3, 4))

# archivo: main.py
# from calculos import sumar
# print(sumar(10, 20))',
  ARRAY[
    'Especifica siempre encoding="utf-8" al abrir archivos de texto. El encoding por defecto varía entre sistemas operativos y puede generar errores difíciles de reproducir.',
    'Captura excepciones específicas, no la clase base Exception. Capturar Exception silencia errores inesperados que deberías conocer durante el desarrollo.',
    'Usa el módulo json de la librería estándar para leer y escribir archivos JSON. Es la operación de archivo más común en aplicaciones web y scripts de automatización.',
    'Crea excepciones personalizadas con nombres descriptivos que terminen en Error. Hacen el código más legible y permiten capturarlas con precisión.'
  ],
  ARRAY[
    'No usar with al abrir archivos. Si el código lanza una excepción antes de llamar a f.close(), el archivo queda abierto. El gestor de contexto garantiza el cierre siempre.',
    'Capturar excepciones y no hacer nada con ellas (pass). Silenciar errores hace que el programa falle más adelante en un lugar diferente, sin pista del origen del problema.',
    'Usar rutas absolutas hardcodeadas. Usa el módulo pathlib o os.path para construir rutas de forma portable entre sistemas operativos.',
    'Nombrar un módulo propio con el mismo nombre que un módulo de la librería estándar o de un paquete instalado. Python importará el tuyo en lugar del esperado, causando ImportError confusos.'
  ],
  '[{"type":"article","title":"Python Docs - Reading and Writing Files","url":"https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files"},{"type":"article","title":"Python Docs - Errors and Exceptions","url":"https://docs.python.org/3/tutorial/errors.html"},{"type":"article","title":"Real Python - Python Exceptions","url":"https://realpython.com/python-exceptions/"}]'::jsonb,
  'a1e56981-d263-463b-a35d-a5f1380d8f00'
),

(
  gen_random_uuid(),
  'Librería estándar esencial y pip',
  'python-stdlib-and-pip',
  'BEGINNER',
  'Conoce los módulos más útiles que vienen incluidos con Python y aprende a instalar y gestionar paquetes externos con pip.',
  'Python se describe frecuentemente como un lenguaje con "baterías incluidas". Su librería estándar resuelve la mayoría de las tareas cotidianas sin necesidad de instalar nada. Saber qué existe evita reinventar la rueda y construir herramientas frágiles.',
  'LA LIBRERÍA ESTÁNDAR

Python incluye una colección extensa de módulos listos para usar. Los más relevantes para un desarrollador backend son:

os y pathlib
Interacción con el sistema operativo y el sistema de archivos.
- os.environ: acceso a variables de entorno.
- os.getcwd(): directorio de trabajo actual.
- pathlib.Path: la forma moderna de trabajar con rutas. Orientada a objetos, portable entre sistemas operativos.

sys
Información sobre el intérprete de Python.
- sys.argv: lista de argumentos pasados al script desde la terminal.
- sys.exit(): termina el programa con un código de salida.
- sys.path: lista de directorios donde Python busca módulos.

json
Codificación y decodificación de JSON. json.dumps() convierte un objeto Python a string JSON. json.loads() convierte un string JSON a objeto Python. json.dump() y json.load() trabajan directamente con archivos.

datetime
Manejo de fechas y tiempos. La clase datetime.datetime representa un punto en el tiempo. timedelta representa una duración.

collections
Estructuras de datos especializadas:
- Counter: cuenta ocurrencias de elementos.
- defaultdict: diccionario con valor por defecto para claves nuevas.
- deque: lista optimizada para inserciones y eliminaciones en ambos extremos.
- namedtuple: tupla con nombres para sus campos.

itertools
Herramientas para trabajar con iterables de forma eficiente en memoria: chain, product, combinations, permutations, groupby.

re
Expresiones regulares para búsqueda y manipulación de texto.

random
Generación de números y selecciones aleatorias.

hashlib
Funciones de hash criptográfico: SHA-256, MD5, etc.

GESTIÓN DE PAQUETES CON pip

pip es el instalador de paquetes de Python. Descarga paquetes desde PyPI (Python Package Index), el repositorio central de paquetes de Python.

Comandos esenciales:
  pip install nombre-paquete
  pip install nombre-paquete==2.0.1    # versión específica
  pip uninstall nombre-paquete
  pip list                              # paquetes instalados
  pip show nombre-paquete               # info de un paquete
  pip freeze > requirements.txt         # exportar dependencias
  pip install -r requirements.txt       # instalar desde archivo

REQUIREMENTS.TXT

Es el archivo estándar para documentar las dependencias de un proyecto. Debe vivir en la raíz del repositorio y debe estar incluido en el control de versiones. Permite que cualquiera que clone el repositorio pueda recrear el entorno exacto con un solo comando.

Siempre usa pip dentro de un entorno virtual activo. Los paquetes instalados globalmente no aparecen en el requirements.txt del entorno virtual y contaminan el entorno base de Python.',
  '# OS y PATHLIB
import os
from pathlib import Path

print(os.getcwd())                     # directorio actual
print(os.environ.get("HOME", "N/A"))   # variable de entorno

ruta = Path("datos") / "usuarios" / "perfil.json"
print(ruta)                            # datos/usuarios/perfil.json
print(ruta.suffix)                     # .json
print(ruta.stem)                       # perfil
print(ruta.parent)                     # datos/usuarios

# Crear directorio si no existe
ruta.parent.mkdir(parents=True, exist_ok=True)

# SYS
import sys
print(sys.version)
print(sys.argv)  # ["script.py", "arg1", "arg2"] si se pasan argumentos

# DATETIME
from datetime import datetime, timedelta

ahora = datetime.now()
print(ahora.strftime("%Y-%m-%d %H:%M:%S"))

manana = ahora + timedelta(days=1)
print(manana.date())

nacimiento = datetime(1995, 6, 15)
edad_dias = (ahora - nacimiento).days
print(f"Días vividos: {edad_dias}")

# COLLECTIONS
from collections import Counter, defaultdict, deque

palabras = ["python", "es", "genial", "python", "es", "python"]
conteo = Counter(palabras)
print(conteo.most_common(2))  # [("python",3), ("es",2)]

grupos = defaultdict(list)
datos = [("frontend", "React"), ("backend", "Django"), ("frontend", "Vue")]
for categoria, tecnologia in datos:
    grupos[categoria].append(tecnologia)
print(dict(grupos))

cola = deque([1, 2, 3])
cola.appendleft(0)   # [0, 1, 2, 3]
cola.append(4)       # [0, 1, 2, 3, 4]
cola.popleft()       # 0

# JSON
import json
datos = {"nombre": "Ana", "skills": ["Python", "SQL"]}
json_str = json.dumps(datos, indent=2)
print(json_str)
recuperado = json.loads(json_str)
print(recuperado["skills"])

# RE (expresiones regulares)
import re
texto = "Contacto: ana@email.com y luis@empresa.org"
emails = re.findall(r"[\w.+-]+@[\w-]+\.[a-z]{2,}", texto)
print(emails)  # ["ana@email.com", "luis@empresa.org"]',
  ARRAY[
    'Usa pathlib.Path en lugar de os.path para trabajar con rutas. Es más legible, orientada a objetos y portable entre Windows, macOS y Linux.',
    'Genera el requirements.txt con pip freeze > requirements.txt antes de cada commit cuando agregues dependencias. Mantenerlo actualizado es responsabilidad del desarrollador.',
    'Antes de instalar un paquete externo, verifica si la librería estándar ya resuelve tu necesidad. Menos dependencias externas significa menos superficie de ataque y proyectos más portables.',
    'Usa Counter cuando necesites contar frecuencias. Es más rápido y legible que un diccionario con lógica manual de conteo.'
  ],
  ARRAY[
    'Instalar paquetes con pip sin tener el entorno virtual activo. Los paquetes se instalan globalmente y no quedan registrados en el requirements.txt del proyecto.',
    'Commitear el requirements.txt sin actualizarlo después de instalar nuevas dependencias. Los colaboradores o el servidor de deploy no podrán reproducir el entorno.',
    'Construir manualmente rutas con concatenación de strings: "carpeta/" + "archivo.txt". En Windows las rutas usan backslash, lo que rompe el código. pathlib resuelve esto.',
    'Ignorar la documentación de PyPI antes de instalar un paquete. Verifica la fecha de la última actualización, el número de descargas y si el paquete tiene mantenimiento activo.'
  ],
  '[{"type":"article","title":"Python Docs - The Python Standard Library","url":"https://docs.python.org/3/library/"},{"type":"article","title":"Python Docs - pathlib","url":"https://docs.python.org/3/library/pathlib.html"},{"type":"article","title":"Real Python - pip","url":"https://realpython.com/what-is-pip/"}]'::jsonb,
  'a1e56981-d263-463b-a35d-a5f1380d8f00'
),

(
  gen_random_uuid(),
  'Proyecto: herramienta de automatización CLI',
  'python-cli-automation-project',
  'BEGINNER',
  'Aplica todos los conceptos del curso construyendo una herramienta de línea de comandos real que automatiza una tarea concreta usando las mejores prácticas de Python.',
  'El conocimiento sin aplicación no se consolida. Construir una herramienta CLI real obliga a integrar tipos, funciones, colecciones, POO, archivos, excepciones y la librería estándar en un programa coherente. Es el tipo de proyecto que se puede mostrar en un portafolio.',
  'QUÉ ES UNA HERRAMIENTA CLI

Una herramienta CLI (Command Line Interface) es un programa que se ejecuta desde la terminal y recibe instrucciones a través de argumentos y opciones. Son la base de la automatización: scripts de deploy, procesamiento de datos, generación de reportes, gestión de archivos.

Ejemplos cotidianos de herramientas CLI: git, pip, npm, docker, aws.

ESTRUCTURA DE UN PROYECTO PYTHON PROFESIONAL

Antes de escribir código, la estructura del proyecto importa:

  mi-herramienta/
  ├── cli.py              # punto de entrada principal
  ├── core/
  │   ├── __init__.py
  │   ├── procesador.py   # lógica de negocio
  │   └── modelos.py      # clases de datos
  ├── utils/
  │   ├── __init__.py
  │   └── archivos.py     # utilidades de I/O
  ├── requirements.txt
  └── README.md

ARGPARSE: ARGUMENTOS EN LA TERMINAL

El módulo argparse (librería estándar) convierte los argumentos de la terminal en variables Python y genera documentación automática con --help.

  import argparse
  parser = argparse.ArgumentParser(description="Descripción de la herramienta")
  parser.add_argument("archivo", help="Archivo a procesar")
  parser.add_argument("--formato", choices=["json", "csv"], default="json")
  parser.add_argument("--verbose", action="store_true")
  args = parser.parse_args()

LA HERRAMIENTA: ANALIZADOR DE LOGS

La herramienta que construiremos en este proyecto lee un archivo de logs en formato texto, analiza su contenido, genera estadísticas y exporta un reporte en JSON o CSV.

Funcionalidades:
1. Leer el archivo de logs desde un argumento de línea de comandos.
2. Parsear cada línea para extraer: timestamp, nivel (INFO, WARNING, ERROR), mensaje.
3. Contar ocurrencias por nivel.
4. Filtrar líneas por nivel si el usuario lo solicita.
5. Exportar el reporte en JSON o CSV según la opción elegida.
6. Manejar errores: archivo no encontrado, formato inválido.

Este proyecto usa: argparse, pathlib, datetime, collections.Counter, json, csv, clases con dataclass, excepciones personalizadas, módulos separados y el patrón if __name__ == "__main__".',
  '# core/modelos.py
from dataclasses import dataclass
from datetime import datetime

NIVELES_VALIDOS = {"INFO", "WARNING", "ERROR", "DEBUG"}

class FormatoLogInvalidoError(Exception):
    pass

@dataclass
class EntradaLog:
    timestamp: datetime
    nivel: str
    mensaje: str

    @classmethod
    def desde_linea(cls, linea: str) -> "EntradaLog":
        """
        Parsea una línea con el formato:
        2024-01-15 10:30:00 ERROR mensaje del error
        """
        partes = linea.strip().split(" ", 3)
        if len(partes) < 4:
            raise FormatoLogInvalidoError(f"Línea inválida: {linea.strip()}")
        fecha_str, hora_str, nivel, mensaje = partes
        if nivel not in NIVELES_VALIDOS:
            raise FormatoLogInvalidoError(f"Nivel desconocido: {nivel}")
        timestamp = datetime.strptime(f"{fecha_str} {hora_str}", "%Y-%m-%d %H:%M:%S")
        return cls(timestamp=timestamp, nivel=nivel, mensaje=mensaje)


# core/procesador.py
from collections import Counter
from pathlib import Path
from core.modelos import EntradaLog, FormatoLogInvalidoError

def leer_logs(ruta: Path, nivel_filtro: str = None) -> list[EntradaLog]:
    entradas = []
    errores = 0
    with open(ruta, "r", encoding="utf-8") as f:
        for numero, linea in enumerate(f, start=1):
            if not linea.strip():
                continue
            try:
                entrada = EntradaLog.desde_linea(linea)
                if nivel_filtro is None or entrada.nivel == nivel_filtro:
                    entradas.append(entrada)
            except FormatoLogInvalidoError:
                errores += 1
                print(f"Advertencia: línea {numero} ignorada por formato inválido")
    if errores:
        print(f"Total de líneas ignoradas: {errores}")
    return entradas

def generar_estadisticas(entradas: list[EntradaLog]) -> dict:
    conteo = Counter(e.nivel for e in entradas)
    return {
        "total": len(entradas),
        "por_nivel": dict(conteo),
    }


# cli.py
import argparse
import json
import csv
import sys
from pathlib import Path
from core.procesador import leer_logs, generar_estadisticas

def main():
    parser = argparse.ArgumentParser(
        description="Analiza archivos de log y genera reportes"
    )
    parser.add_argument("archivo", type=Path, help="Ruta al archivo de log")
    parser.add_argument(
        "--nivel",
        choices=["INFO", "WARNING", "ERROR", "DEBUG"],
        help="Filtrar por nivel de log"
    )
    parser.add_argument(
        "--formato",
        choices=["json", "csv"],
        default="json",
        help="Formato del reporte de salida (default: json)"
    )
    parser.add_argument(
        "--salida",
        type=Path,
        default=Path("reporte"),
        help="Nombre base del archivo de salida"
    )
    args = parser.parse_args()

    if not args.archivo.exists():
        print(f"Error: el archivo {args.archivo} no existe.")
        sys.exit(1)

    entradas = leer_logs(args.archivo, nivel_filtro=args.nivel)
    estadisticas = generar_estadisticas(entradas)

    if args.formato == "json":
        ruta_salida = args.salida.with_suffix(".json")
        with open(ruta_salida, "w", encoding="utf-8") as f:
            json.dump(estadisticas, f, indent=2)
    elif args.formato == "csv":
        ruta_salida = args.salida.with_suffix(".csv")
        with open(ruta_salida, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["nivel", "cantidad"])
            for nivel, cantidad in estadisticas["por_nivel"].items():
                writer.writerow([nivel, cantidad])

    print(f"Reporte generado: {ruta_salida}")
    print(f"Total de entradas procesadas: {estadisticas[''total'']}")

if __name__ == "__main__":
    main()

# Uso desde la terminal:
# python cli.py servidor.log
# python cli.py servidor.log --nivel ERROR
# python cli.py servidor.log --formato csv --salida reportes/enero',
  ARRAY[
    'Divide el código en módulos desde el inicio aunque el proyecto sea pequeño. Desarrollar el hábito de separar responsabilidades vale más que terminar rápido con todo en un solo archivo.',
    'Prueba tu herramienta con argumentos inválidos y archivos mal formados. Las herramientas robustas se diseñan pensando en los casos de error, no solo en el camino feliz.',
    'Escribe un README claro que explique cómo instalar y usar la herramienta. Es lo primero que verá alguien que encuentre tu repositorio.',
    'Usa sys.exit(1) cuando el programa termina por un error. El código de salida 0 indica éxito; cualquier otro número indica fallo. Esto permite que otros scripts o pipelines detecten si tu herramienta falló.'
  ],
  ARRAY[
    'Poner toda la lógica en cli.py. El punto de entrada debe encargarse solo de parsear argumentos y coordinar; la lógica de negocio va en módulos separados.',
    'No manejar el caso en que el archivo de entrada no existe. Es el error más común al usar herramientas CLI y el usuario espera un mensaje claro, no una excepción de Python sin formato.',
    'Olvidar agregar un if __name__ == "__main__" en el punto de entrada. Sin esto, importar el módulo desde otro archivo ejecutaría el programa inmediatamente.',
    'No incluir --help en la documentación de argparse. argparse lo genera automáticamente si describes bien cada argumento con el parámetro help. No aprovecharlo es desperdiciar una función gratuita.'
  ],
  '[{"type":"article","title":"Python Docs - argparse","url":"https://docs.python.org/3/library/argparse.html"},{"type":"article","title":"Real Python - Building Command Line Interfaces with argparse","url":"https://realpython.com/command-line-interfaces-python-argparse/"},{"type":"article","title":"Hitchhiker''s Guide to Python - Structuring Your Project","url":"https://docs.python-guide.org/writing/structure/"}]'::jsonb,
  'a1e56981-d263-463b-a35d-a5f1380d8f00'
);