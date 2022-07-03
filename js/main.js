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
            if(this.izquierdo == null) {
                this.izquierdo = new Nodo_Pelicula(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q);
            } else {
                this.izquierdo.insertar(id_pelicula);
            }
        }else if(id_pelicula > this.id_pelicula) {
            if(this.derecho == null) {
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
               'rankdir=TB;\n label="Arbol AVL";\nfontsize="50";\n'+
               'node [ style=filled , fillcolor=darkgoldenrod2];\n'+
                this.getCodigoInterno()+
                "}\n";
    }

    getCodigoInterno(){
        var etiqueta = "";
        if(this.izquierdo==null && this.derecho==null){
            etiqueta="nodo"+this.id_pelicula+'[ label =\"nombre:'+this.nombre_pelicula+'\n'+'id:'+this.id_pelicula+'"];\n';
        }else{
            etiqueta="nodo"+this.id_pelicula+'[ label =\"nombre:'+this.nombre_pelicula+'\n'+'id:'+this.id_pelicula+'"];\n';
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
        this.altura1 = 0;
    }

    insertar(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q){
        this.raiz = this.insertarNodo(this.raiz,id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q);
    }

    insertarNodo(nodo,id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q){
        if(nodo == null){
            nodo = new Nodo_Pelicula(id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q);
        }else if(id_pelicula<nodo.id_pelicula){
            nodo.izquierdo = this.insertarNodo(nodo.izquierdo,id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q);
            if(this.altura(nodo.derecho)-this.altura(nodo.izquierdo)== -2){
                if(id_pelicula<nodo.izquierdo.id_pelicula){
                    nodo = this.rotacionizquierda(nodo);
                }else{
                    nodo = this.Rotaciondobleizquierda(nodo);
                }
            }
        }else if(id_pelicula>nodo.id_pelicula){
            nodo.derecho = this.insertarNodo(nodo.derecho,id_pelicula,nombre_pelicula,descripcion,puntuacion_star,precio_Q);
            if(this.altura(nodo.derecho)-this.altura(nodo.izquierdo)== 2){
                if(id_pelicula>nodo.derecho.id_pelicula){
                    nodo = this.rotacionderecha(nodo);
                }else{
                    nodo = this.Rotaciondoblederecha(nodo);
                }
            }
        }else{
            console.log("No se puede insertar un nodo con el mismo id");
        }
        nodo.altura = this.mayor(this.altura(nodo.izquierdo),this.altura(nodo.derecho))+1;
        return nodo;
    }

    altura(nodo){
        if(nodo == null) return -1;
        return nodo.altura;
    }

    mayor(valor1,valor2){
        if(valor1>valor2) return valor1;
        return valor2;
    }

    rotacionizquierda(nodo){
        var aux = nodo.izquierdo;
        nodo.izquierdo = aux.derecho;
        aux.derecho = nodo;
        //calculo de nueva altura
        nodo.altura = this.mayor(this.altura(nodo.derecho),this.altura(nodo.izquierdo))+1;
        aux.altura = this.mayor(this.altura(nodo.izquierdo), nodo.altura)+1;
        return aux;
    }
    rotacionderecha(nodo){
        var aux = nodo.derecho;
        nodo.derecho = aux.izquierdo;
        aux.izquierdo = nodo;
        //calcular de nuevo altura
        nodo.altura = this.mayor(this.altura(nodo.derecho),this.altura(nodo.izquierdo))+1;
        aux.altura = this.mayor(this.altura(nodo.derecho),nodo.altura)+1;
        return aux;
    }
    //rotacion dobles derecha
    Rotaciondoblederecha(nodo){
        nodo.derecho = this.rotacionizquierda(nodo.derecho);
        return this.rotacionderecha(nodo);
    }

    //rotaciones dobles
    Rotaciondobleizquierda(nodo){
        nodo.izquierdo = this.rotacionderecha(nodo.izquierdo);
        return this.rotacionizquierda(nodo);
    }


    graficar(){
        var actual;
        actual = this.raiz;
        var hola = actual.obtenerGraphviz();
        console.log(hola);
        d3.select("#Arbol_AVL").graphviz()
            .zoom(false)
            .renderDot(hola)

    }

    inorden(){
        var res =document.querySelector("#tablaPeliculas");
        res.innerHTML = "";
        this.inordenAux(this.raiz,res);
    }
    inordenAux(nodo,res){
        var respuesta = res;
        if(nodo != null){
            this.inordenAux(nodo.izquierdo,respuesta);
            respuesta.innerHTML +=
            "<tr>"+
                "<td>"+nodo.nombre_pelicula+"</td>"+
                "<td>"+nodo.descripcion+"</td>"+
                "<td></td>"+
                "<td></td>"+
                "<td>"+nodo.precio_Q+"</td>"+
            "</tr>";
            this.inordenAux(nodo.derecho,respuesta);
        }
    }

    descendente(){
        var res =document.querySelector("#tablaPeliculas");
        res.innerHTML = "";
        this.desAux(this.raiz,res);
    }
    desAux(nodo,res){
        var respuesta = res;
        if(nodo != null){
            this.desAux(nodo.derecho,respuesta);
            respuesta.innerHTML +=
            "<tr>"+
                "<td>"+nodo.nombre_pelicula+"</td>"+
                "<td>"+nodo.descripcion+"</td>"+
                "<td></td>"+
                "<td></td>"+
                "<td>"+nodo.precio_Q+"</td>"+
            "</tr>";
            this.desAux(nodo.izquierdo,respuesta);
        }
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
        while(actual!=null){
            if(actual.nombre_usuario == usuario && actual.contrasenia == contrasenia){
                return actual;
            }
            actual = actual.siguiente;
        }
    }

    graficar(){
        var contenido = "";
        contenido+= "digraph G {\n"+
        'layout=dot label="Lista_Clientes" \n'+
        "node [shape=square,fontname=\"Century Gothic\", style=filled, color=black, fillcolor=\"darkgoldenrod2\"];\n"

        var actual = this.primero;
        var nombreNodos = "";
        var conexiones = "";
        while(actual!=null){
            nombreNodos += "nodo"+actual.dpi+'[label=\"'+"Nombre: "+actual.nombre_completo+'\n"];\n';
            if(actual.siguiente != null){
                conexiones += "nodo"+actual.dpi+"->nodo"+actual.siguiente.dpi+";\n";
            }    
            actual = actual.siguiente;
        }
        contenido += nombreNodos;
        contenido += conexiones;
        contenido += "rankdir=LR;\n}";
        d3.select("#Lista_Clientes").graphviz()
            .zoom(false)
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
               'rankdir=TB;\n label="Arbol Binario Actores";\nfontsize="50";\n'+
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
            .renderDot(hola)
            .zoom(false);
    }
    inorden(){
        var res =document.querySelector("#tablaActores");
        res.innerHTML = "";
        this.inordenAux(this.raiz,res);
    }
    inordenAux(nodo,res){
        var respuesta = res;
        if(nodo != null){
            this.inordenAux(nodo.izquierda,respuesta);
            respuesta.innerHTML +=
            "<tr>"+
                "<td>"+nodo.nombre_actor+"</td>"+
                "<td>"+nodo.descripcion+"</td>"+
            "</tr>";
            this.inordenAux(nodo.derecha,respuesta);
        }
    }
    postorden(){
        var res =document.querySelector("#tablaActores");
        res.innerHTML = "";
        this.postordenAux(this.raiz,res);
    }
    postordenAux(nodo,res){
        var respuesta = res;
        if(nodo != null){
            this.postordenAux(nodo.izquierda,respuesta);
            this.postordenAux(nodo.derecha,respuesta);
            respuesta.innerHTML +=
            "<tr>"+
                "<td>"+nodo.nombre_actor+"</td>"+
                "<td>"+nodo.descripcion+"</td>"+
            "</tr>";
        }
    }
    preorden(){
        var res =document.querySelector("#tablaActores");
        res.innerHTML = "";
        this.preordenAux(this.raiz,res);
    }
    preordenAux(nodo,res){
        var respuesta = res;
        if(nodo != null){
            respuesta.innerHTML +=
            "<tr>"+
                "<td>"+nodo.nombre_actor+"</td>"+
                "<td>"+nodo.descripcion+"</td>"+
            "</tr>";
            this.preordenAux(nodo.izquierda,respuesta);
            this.preordenAux(nodo.derecha,respuesta);
        }
    }

    


}

//Tabla Hash

class Hash{
    constructor(hash){
        this.hash = hash;
        this.siguiente=null;
        this.abajo=null;
    }
}

//Libros Usuarios
class Categoria{
    constructor(id_categoria,company){
        this.id_categoria = id_categoria;
        this.company = company;
        this.siguiente=null;
    }
}

//ListasUsuarios
class ListaCategorias{
    constructor(){
        this.cabeza = null;
        this.tamanio = 0;
    }
    //Agregar Hash
    InsertarHash(hash){
        var nuevo = new Hash(hash);
        if(this.cabeza == null){
            this.cabeza = nuevo;
            this.ultimo = nuevo;
            this.tamanio++;
        }else{
            this.ultimo.siguiente = nuevo;
            this.ultimo = nuevo;
            this.ultimo.siguiente = this.cabeza.siguiente;
            this.tamanio++;
        }
        
    }
    //Insertar Libros
    InsertarCategoria(id_categoria,company){
        var temporal = this.cabeza;
        valor = id_categoria%20;
        while(temporal != null){
            if (temporal.hash == valor){
                var temporal2 = temporal.abajo;
                if(temporal2 != null){
                    while(temporal2.siguiente != null){
                        if(temporal2.id_categoria == id_categoria){
                            console.log("La categoría ya existe");
                            return;
                        }
                        temporal2 = temporal2.siguiente;
                    }
                }else{
                    var nueva = new Categoria(id_categoria,company);
                    var inicio = temporal.abajo;
                    temporal.abajo = nueva;
                    nueva.siguiente = inicio;
                    break;
                }
            }
            temporal = temporal.siguiente;
        }
        
        //No se encontró usuario
    }


    graficarExtra(actual){
        var nodo = actual;
        var contenido = "";
        var Nodos = "";
        var conexiones = "";
        contenido += "subgraph cluster_"+nodo.dpi+nodo.nombre_usuario+"{\n"+
        "style=filled;"+
        "color=lightgrey;"+
        "node [style=filled,color=white];";
        var auxiliar = nodo.abajo;
        while(auxiliar != null){
            Nodos += "nodo"+auxiliar.cantidad+nodo.nombre_usuario+'[label=\"'+"Nombre: "+auxiliar.nombre+'\n"];\n';
            if(auxiliar.siguiente != null){
                conexiones += "nodo"+auxiliar.cantidad+nodo.nombre_usuario+"->nodo"+auxiliar.siguiente.cantidad+nodo.nombre_usuario+";\n";
            }
            auxiliar = auxiliar.siguiente;
        }
        contenido += Nodos;
        contenido += conexiones;
        contenido += "\n}";
        return contenido;
    }

    graficarUsuarios(){
        var contenido = "";
        contenido += "digraph G {\n"+
        'layout=dot label="Lista_Libros" \n'+
        "node [shape=square,fontname=\"Century Gothic\", style=filled, color=black, fillcolor=\"#f0b35d\"];\n"
        


        var actual = this.cabeza;
        var nombreNodos = "";
        var conexiones = "";
        var UsuarioCabeza = this.cabeza.dpi;
        var cont = 0;
        var subgrafo = "";
        var conexsubgrafo = "";
        if (actual != null){
            while(cont < this.tamanio){
                if(cont == this.tamanio-1){
                    nombreNodos += "nodo"+actual.dpi+"[fillcolor=\"#f9c74f\" label=\" Nombre: "+ actual.nombre_completo + "\"];\n";
                    var aux = actual;
                    if (actual.abajo != null){
                        subgrafo += this.graficarExtra(actual);
                        conexsubgrafo += "nodo"+actual.dpi+"->nodo"+actual.abajo.cantidad+actual.nombre_usuario+";\n";
                    }
                    break;
                }else{
                    nombreNodos += "nodo"+actual.dpi+"[fillcolor=\"#f9c74f\" label=\" Nombre: "+ actual.nombre_completo + "\"];\n";
                    conexiones += "nodo"+actual.dpi+"->nodo"+actual.siguiente.dpi+";\n";
                    var aux = actual;
                    if (actual.abajo != null){
                        subgrafo += this.graficarExtra(actual);
                        conexsubgrafo += "nodo"+actual.dpi+"->nodo"+actual.abajo.cantidad+actual.nombre_usuario+";\n";
                    } 
                }
                actual = actual.siguiente;
                cont++;
                
            }
        }
        conexiones += "nodo"+aux.dpi+"->nodo"+UsuarioCabeza+";\n";
        contenido += nombreNodos;
        contenido += conexiones;
        contenido += subgrafo;
        contenido += conexsubgrafo;

        var actual = this.cabeza;
        var contador = 0;
        
        contenido += "rankdir="+'"LR"'+ ";\n";
        contenido += 'label=\"Lista de Usuarios\"'+";\n";
        contenido += "}\n";
        d3.select("#Lista_Listas_Usuarios").graphviz()
            .width(1200)
            .height(900)
            .renderDot(contenido)
    }
}


var listaClientes = new ListaSimple();
var arbolAcotres = new Arbol();
var Peliculas_arbol = new Arbol_AVL();

listaClientes.insertarCliente(2354168452525,"Wilfred Perez","EDD","wilfred@gmail.com","123","+502 (123) 123-4567");

document.getElementById('masivaPeliculas').addEventListener('change', leerArchivoPeliculas, false);
document.getElementById('masivaClientes').addEventListener('change', leerArchivoClientes, false);
document.getElementById('masivaActores').addEventListener('change', leerArchivoActores, false);
document.getElementById('masivaCategorias').addEventListener('change', leerArchivoCategorias, false);

document.getElementById("btn_login").onclick = function(){
    var nombre_usuario = document.getElementById("usuarioLogin").value;
    var contrasenia = document.getElementById("usuarioContra").value;
    var usuario = listaClientes.recorrerMenu(nombre_usuario,contrasenia);
    if(usuario != null){
        document.getElementById("Login").style.display="none";
        document.getElementById("Usuario").style.display="block";
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

function leerArchivoPeliculas(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
        var contenido = e.target.result;
        CargarPeliculas(contenido);
    };
    lector.readAsText(archivo);
}

function leerArchivoClientes(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
        var contenido = e.target.result;
        CargarClientes(contenido);
    };
    lector.readAsText(archivo);
}

function leerArchivoActores(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
        var contenido = e.target.result;
        CargarActores(contenido);
    };
    lector.readAsText(archivo);
}

