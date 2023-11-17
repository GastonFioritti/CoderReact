import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = ({ setCategoria }) => {
  const categorias = ['Inicio', 'Acerca de'];
  const subCategorias = ['Hombre', 'Mujer', 'Unisex'];

  const handleCategoriaClick = (categoria) => {
    setCategoria(categoria);
  };

  return (
    <Navbar expand="lg" className="navbar bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">StyleGG</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {categorias.map((cat, index) => (
              <Nav.Link
                key={index}
                as={Link}
                to={`/${cat}`}
                onClick={() => handleCategoriaClick(cat)}
              >
                {cat}
              </Nav.Link>
            ))}
            <NavDropdown title="Categorias" id="basic-nav-dropdown">
              {subCategorias.map((subCategoria, index) => (
                <NavDropdown.Item
                  key={index}
                  as={Link}
                  to={`/category/${subCategoria}`}
                  onClick={() => handleCategoriaClick(subCategoria)}
                >
                  {subCategoria}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <CartWidget />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
