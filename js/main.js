//AVL Peliculas
class Nodo_Pelicula {
    constructor(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q) {
        this.id_pelicula = id_pelicula;
        this.nombre_pelicula = nombre_pelicula;
        this.descripcion = descripcion;
        this.puntuacion_star = puntuacion_star;
        this.precio_Q = precio_Q;
        this.izquierdo = null;
        this.derecho = null;
        this.altura = 0;
    }

    insertar(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q) {
        if(id_pelicula < this.id_pelicula) {
            if(this.izquierdo === null) {
                this.izquierdo = new Nodo_Pelicula(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q);
            } else {
                this.izquierdo.insertar(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q);
            }
        }else if(id_pelicula > this.id_pelicula) {
            if(this.derecho === null) {
                this.derecho = new Nodo_Pelicula(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q);
            } else {
                this.derecho.insertar(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q);
            }
        }else{
            console.log("No se puede insertar un nodo con el mismo id");
        }
    }

    obtenerGraphviz(){
        return "digraph grafica{\n" +
               'rankdir=TB;\n label="Arbol Binario Autores";\nfontsize="50";\n bgcolor="none";\n' +
               'node [ style=filled , fillcolor=darkgoldenrod2];\n'+
                this.getCodigoInterno()+
                "}\n";
    }

    getCodigoInterno(){
        var etiqueta = "";
        if(this.izquierdo==null && this.derecho==null){
            etiqueta="nodo"+this.id_pelicula+" [ label =\""+this.nombre_pelicula+"\"];\n";
        }else{
            etiqueta="nodo"+this.id_pelicula+" [ label =\""+this.nombre_pelicula+"\"];\n";
        }
        if(this.izquierdo!=null){
            etiqueta=etiqueta + this.izquierdo.getCodigoInterno() +
               "nodo"+this.id_pelicula+"->nodo"+this.izquierdo.id_pelicula+"\n";
        }
        if(this.derecho!=null){
            etiqueta=etiqueta + this.derecho.getCodigoInterno() +
               "nodo"+this.id_pelicula+"->nodo"+this.derecho.id_pelicula+"\n";                    
        }
        return etiqueta;
    }
}

class Arbol_AVL{
    constructor(){
        this.raiz = null;
    }

    insertar(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q){
        this.raiz = this.insertarNodo(this.raiz,id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q);
    }

    insertarNodo(nodo,id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q){
        if(nodo === null){
            nodo = new Nodo_Pelicula(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q);
        }else if(id_pelicula<nodo.id_pelicula){
            nodo.izquierdo = this.insertarNodo(nodo.izquierdo,id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q);
            if(this.altura(nodo.derecho)-this.altura(nodo.izquierdo)== -2){
                if(id_pelicula<nodo.izquierdo.id_pelicula){
                    nodo = this.IzquierdaIzquierda(nodo);
                }else{
                    nodo = this.IzquierdaDerecha(nodo);
                }
            }
        }else if(id_pelicula>nodo.id_pelicula){
            nodo.derecho = this.insertarNodo(nodo.derecho,id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q);
            if(this.altura(nodo.derecho)-this.altura(nodo.izquierdo)== 2){
                if(id_pelicula>nodo.derecho.id_pelicula){
                    nodo = this.DerechaDerecha(nodo);
                }else{
                    nodo = this.DerechaIzquierda(nodo);
                }
            }
        }else{
            console.log("No se puede insertar un nodo con el mismo id");
        }
        nodo.altura = this.mayor(this.altura(nodo.izquierdo),this.altura(nodo.derecho))+1;
    }

    altura(nodo){
        if(nodo === null){
            return -1;
        }else{
            return nodo.altura;
        }
    }

    mayor(a,b){
        if(a>b){
            return a;
        }else{
            return b;
        }
    }

    IzquierdaIzquierda(nodo){
        var Nodo2 = nodo.izquierdo;
        nodo.izquierdo = Nodo2.derecho;
        Nodo2.derecho = nodo;
        nodo.altura = this.mayor(this.altura(nodo.izquierdo),this.altura(nodo.derecho))+1;
        Nodo2.altura = this.mayor(this.altura(Nodo2.izquierdo),nodo.altura)+1;
        return Nodo2;
    }

    DerechaDerecha(nodo){
        var Nodo2 = nodo.derecho;
        nodo.derecho = Nodo2.izquierdo;
        Nodo2.izquierdo = nodo;
        nodo.altura = this.mayor(this.altura(nodo.izquierdo),this.altura(nodo.derecho))+1;
        Nodo2.altura = this.mayor(this.altura(Nodo2.derecho),nodo.altura)+1;
        return Nodo2;
    }

    IzquierdaDerecha(nodo){
        nodo.izquierdo = this.DerechaDerecha(nodo.izquierdo);
        return this.IzquierdaIzquierda(nodo);
    }

    DerechaIzquierda(nodo){
        nodo.derecho = this.IzquierdaIzquierda(nodo.derecho);
        return this.DerechaDerecha(nodo);
    }

    graficar(){
        var actual;
        actual = this.raiz;
        var hola = actual.obtenerGraphivz();
        d3.select("#Arbol_AVL").graphviz()
            .width(1200)
            .height(900)
            .renderDot(hola)
    }
}

//Lista Simple Clientes
class Nodo_Cliente{
    constructor(dpi,nombre_completo,nombre_usuario,correo,contrasenia,telefono){
        this.dpi = dpi;
        this.nombre_completo = nombre_completo;
        this.nombre_usuario = nombre_usuario;
        this.correo = correo;
        this.contrasenia = contrasenia;
        this.telefono = telefono;
        this.siguiente = null;
    }
}

