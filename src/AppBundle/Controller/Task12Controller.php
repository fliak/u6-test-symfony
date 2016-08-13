<?php
/**
 * Created by PhpStorm.
 * User: fliak
 * Date: 14.8.16
 * Time: 1.01
 */

namespace AppBundle\Controller;


use AppBundle\Entity\MenuItem;
use AppBundle\Repository\MenuItemRepository;
use Doctrine\ORM\EntityManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;


class Task12Controller extends Controller
{
    /**
     * @Route("/task1", name="task1")
     */
    public function task1Action(Request $request)
    {

        $repo = $this->getMenuRepo();
        $topRow = $repo->findBy(['parent' => null]);


        return $this->render('task12/task1.html.twig', array(
            'topRow' => $topRow
        ));
    }




    /**
     * @Route("/task2", name="task2")
     */
    public function task2Action(Request $request)
    {

        $repo = $this->getMenuRepo();
        $topRow = $repo->findBy(['parent' => null]);


        return $this->render('task12/task2.html.twig', array(
            'topRow' => $topRow
        ));
    }



    /**
     * @return EntityManager
     */
    protected function getORM()  {
        return $this->get('doctrine.orm.entity_manager');
    }

    /**
     * @return MenuItemRepository
     */
    protected function getMenuRepo()    {
        return $this->getORM()->getRepository(MenuItem::class);
    }

}