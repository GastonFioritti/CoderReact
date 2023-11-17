# Proyecto E-commerce StyleGG

Este proyecto es una aplicación de comercio electrónico (E-commerce) llamada StyleGG, desarrollada con React y Chakra UI. StyleGG ofrece una amplia variedad de productos de moda, incluyendo calzado y accesorios, para hombres, mujeres y unisex.

## Características Principales

- **Componentes React y Chakra UI:** La interfaz de usuario se construye utilizando React como biblioteca principal y Chakra UI para el diseño y los componentes estilizados.

- **Carrito de Compras:** Los usuarios pueden agregar productos al carrito de compras, ver el contenido del carrito y realizar compras.

- **Firebase Integration:** La aplicación utiliza Firebase para la gestión de usuarios y almacenamiento de datos, como las órdenes de compra.

## Estructura del Proyecto

- **`src/components`:** Contiene todos los componentes de React utilizados en la aplicación, como NavBar, ItemList, ItemDetailContainer, Cart, etc.

- **`src/context`:** Incluye el contexto y el proveedor para gestionar el estado del carrito de compras.

- **`src/firebase`:** Contiene la configuración de Firebase y funciones relacionadas, como la adición de órdenes a Firestore.

- **`src/styles.css`:** Archivo CSS para estilos personalizados.

## Instalación y Ejecución

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias utilizando `npm install`.
3. Configura tu proyecto Firebase y actualiza la configuración en `src/firebase/firebaseConfig.js`.
4. Ejecuta la aplicación con `npm start`.

## Dependencias Externas

- **React:** Biblioteca para la construcción de interfaces de usuario.
- **Chakra UI:** Biblioteca de componentes estilizados para React.
- **Firebase:** Plataforma de desarrollo de aplicaciones móviles y web.