class ListaSimple{
    constructor(){
        this.primero = null;
    }

    insertarCliente(dpi,nombre_completo,nombre_usuario,correo,contrasenia,telefono){
        var temporal = new Nodo_Cliente(dpi,nombre_completo,nombre_usuario,correo,contrasenia,telefono);
        temporal.siguiente = this.primero;
        this.primero = temporal;
    }

    recorrerMenu(usuario,contrasenia){
        var actual = this.primero;
        while(actual!==null){
            if(actual.nombre_usuario === usuario && actual.contrasenia === contrasenia){
                return actual;
            }
        }
    }

    graficar(){
        var contenido = "";
        contenido+= "digraph G {\n"+
        'bgcolor=\"none\" layout=dot label="Lista_Libros" \n'+
        "node [shape=square,fontname=\"Century Gothic\", style=filled, color=black, fillcolor=\"#f0b35d\"];\n"

        var actual = this.primero;
        var nombreNodos = "";
        var conexiones = "";
        while(actual!=null){
            nombreNodos += "nodo"+actual.dpi+'[label=\"'+"Nombre: "+actual.nombre+'\n"];\n';
            if(actual.siguiente != null){
                conexiones += "nodo"+actual.dpi+"->nodo"+actual.siguiente.dpi+";\n";
            }    
            actual = actual.siguiente;
        }
        contenido += nombreNodos;
        contenido += conexiones;
        contenido += "rankdir=LR;\n}";
        d3.select("#Lista_Clientes").graphviz()
            .width(1200)
            .height(900)
            .renderDot(contenido)
    }
}

//Arbol Binario Actores
class Actor{
    constructor(dni,nombre_actor,correo,descripcion){
        this.dni = dni;
        this.nombre_actor = nombre_actor;
        this.correo = correo;
        this.descripcion = descripcion;
        this.izquierda = null;
        this.derecha = null;
    }

    insertar(dni,nombre_actor,correo,descripcion){
        if(dni<this.dni){
            if(this.izquierda == null){
                this.izquierda = new Actor(dni,nombre_actor,correo,descripcion);
            }else{
                this.izquierda.insertar(dni,nombre_actor,correo,descripcion);
            }
        }else if(dni>this.dni){
            if(this.derecha == null){
                this.derecha = new Actor(dni,nombre_actor,correo,descripcion);
            }else{
                this.derecha.insertar(dni,nombre_actor,correo,descripcion);
            }
        }else{
            console.log("El actor ya existe");
        }
    }

    obtenerGraphivz(){
        return "digraph grafica{\n" +
               'rankdir=TB;\n label="Arbol Binario Autores";\nfontsize="50";\n bgcolor="none";\n' +
               'node [ style=filled , fillcolor=darkgoldenrod2];\n'+
                this.getCodigoInterno()+
                "}\n";
    }
       
    getCodigoInterno(){
        var etiqueta = "";
        if(this.izquierda==null && this.derecha==null){
            etiqueta="nodo"+this.dni+" [ label =\""+this.nombre_actor+"\"];\n";
        }else{
            etiqueta="nodo"+this.dni+" [ label =\""+this.nombre_actor+"\"];\n";
        }
        if(this.izquierda!=null){
            etiqueta=etiqueta + this.izquierda.getCodigoInterno() +
               "nodo"+this.dni+"->nodo"+this.izquierda.dni+"\n";
        }
        if(this.derecha!=null){
            etiqueta=etiqueta + this.derecha.getCodigoInterno() +
               "nodo"+this.dni+"->nodo"+this.derecha.dni+"\n";                    
        }
        return etiqueta;
    }
    
}

class Arbol{
    constructor(){
        this.raiz = null;
    }

    insertar(dni,nombre_actor,correo,descripcion){
        if(this.raiz == null){
            this.raiz = new Actor(dni,nombre_actor,correo,descripcion);
        }else{
            this.raiz.insertar(dni,nombre_actor,correo,descripcion);
        }
    }

    graficarArbol(){
        var actual;
        actual = this.raiz;
        var hola = actual.obtenerGraphivz();
        d3.select("#Arbol_Binario").graphviz()
            .width(1200)
            .height(900)
            .renderDot(hola)
    } 

}


var listaClientes = new ListaSimple();
var arbolAcotres = new Arbol();
var Peliculas_arbol = new Arbol_AVL();

document.getElementById('masivaPeliculas').addEventListener('change', leerArchivoPeliculas, false);
document.getElementById('masivaClientes').addEventListener('change', leerArchivoClientes, false);
document.getElementById('masivaActores').addEventListener('change', leerArchivoActores, false);
document.getElementById('masivaCategorias').addEventListener('change', leerArchivoCategorias, false);

document.getElementById("btn_login").onclick = function(){
    var nombre_usuario = document.getElementById("usuarioLogin").value;
    var contrasenia = document.getElementById("usuarioContra").value;
    var usuario = listaClientes.recorrerMenu(nombre_usuario,contrasenia);
    if(usuario != null){
        document.getElementById("PaginaUsuario").style.display="block";
        document.getElementById("Login").style.display="none";
    }else{
        alert("Usuario o contraseña incorrectos");
    }
}

document.getElementById("btn_administrador").onclick = function(){
    var nombre_usuario = document.getElementById("usuarioLogin").value;
    var contrasenia = document.getElementById("usuarioContra").value;
    if (nombre_usuario == "EDD" && contrasenia == "123"){
        document.getElementById("Administracion").style.display="block";
        document.getElementById("Login").style.display="none";
    }else{
        alert("Usuario o contraseña de administrador incorrectos");
    }
}