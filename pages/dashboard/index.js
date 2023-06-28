import React from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardContent from '../../components/dashboard/Dashboard';
import Layout from "../../components/layout/Layout";
import { useContext } from 'react';
import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layout/404';

const Dashboard = () => {
  
  const { usuario, firebase, } = useContext(FirebaseContext);

  return (
    <>
      <Layout>
        {
          usuario && usuario.isAdmin ? ( 
            <>
              <Sidebar/>
              <DashboardContent/>
            </>
          ) : (
            <Error404/>
          )
        }
      </Layout>
    </>
  )
}

export default Dashboard;