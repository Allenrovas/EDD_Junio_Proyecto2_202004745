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
        if(this.izquierda==null && this.derecha==null){
            etiqueta="nodo"+this.id_pelicula+" [ label =\""+this.nombre_pelicula+"\"];\n";
        }else{
            etiqueta="nodo"+this.id_pelicula+" [ label =\""+this.nombre_pelicula+"\"];\n";
        }
        if(this.izquierda!=null){
            etiqueta=etiqueta + this.izquierda.getCodigoInterno() +
               "nodo"+this.id_pelicula+"->nodo"+this.izquierda.id_pelicula+"\n";
        }
        if(this.derecha!=null){
            etiqueta=etiqueta + this.derecha.getCodigoInterno() +
               "nodo"+this.id_pelicula+"->nodo"+this.derecha.id_pelicula+"\n";                    
        }
        return etiqueta;
    }
}