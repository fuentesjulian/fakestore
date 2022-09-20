import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js"

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('src/database/productDB.json')
    }
}

export default ProductosDaoArchivo
