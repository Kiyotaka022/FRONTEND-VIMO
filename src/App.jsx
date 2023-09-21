import { useState } from 'react'
import Header from './components/Header.jsx'
import Menu from './components/Menu.jsx'
import Productos from './components/Productos.jsx'
import Clientes from './components/Clientes.jsx'
import Compras from './components/Compras.jsx'
import Pedidos from './components/Pedidos.jsx'
import Usuarios from './components/Usuarios.jsx'
import Ventas from './components/Ventas.jsx'
import Empleados from './components/Empleados.jsx'
import Categorias from './components/Categorias.jsx'
import Roles from './components/Roles.jsx'
import Login from './components/Login.jsx'
import Abonos from './components/Abonos.jsx'
import './components/table.css';


function App() {
  const [dialog, setDialog] = useState(false)
  const [page, setPage] = useState('Productos')
  const [deploy, setDeploy] = useState(true)
  const [login, setLogin] =useState(false)
  return (
    <>

{!login ? 
<Login setLogin={setLogin}></Login>
:
<>
<Header setDeploy={setDeploy} setDialog={setDialog} page={page}></Header>
<div className='CONTAINER flex h-full flex-wrap justify-start	'>
<Menu state={deploy} setPage={setPage} setLogin={setLogin}></Menu>
{page==="Productos" && <Productos setDialog={setDialog}  dialog={dialog}></Productos>}
{page==="Clientes" && <Clientes setDialog={setDialog}  dialog={dialog}></Clientes>}
{page==="Compras" && <Compras setDialog={setDialog}  dialog={dialog}></Compras>}
{page==="Pedidos" && <Pedidos setDialog={setDialog} dialog={dialog}></Pedidos>}
{page==="Usuarios" && <Usuarios setDialog={setDialog} dialog={dialog}></Usuarios>}
{page==="Ventas" && <Ventas setDialog={setDialog}  setDeploy={setDeploy} dialog={dialog}></Ventas>}
{page==="Empleados" && <Empleados setDialog={setDialog} dialog={dialog}></Empleados>}
{page==="Categorias" && <Categorias setDialog={setDialog}  dialog={dialog}></Categorias>}
{page==="Roles" && <Roles setDialog={setDialog}  dialog={dialog}></Roles>} 
{page==="Abonos" && <Abonos setDialog={setDialog}  dialog={dialog}></Abonos>} 
</div>
</>
}
    </>
  )
}

export default App
