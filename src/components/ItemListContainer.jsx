import React, { useEffect, useState } from 'react';
import Item from './Item';
import { Grid, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import './styles.css';


const ItemList = () => {
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const { id } = useParams();

  const productos = [

    {
      id: 1,
      name: '4DFWD 2 RUNNING SHOES',
      description: 'Diseñadas para ofrecer una experiencia de carrera excepcional con su tecnología avanzada.',
      price: 80,
      image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8d89441135144d86828cae9900c3cb21_9366/4DFWD_2_Running_Shoes_White_GX9247_01_standard.jpg',
      category: 'Hombre',
      features: {
        talle: ['40', '41', '42'],
        color: ['Blanco', 'Negro', 'Rojo'], 
      }
    },
    {
      id: 2,
      name: 'CAMPUS 00S SHOES',
      description: 'Con su diseño clásico y versátil, estas zapatillas son perfectas para un look casual y elegante..',
      price: 90,
      image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ce738cbe5342421996feaf5001044964_9366/Campus_00s_Shoes_Grey_HQ8707_01_standard.jpg',
      category: 'Hombre', 
      features: {
        talle: ['40', '41', '42'],
        color: ['Blanco', 'Negro', 'Rojo'], 
      }
      
    },
    {
      id: 3,
      name: 'OZWEEGO SHOES',
      description: ' Eleva tu look a un nuevo nivel de moda y funcionalidad con las zapatillas OZWEEGO.".',
      price: 60,
      image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/40ef886b3f3a4cd8bd44d5c438edb554_9366/OZWEEGO_Shoes_Purple_IE7102_01_standard.jpg',
      category: 'Mujer', 
      features: {
        talle: ['36', '37', '38'],
        color: ['Blanco', 'Negro', 'Rojo'], 
      }
    },
    {
      id: 4,
      name: 'SUPERSTAR SHOES',
      description: 'Las zapatillas Superstar son un clásico que nunca pasa de moda.',
      price: 50,
      image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Superstar_Shoes_White_EG4958_01_standard.jpg',
      category: 'Unisex', 
      features: {
       talle: ['41', '42', '39'],
        color: ['Blanco', 'Negro', 'Rojo'], 
      }
    },
    {
      id: 5,
      name: 'ADIFOM SST BOOT SHOES',
      description: 'Con su diseño distintivo y la durabilidad de una bota, estas zapatillas ofrecen el equilibrio ideal entre moda y comodidad.',
      price: 135,
      image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/b9b70c265034466ab891901d59762937_9366/AdiFOM_SST_Boot_Shoes_Brown_ID4280_01_standard.jpg',
      category: 'Mujer', 
      features: {
        talle: ['36', '37', '38'],
        color: ['Blanco', 'Negro', 'Rojo'], 
      }
    },
    
    {
      id: 6,
      name: 'STAN SMITH CS SHOES',
      description: '"Las zapatillas Stan Smith CS son un verdadero ícono de la moda urbana.',
      price: 70,
      image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f5405cfbd41640549bbdecf9ca0eba5a_9366/Stan_Smith_CS_Shoes_Grey_ID2040_01_standard.jpg',
      category: 'Unisex', 
      features: {
        talle: ['41', '42', '39'],
        color: ['Blanco', 'Negro', 'Rojo'], 
      }
    },
    
    
  ];

  useEffect(() => {
    if (id) {
      const productosFiltrados = productos.filter((producto) => producto.category === id);
      setProductosFiltrados(productosFiltrados);
    } else {
      setProductosFiltrados(productos);
    }
  }, [id]);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gridGap={1}>
      {productosFiltrados.map((p) => (
        <Flex key={p.id} justifyContent="center" pl={1} pr={1}>
          <Item
            id={p.id}
            name={p.name}
            description={p.description}
            price={p.price}
            image={p.image}
            features={p.features} 
          />
        </Flex>
      ))}
    </Grid>
  );
};

export default ItemList;