function leerArchivoCategorias(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = function(e) {
        var contenido = e.target.result;
        CargarCategorias(contenido);
    };
    lector.readAsText(archivo);
}

function CargarClientes(contenido){
    var datos = JSON.parse(contenido);
    for (var i = 0; i < datos.length; i++) {
        listaClientes.insertarCliente(datos[i].dpi,datos[i].nombre_completo,datos[i].nombre_usuario,datos[i].correo,datos[i].contrasenia,datos[i].telefono);
    }
    listaClientes.graficar();
    alert("Usuarios cargados");
}

function CargarPeliculas(contenido){
    var datos = JSON.parse(contenido);
    for (var i = 0; i < datos.length; i++) {
        Peliculas_arbol.insertar(datos[i].id_pelicula,datos[i].nombre_pelicula,datos[i].descripcion,datos[i].puntuacion_star,datos[i].precio_Q);
    }
    alert("Peliculas cargadas");
    Peliculas_arbol.graficar();
    Peliculas_arbol.inorden();
}

function CargarActores(contenido){
    var datos = JSON.parse(contenido);
    for (var i = 0; i < datos.length; i++) {
        arbolAcotres.insertar(datos[i].dni,datos[i].nombre_actor,datos[i].correo,datos[i].descripcion);
    }
    arbolAcotres.graficarArbol();
    arbolAcotres.inorden();
    alert("Actores cargados");
}

