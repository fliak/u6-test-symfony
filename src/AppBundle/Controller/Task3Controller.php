<?php
/**
 * Created by PhpStorm.
 * User: fliak
 * Date: 13.8.16
 * Time: 15.50
 */

namespace AppBundle\Controller;


use AppBundle\Entity\Data;
use AppBundle\Entity\MenuItem;
use AppBundle\Repository\DataRepository;
use AppBundle\Repository\MenuItemRepository;
use Doctrine\ORM\EntityManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class Task3Controller extends Controller
{
    /**
     * @Route("/task3", name="task3", methods={"GET", "POST"})
     */
    public function indexAction(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->request->get('data');

            $data = htmlentities($data);
            $data = nl2br($data);
            
            $entity = new Data();
            $entity->setData($data);

            $this->getORM()->persist($entity);
            $this->getORM()->flush();

            return $this->redirectToRoute('task3');

        }
        else    {

            //fetch last
            $entity = $this->getDataRepo()->findOneBy([], ['id' => 'DESC']);
        }

        return $this->render('task3/index.html.twig', [
            'data' => $entity->getData()
        ]);
    }


    /**
     * @return EntityManager
     */
    protected function getORM()  {
        return $this->get('doctrine.orm.entity_manager');
    }


    /**
     * @return DataRepository
     */
    protected function getDataRepo()    {
        return $this->getORM()->getRepository(Data::class);
    }

    
}