document.getElementById("btn_regresarAdministracion").onclick=function(){
    document.getElementById("Login").style.display="block";
    document.getElementById("Administracion").style.display="none";
    document.getElementById("Usuario").style.display="none";
    document.getElementById("usuarioLogin").value = "";
    document.getElementById("usuarioContra").value = "";
    
}

document.getElementById("btn_regresarUsuario").onclick=function(){
    document.getElementById("Login").style.display="block";
    document.getElementById("Administracion").style.display="none";
    document.getElementById("Usuario").style.display="none";
    document.getElementById("usuarioLogin").value = "";
    document.getElementById("usuarioContra").value = "";
    
}

document.getElementById("btn_descargarAvl").onclick=function(){

    html2canvas(document.querySelector("#Arbol_AVL")).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        var anchor = document.createElement('a');
        anchor.setAttribute('href', imgData);
        anchor.setAttribute('download', 'Arbol_AVL.png');
        anchor.click();
        anchor.remove();
    });
}

document.getElementById("btn_descargarBinario").onclick=function(){

    html2canvas(document.querySelector("#Arbol_Binario")).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        var anchor = document.createElement('a');
        anchor.setAttribute('href', imgData);
        anchor.setAttribute('download', 'Arbol_Binario.png');
        anchor.click();
        anchor.remove();
    });
}

document.getElementById("btn_descargarClientes").onclick=function(){

    html2canvas(document.querySelector("#Lista_Clientes")).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        var anchor = document.createElement('a');
        anchor.setAttribute('href', imgData);
        anchor.setAttribute('download', 'Lista_Clientes.png');
        anchor.click();
        anchor.remove();
    });
}

document.getElementById("btn_ascendentePelis").onclick=function(){
    Peliculas_arbol.inorden();
}
document.getElementById("btn_descendentePelis").onclick=function(){
    Peliculas_arbol.descendente();
}

document.getElementById("btn_inOrdenActores").onclick=function(){
    arbolAcotres.inorden();
}
document.getElementById("btn_preOrdenActores").onclick=function(){
    arbolAcotres.preorden();
}
document.getElementById("btn_postOrdenActores").onclick=function(){
    arbolAcotres.postorden();
}